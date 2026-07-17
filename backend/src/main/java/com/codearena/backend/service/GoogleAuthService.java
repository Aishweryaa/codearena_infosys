package com.codearena.backend.service;

import com.codearena.backend.dto.AuthResponse;
import com.codearena.backend.entity.LeaderboardEntry;
import com.codearena.backend.entity.User;
import com.codearena.backend.enums.AuthProvider;
import com.codearena.backend.enums.Role;
import com.codearena.backend.exception.InvalidCredentialsException;
import com.codearena.backend.repository.LeaderboardEntryRepository;
import com.codearena.backend.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleAuthService {

    private final UserRepository userRepository;
    private final LeaderboardEntryRepository leaderboardEntryRepository;
    private final AuthService authService;
    private final GoogleIdTokenVerifier verifier;

    public GoogleAuthService(
            UserRepository userRepository,
            LeaderboardEntryRepository leaderboardEntryRepository,
            AuthService authService,
            @Value("${app.google.client-id}") String clientId) {
        this.userRepository = userRepository;
        this.leaderboardEntryRepository = leaderboardEntryRepository;
        this.authService = authService;
        this.verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    @Transactional
    public AuthResponse login(String credential) {
        try {
            GoogleIdToken idToken = verifier.verify(credential);

            if (idToken == null) {
                throw new InvalidCredentialsException("Invalid Google credential");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();

            if (!Boolean.TRUE.equals(payload.getEmailVerified())) {
                throw new InvalidCredentialsException("Google email is not verified");
            }

            String providerId = payload.getSubject();
            String email = payload.getEmail().trim().toLowerCase();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            User user = userRepository.findByProviderId(providerId)
                    .orElseGet(() -> findOrCreate(email, providerId, name, picture));

            user.setAuthProvider(AuthProvider.GOOGLE);
            user.setProviderId(providerId);
            if (picture != null && !picture.isBlank()) {
                user.setProfilePicture(picture);
            }

            User saved = userRepository.save(user);
            ensureLeaderboardEntry(saved);

            return authService.response("Google login successful", saved);
        } catch (GeneralSecurityException | IOException exception) {
            throw new InvalidCredentialsException("Unable to verify Google credential");
        }
    }

    private User findOrCreate(String email, String providerId, String name, String picture) {
        return userRepository.findByEmailIgnoreCase(email)
                .map(existing -> {
                    existing.setProviderId(providerId);
                    existing.setAuthProvider(AuthProvider.GOOGLE);
                    if (picture != null) {
                        existing.setProfilePicture(picture);
                    }
                    return existing;
                })
                .orElseGet(() -> {
                    User user = new User();
                    user.setUsername(createUniqueUsername(name, email));
                    user.setEmail(email);
                    user.setPasswordHash(null);
                    user.setRole(Role.USER);
                    user.setAuthProvider(AuthProvider.GOOGLE);
                    user.setProviderId(providerId);
                    user.setProfilePicture(picture);
                    return user;
                });
    }

    private String createUniqueUsername(String name, String email) {
        String base = name == null || name.isBlank()
                ? email.substring(0, email.indexOf('@'))
                : name;

        base = base.replaceAll("[^A-Za-z0-9_]", "");
        if (base.length() < 3) {
            base = "user";
        }
        if (base.length() > 40) {
            base = base.substring(0, 40);
        }

        String candidate = base;
        int number = 1;
        while (userRepository.existsByUsernameIgnoreCase(candidate)) {
            candidate = base + number++;
        }
        return candidate;
    }

    private void ensureLeaderboardEntry(User user) {
        if (leaderboardEntryRepository.findByUserId(user.getId()).isEmpty()) {
            LeaderboardEntry entry = new LeaderboardEntry();
            entry.setUser(user);
            leaderboardEntryRepository.save(entry);
        }
    }
}
