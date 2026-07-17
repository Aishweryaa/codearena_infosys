package com.codearena.backend.service;

import com.codearena.backend.entity.Problem;
import com.codearena.backend.enums.Language;
import com.codearena.backend.enums.SubmissionStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
public class CodeExecutionService {

    private static final int MAX_OUTPUT_BYTES = 1_000_000;

    private final String dockerCommand;
    private final String javaImage;
    private final String pythonImage;
    private final String cppImage;
    private final String javascriptImage;

    public CodeExecutionService(
            @Value("${app.execution.docker-command:docker}")
            String dockerCommand,

            @Value("${app.execution.java-image:eclipse-temurin:17-jdk}")
            String javaImage,

            @Value("${app.execution.python-image:python:3.11}")
            String pythonImage,

            @Value("${app.execution.cpp-image:gcc:latest}")
            String cppImage,

            @Value("${app.execution.javascript-image:node:20-alpine}")
            String javascriptImage) {

        this.dockerCommand = dockerCommand;
        this.javaImage = javaImage;
        this.pythonImage = pythonImage;
        this.cppImage = cppImage;
        this.javascriptImage = javascriptImage;
    }

    public PreparedProgram prepare(
            Language language,
            String sourceCode,
            Problem problem) {

        Path workingDirectory = null;

        try {
            verifyDocker();

            workingDirectory =
                    Files.createTempDirectory(
                            "codearena-execution-"
                    );

            ProgramDefinition definition =
                    definitionFor(language);

            Files.writeString(
                    workingDirectory.resolve(
                            definition.sourceFile()
                    ),
                    sourceCode,
                    StandardCharsets.UTF_8
            );

            if (definition.compileCommand() != null) {
                ProcessResult compilation =
                        runDocker(
                                workingDirectory,
                                problem,
                                definition.image(),
                                definition.compileCommand(),
                                "",
                                Duration.ofSeconds(25)
                        );

                if (compilation.timedOut()) {
                    deleteDirectory(workingDirectory);

                    return PreparedProgram.failed(
                            SubmissionStatus.COMPILATION_ERROR,
                            "Compilation timed out"
                    );
                }

                if (compilation.exitCode() != 0) {
                    deleteDirectory(workingDirectory);

                    return PreparedProgram.failed(
                            SubmissionStatus.COMPILATION_ERROR,
                            emptyToFallback(
                                    compilation.output(),
                                    "Compilation failed"
                            )
                    );
                }
            }

            return PreparedProgram.ready(
                    workingDirectory,
                    definition,
                    problem
            );

        } catch (IOException exception) {
            deleteDirectory(workingDirectory);

            return PreparedProgram.failed(
                    SubmissionStatus.RUNTIME_ERROR,
                    "Unable to prepare code execution: "
                            + exception.getMessage()
            );
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            deleteDirectory(workingDirectory);

            return PreparedProgram.failed(
                    SubmissionStatus.RUNTIME_ERROR,
                    "Code execution was interrupted"
            );
        } catch (RuntimeException exception) {
            deleteDirectory(workingDirectory);

            return PreparedProgram.failed(
                    SubmissionStatus.RUNTIME_ERROR,
                    exception.getMessage()
            );
        }
    }

    public ExecutionResult execute(
            PreparedProgram program,
            String input) {

        if (!program.ready()) {
            return new ExecutionResult(
                    program.failureStatus(),
                    "",
                    program.failureMessage(),
                    0L
            );
        }

        long timeoutMilliseconds =
                Math.max(
                        program.problem().getTimeLimit(),
                        100
                ) + 1200L;

        try {
            ProcessResult result =
                    runDocker(
                            program.workingDirectory(),
                            program.problem(),
                            program.definition().image(),
                            program.definition().runCommand(),
                            input == null ? "" : input,
                            Duration.ofMillis(
                                    timeoutMilliseconds
                            )
                    );

            if (result.timedOut()) {
                return new ExecutionResult(
                        SubmissionStatus.TIME_LIMIT_EXCEEDED,
                        result.output(),
                        "Execution exceeded the time limit",
                        result.executionTime()
                );
            }

            if (result.exitCode() != 0) {
                return new ExecutionResult(
                        SubmissionStatus.RUNTIME_ERROR,
                        result.output(),
                        emptyToFallback(
                                result.output(),
                                "Program exited with code "
                                        + result.exitCode()
                        ),
                        result.executionTime()
                );
            }

            return new ExecutionResult(
                    SubmissionStatus.ACCEPTED,
                    result.output(),
                    null,
                    result.executionTime()
            );

        } catch (IOException exception) {
            return new ExecutionResult(
                    SubmissionStatus.RUNTIME_ERROR,
                    "",
                    "Unable to execute program: "
                            + exception.getMessage(),
                    0L
            );
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();

            return new ExecutionResult(
                    SubmissionStatus.RUNTIME_ERROR,
                    "",
                    "Code execution was interrupted",
                    0L
            );
        }
    }

    public void cleanup(PreparedProgram program) {
        if (program != null) {
            deleteDirectory(
                    program.workingDirectory()
            );
        }
    }

    public String normalizeOutput(String output) {
        if (output == null) {
            return "";
        }

        String normalized = output
                .replace("\r\n", "\n")
                .replace('\r', '\n');

        String[] lines = normalized.split("\n", -1);
        StringBuilder builder = new StringBuilder();

        for (String line : lines) {
            builder.append(line.stripTrailing())
                    .append('\n');
        }

        return builder.toString().stripTrailing();
    }

    private ProcessResult runDocker(
            Path workingDirectory,
            Problem problem,
            String image,
            List<String> containerCommand,
            String input,
            Duration timeout)
            throws IOException, InterruptedException {

        String containerName =
                "codearena-"
                        + UUID.randomUUID()
                        .toString()
                        .replace("-", "");

        List<String> command = new ArrayList<>();

        command.add(dockerCommand);
        command.add("run");
        command.add("-i");
        command.add("--rm");
        command.add("--name");
        command.add(containerName);
        command.add("--network");
        command.add("none");
        command.add("--cpus");
        command.add("0.75");
        command.add("--pids-limit");
        command.add("64");
        command.add("--memory");
        command.add(
                Math.max(
                        problem.getMemoryLimit(),
                        32
                ) + "m"
        );
        command.add("--volume");
        command.add(
                dockerMountPath(workingDirectory)
                        + ":/workspace"
        );
        command.add("--workdir");
        command.add("/workspace");
        command.add(image);
        command.addAll(containerCommand);

        ProcessBuilder builder =
                new ProcessBuilder(command);

        builder.redirectErrorStream(true);

        long startedAt = System.nanoTime();
        Process process = builder.start();

        CompletableFuture<String> outputFuture =
                CompletableFuture.supplyAsync(
                        () -> readOutput(
                                process.getInputStream()
                        )
                );

        try (OutputStream outputStream =
                     process.getOutputStream()) {

            if (input != null && !input.isEmpty()) {
                outputStream.write(
                        input.getBytes(
                                StandardCharsets.UTF_8
                        )
                );

                if (!input.endsWith("\n")) {
                    outputStream.write('\n');
                }
            }
        }

        boolean completed =
                process.waitFor(
                        timeout.toMillis(),
                        TimeUnit.MILLISECONDS
                );

        long executionTime =
                TimeUnit.NANOSECONDS.toMillis(
                        System.nanoTime() - startedAt
                );

        if (!completed) {
            process.destroyForcibly();
            removeContainer(containerName);

            String output =
                    outputFuture
                            .completeOnTimeout(
                                    "",
                                    2,
                                    TimeUnit.SECONDS
                            )
                            .join();

            return new ProcessResult(
                    -1,
                    output,
                    true,
                    executionTime
            );
        }

        String output =
                outputFuture
                        .completeOnTimeout(
                                "",
                                2,
                                TimeUnit.SECONDS
                        )
                        .join();

        return new ProcessResult(
                process.exitValue(),
                output,
                false,
                executionTime
        );
    }

    private void verifyDocker() {
        try {
            Process process =
                    new ProcessBuilder(
                            dockerCommand,
                            "version",
                            "--format",
                            "{{.Server.Version}}"
                    )
                    .redirectErrorStream(true)
                    .start();

            boolean completed =
                    process.waitFor(
                            10,
                            TimeUnit.SECONDS
                    );

            if (!completed) {
                process.destroyForcibly();

                throw new IllegalStateException(
                        "Docker Desktop is not responding"
                );
            }

            if (process.exitValue() != 0) {
                String output =
                        readOutput(
                                process.getInputStream()
                        );

                throw new IllegalStateException(
                        emptyToFallback(
                                output,
                                "Docker Desktop is not running"
                        )
                );
            }

        } catch (IOException exception) {
            throw new IllegalStateException(
                    "Docker command was not found"
            );
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();

            throw new IllegalStateException(
                    "Docker availability check was interrupted"
            );
        }
    }

    private ProgramDefinition definitionFor(
            Language language) {

        return switch (language) {
            case JAVA ->
                    new ProgramDefinition(
                            "Main.java",
                            javaImage,
                            List.of(
                                    "javac",
                                    "Main.java"
                            ),
                            List.of(
                                    "java",
                                    "Main"
                            )
                    );

            case PYTHON ->
                    new ProgramDefinition(
                            "main.py",
                            pythonImage,
                            null,
                            List.of(
                                    "python",
                                    "main.py"
                            )
                    );

            case CPP ->
                    new ProgramDefinition(
                            "Main.cpp",
                            cppImage,
                            List.of(
                                    "g++",
                                    "Main.cpp",
                                    "-O2",
                                    "-std=c++17",
                                    "-o",
                                    "main"
                            ),
                            List.of("./main")
                    );

            case JAVASCRIPT ->
                    new ProgramDefinition(
                            "main.js",
                            javascriptImage,
                            null,
                            List.of(
                                    "node",
                                    "main.js"
                            )
                    );
        };
    }

    private String dockerMountPath(Path path) {
        return path.toAbsolutePath()
                .normalize()
                .toString()
                .replace('\\', '/');
    }

    private void removeContainer(
            String containerName) {

        try {
            new ProcessBuilder(
                    dockerCommand,
                    "rm",
                    "-f",
                    containerName
            )
                    .redirectErrorStream(true)
                    .start()
                    .waitFor(
                            5,
                            TimeUnit.SECONDS
                    );

        } catch (Exception ignored) {
            // Best-effort timeout cleanup.
        }
    }

    private String readOutput(
            InputStream inputStream) {

        try (
                inputStream;
                ByteArrayOutputStream buffer =
                        new ByteArrayOutputStream()
        ) {
            byte[] bytes = new byte[8192];
            int total = 0;
            int read;

            while (
                    (read = inputStream.read(bytes))
                            != -1
            ) {
                int allowed =
                        Math.min(
                                read,
                                MAX_OUTPUT_BYTES
                                        - total
                        );

                if (allowed > 0) {
                    buffer.write(
                            bytes,
                            0,
                            allowed
                    );

                    total += allowed;
                }

                if (total >= MAX_OUTPUT_BYTES) {
                    break;
                }
            }

            return buffer.toString(
                    StandardCharsets.UTF_8
            );

        } catch (IOException exception) {
            return "";
        }
    }

    private void deleteDirectory(Path directory) {
        if (directory == null) {
            return;
        }

        try (
                var stream = Files.walk(directory)
        ) {
            stream.sorted(
                            (first, second) ->
                                    second.compareTo(first)
                    )
                    .forEach(path -> {
                        try {
                            Files.deleteIfExists(path);
                        } catch (IOException ignored) {
                            // Temporary files are best-effort cleanup.
                        }
                    });

        } catch (IOException ignored) {
            // Temporary files are best-effort cleanup.
        }
    }

    private String emptyToFallback(
            String value,
            String fallback) {

        if (value == null || value.isBlank()) {
            return fallback;
        }

        return value.strip();
    }

    public record ProgramDefinition(
            String sourceFile,
            String image,
            List<String> compileCommand,
            List<String> runCommand
    ) {
    }

    private record ProcessResult(
            int exitCode,
            String output,
            boolean timedOut,
            long executionTime
    ) {
    }

    public record ExecutionResult(
            SubmissionStatus status,
            String output,
            String errorMessage,
            long executionTime
    ) {
    }

    public record PreparedProgram(
            boolean ready,
            Path workingDirectory,
            ProgramDefinition definition,
            Problem problem,
            SubmissionStatus failureStatus,
            String failureMessage
    ) {

        private static PreparedProgram ready(
                Path directory,
                ProgramDefinition definition,
                Problem problem) {

            return new PreparedProgram(
                    true,
                    directory,
                    definition,
                    problem,
                    null,
                    null
            );
        }

        private static PreparedProgram failed(
                SubmissionStatus status,
                String message) {

            return new PreparedProgram(
                    false,
                    null,
                    null,
                    null,
                    status,
                    message
            );
        }
    }
}

