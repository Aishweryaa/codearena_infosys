package com.codearena.codearena.service;

import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class CodeExecutionEngine {

    public static class ExecutionResult {
        public String output = "";
        public String error = "";
        public String status = "SUCCESS"; // SUCCESS, COMPILATION_ERROR, TIME_LIMIT_EXCEEDED, RUNTIME_ERROR
        public int exitCode = -1;
        public long runtimeMs = 0;
    }

    public ExecutionResult executeCode(String language, String sourceCode, String inputData) {
        ExecutionResult result = new ExecutionResult();
        Path tempDir = null;
        String fileName = "";
        String dockerImage = "";
        
        // Separating compile vs execute commands for compiled languages
        boolean requiresCompilation = false;
        String compileCommand = "";
        String runCommand = "";

        switch (language.toUpperCase()) {
            case "JAVA":
                fileName = "Solution.java";
                dockerImage = "eclipse-temurin:21-alpine";
                requiresCompilation = true;
                compileCommand = "javac Solution.java";
                runCommand = "java Solution";
                break;
            case "PYTHON":
                fileName = "solution.py";
                dockerImage = "python:3.11-slim";
                requiresCompilation = false;
                runCommand = "python solution.py";
                break;
            case "CPP":
            case "C++":
                fileName = "solution.cpp";
                dockerImage = "gcc:latest";
                requiresCompilation = true;
                compileCommand = "g++ -o solution solution.cpp";
                runCommand = "./solution";
                break;
            default:
                result.error = "Unsupported compiler runtime language: " + language;
                result.status = "COMPILATION_ERROR";
                return result;
        }

        try {
            tempDir = Files.createTempDirectory("codearena_sandbox_" + UUID.randomUUID().toString());
            File sourceFile = new File(tempDir.toFile(), fileName);
            try (FileWriter writer = new FileWriter(sourceFile)) {
                writer.write(sourceCode);
            }

            // 🌟 1. HANDLED COMPILATION SEPARATELY (Member 3 Task)
            if (requiresCompilation) {
                String[] compileCmd = {
                    "docker", "run", "--rm",
                    "-v", tempDir.toAbsolutePath().toString() + ":/workspace",
                    "-w", "/workspace",
                    dockerImage,
                    "sh", "-c", compileCommand
                };
                
                ProcessBuilder compilePb = new ProcessBuilder(compileCmd);
                Process compileProcess = compilePb.start();
                boolean compileFinished = compileProcess.waitFor(10, TimeUnit.SECONDS);
                
                if (!compileFinished || compileProcess.exitValue() != 0) {
                    result.status = "COMPILATION_ERROR";
                    result.exitCode = compileProcess.exitValue();
                    result.error = readStream(compileProcess.getErrorStream());
                    return result;
                }
            }

            // 🌟 2. ENFORCED HARDWARE RESOURCE LIMITS (Member 3 Task - CPU & OOM)
            // --memory="128m" limits RAM. --memory-swap="128m" blocks swap bypass. --cpus="0.5" blocks CPU freezing.
            String[] runCmd = {
                "docker", "run", "--rm", "-i",
                "--memory=128m",
                "--memory-swap=128m",
                "--cpus=0.5",
                "-v", tempDir.toAbsolutePath().toString() + ":/workspace",
                "-w", "/workspace",
                dockerImage,
                "sh", "-c", runCommand
            };

            long startTime = System.currentTimeMillis();
            ProcessBuilder runPb = new ProcessBuilder(runCmd);
            Process runProcess = runPb.start();

            if (inputData != null && !inputData.trim().isEmpty()) {
                try (BufferedWriter stdin = new BufferedWriter(new OutputStreamWriter(runProcess.getOutputStream()))) {
                    stdin.write(inputData);
                    stdin.flush();
                }
            }

            // 🌟 3. CPU TIMEOUT HANDLING
            boolean finished = runProcess.waitFor(5, TimeUnit.SECONDS); 
            result.runtimeMs = System.currentTimeMillis() - startTime;

            if (!finished) {
                runProcess.destroyForcibly();
                result.status = "TIME_LIMIT_EXCEEDED";
                result.error = "Time Limit Exceeded (TLE) - Execution exceeded 5 seconds limit.";
                return result;
            }

            result.exitCode = runProcess.exitValue();
            
            // Docker exit code 137 typically means Out of Memory (OOM Killer kicked in)
            if (result.exitCode == 137) {
                result.status = "MEMORY_LIMIT_EXCEEDED";
                result.error = "Memory Limit Exceeded (MLE) - Code exceeded allocated 128MB RAM boundary.";
                return result;
            } else if (result.exitCode != 0) {
                result.status = "RUNTIME_ERROR";
                result.error = readStream(runProcess.getErrorStream());
                return result;
            }

            result.output = readStream(runProcess.getInputStream());

        } catch (Exception e) {
            result.status = "RUNTIME_ERROR";
            result.error = "Internal Engine Exception: " + e.getMessage();
        } finally {
            // 🌟 CONTAINER CLEANUP AND COMPACT CLEANSE
            if (tempDir != null) {
                try {
                    Files.walk(tempDir).map(Path::toFile).forEach(File::delete);
                } catch (IOException ignored) {}
            }
        }
        return result;
    }

    private String readStream(InputStream stream) throws IOException {
        StringBuilder builder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line).append("\n");
            }
        }
        return builder.toString().trim();
    }
}
