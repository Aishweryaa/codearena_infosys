package com.codearena.codearena.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.codearena.codearena.dto.RegisterRequest;
import com.codearena.codearena.dto.LoginRequest; // 1. Add this import if you have a LoginRequest DTO
import com.codearena.codearena.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        String response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    // 2. PASTE THIS NEW METHOD BLOCK BELOW:
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        // This calls your service layer to verify credentials and return the JWT token
        String token = authService.login(request); 
        return ResponseEntity.ok(java.util.Map.of("token", token));
    }
}


