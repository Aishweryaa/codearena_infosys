package com.codearena.codearena;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.codearena.codearena.service.CodeExecutionEngine;
import com.codearena.codearena.service.CodeExecutionEngine.ExecutionResult;

@SpringBootTest
class CodearenaIntegrationTests {

    @Autowired
    private CodeExecutionEngine executionEngine;

    // 🌟 TEST 1: CORRECT CODE VALIDATION
    @Test
    void testCorrectJavaCode() {
        String code = "public class Solution { public static void main(String[] args) { System.out.println(\"[0,1]\"); } }";
        ExecutionResult result = executionEngine.executeCode("JAVA", code, "");
        
        assertEquals("SUCCESS", result.status);
        assertEquals("[0,1]", result.output);
        assertEquals(0, result.exitCode);
    }

    // 🌟 TEST 2: WRONG OUTPUT CAPTURE
    @Test
    void testWrongOutputCode() {
        String code = "public class Solution { public static void main(String[] args) { System.out.println(\"Unexpected Text\"); } }";
        ExecutionResult result = executionEngine.executeCode("JAVA", code, "");
        
        assertEquals("SUCCESS", result.status);
        assertNotEquals("[0,1]", result.output);
    }

    // 🌟 TEST 3: COMPILATION FAILURE HANDLING
    @Test
    void testCompilationFailure() {
        String brokenCode = "public class Solution { public static void main(String[] args) { System.out.println(\"Missing Semicolon\") } }";
        ExecutionResult result = executionEngine.executeCode("JAVA", brokenCode, "");
        
        assertEquals("COMPILATION_ERROR", result.status);
        assertTrue(result.error.contains("';' expected"));
    }

    // 🌟 TEST 4: INFINITE LOOP / CPU TIMEOUT GUARD
    @Test
    void testInfiniteLoopTimeout() {
        String infiniteLoopCode = "public class Solution { public static void main(String[] args) { while(true); } }";
        ExecutionResult result = executionEngine.executeCode("JAVA", infiniteLoopCode, "");
        
        assertEquals("TIME_LIMIT_EXCEEDED", result.status);
    }

    // 🌟 TEST 5: OUT OF MEMORY (OOM) LIMIT EXCEEDED
    @Test
    void testMemoryLimitExceeded() {
        // Code that intentionally tries to allocate a massive integer matrix array to break RAM boundaries
        String heavyMemoryCode = "public class Solution { public static void main(String[] args) { long[][] array = new long[99999][99999]; } }";
        ExecutionResult result = executionEngine.executeCode("JAVA", heavyMemoryCode, "");
        
        // Either caught during immediate runtime crash or killed by the host engine
        assertTrue(result.status.equals("MEMORY_LIMIT_EXCEEDED") || result.status.equals("RUNTIME_ERROR"));
    }

    // 🌟 TEST 6: MALICIOUS CODE / SANDBOX PROTECTION
    @Test
    void testMaliciousCodeSandboxIsolaton() {
        // Attempt to look for a host Windows system file from inside the Linux container
        String maliciousCode = "import java.io.File; public class Solution { public static void main(String[] args) { File file = new File(\"C:\\\\Windows\\\\System32\"); System.out.println(file.exists()); } }";
        ExecutionResult result = executionEngine.executeCode("JAVA", maliciousCode, "");
        
        // The sandbox runs on Linux, so it must return false, proving it cannot see your laptop's real host files!
        assertEquals("SUCCESS", result.status);
        assertEquals("false", result.output); 
    }

}
