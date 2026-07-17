package com.codearena.backend.config;

import com.codearena.backend.entity.LeaderboardEntry;
import com.codearena.backend.entity.User;
import com.codearena.backend.enums.AuthProvider;
import com.codearena.backend.enums.Role;
import com.codearena.backend.repository.LeaderboardEntryRepository;
import com.codearena.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AdminBootstrap implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LeaderboardEntryRepository leaderboardEntryRepository;
    private final PasswordEncoder passwordEncoder;
    private final boolean enabled;
    private final String username;
    private final String email;
    private final String password;

    public AdminBootstrap(
            UserRepository userRepository,
            LeaderboardEntryRepository leaderboardEntryRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.bootstrap-admin.enabled}") boolean enabled,
            @Value("${app.bootstrap-admin.username}") String username,
            @Value("${app.bootstrap-admin.email}") String email,
            @Value("${app.bootstrap-admin.password}") String password) {
        this.userRepository = userRepository;
        this.leaderboardEntryRepository = leaderboardEntryRepository;
        this.passwordEncoder = passwordEncoder;
        this.enabled = enabled;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (!enabled || userRepository.existsByEmailIgnoreCase(email)) {
            return;
        }

        User admin = new User();
        admin.setUsername(username);
        admin.setEmail(email.toLowerCase());
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setRole(Role.ADMIN);
        admin.setAuthProvider(AuthProvider.LOCAL);
        User saved = userRepository.save(admin);

        LeaderboardEntry entry = new LeaderboardEntry();
        entry.setUser(saved);
        leaderboardEntryRepository.save(entry);
    }
}
