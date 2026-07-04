package com.codearena.codearena.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codearena.codearena.repository.UserRepository;
import com.codearena.codearena.security.JwtUtils;
import com.codearena.codearena.security.CustomUserDetailsService;
import com.codearena.codearena.dto.RegisterRequest;
import com.codearena.codearena.dto.LoginRequest;
import com.codearena.codearena.model.User;
import com.codearena.codearena.model.Role;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils,
                       CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    // TASK 4: REGISTER API
    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        if (request.getRole() == null || request.getRole().isBlank()) {
            user.setRole(Role.USER);
        } else {
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role. Allowed: USER or ADMIN");
            }
        }

        userRepository.save(user);
        return "User registered successfully";
    }

    // TASK 5: LOGIN API (WITH GENUINE CRYPTO TOKENS!)
    public String login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // Load the user credentials using your partner's user detail loader
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        
        // Generate a real cryptographic token string!
        return jwtUtils.generateToken(userDetails);
    }
}
