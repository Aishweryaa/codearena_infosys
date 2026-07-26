package com.codearena.backend.service;

import com.codearena.backend.dto.AuthResponse;
import com.codearena.backend.dto.LoginRequest;
import com.codearena.backend.dto.RegisterRequest;
import com.codearena.backend.entity.LeaderboardEntry;
import com.codearena.backend.entity.User;
import com.codearena.backend.enums.AuthProvider;
import com.codearena.backend.enums.Role;
import com.codearena.backend.exception.ConflictException;
import com.codearena.backend.exception.InvalidCredentialsException;
import com.codearena.backend.repository.LeaderboardEntryRepository;
import com.codearena.backend.repository.UserRepository;
import com.codearena.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final LeaderboardEntryRepository
            leaderboardEntryRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            LeaderboardEntryRepository leaderboardEntryRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            EmailService emailService) {

        this.userRepository = userRepository;

        this.leaderboardEntryRepository =
                leaderboardEntryRepository;

        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @Transactional
    public AuthResponse register(
            RegisterRequest request) {

        String email =
                request.email()
                        .trim()
                        .toLowerCase();

        String username =
                request.username()
                        .trim();

        if (userRepository
                .existsByEmailIgnoreCase(email)) {

            throw new ConflictException(
                    "An account already exists with this email"
            );
        }

        if (userRepository
                .existsByUsernameIgnoreCase(username)) {

            throw new ConflictException(
                    "This username is already taken"
            );
        }

        User user = new User();

        user.setUsername(username);
        user.setEmail(email);

        user.setPasswordHash(
                passwordEncoder.encode(
                        request.password()
                )
        );

        user.setRole(Role.USER);
        user.setAuthProvider(AuthProvider.LOCAL);

        User saved =
                userRepository.save(user);

        createLeaderboardEntry(saved);

        emailService.sendRegistrationConfirmation(
                saved.getEmail(),
                saved.getUsername()
        );

        return response(
                "Registration successful",
                saved
        );
    }

    @Transactional(readOnly = true)
    public AuthResponse login(
            LoginRequest request) {

        User user =
                userRepository
                        .findByEmailIgnoreCase(
                                request.email().trim()
                        )
                        .orElseThrow(() ->
                                new InvalidCredentialsException(
                                        "Invalid email or password"
                                )
                        );

        if (user.getPasswordHash() == null) {

            throw new InvalidCredentialsException(
                    "This account uses Google login"
            );
        }

        if (!passwordEncoder.matches(
                request.password(),
                user.getPasswordHash())) {

            throw new InvalidCredentialsException(
                    "Invalid email or password"
            );
        }

        emailService.sendLoginConfirmation(
                user.getEmail(),
                user.getUsername()
        );

        return response(
                "Login successful",
                user
        );
    }

    public AuthResponse response(
            String message,
            User user) {

        return new AuthResponse(
                message,
                jwtService.generateToken(user),
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getProfilePicture()
        );
    }

    private void createLeaderboardEntry(
            User user) {

        LeaderboardEntry entry =
                new LeaderboardEntry();

        entry.setUser(user);

        leaderboardEntryRepository.save(entry);
    }
}