package com.codearena.codearena.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Static frontend pages - allow browser to open HTML/CSS/JS
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/login.html",
                                "/register.html",
                                "/privacy.html",
                                "/terms.html",
                                "/css/**",
                                "/js/**",
                                "/assets/**",
                                "/admin/**",
                                "/student/**"
                        ).permitAll()

                        // Auth APIs - public
                        .requestMatchers(
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/api/v1/auth/**"
                        ).permitAll()

                        // Swagger/OpenAPI - public
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // Problem view - USER and ADMIN
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/problem",
                                "/api/v1/problem/**"
                        ).hasAnyRole("USER", "ADMIN")

                        // Problem create/update/delete - ADMIN only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/problem",
                                "/api/v1/problem/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/problem",
                                "/api/v1/problem/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/problem",
                                "/api/v1/problem/**"
                        ).hasRole("ADMIN")

                        // Submissions - logged-in users
                        .requestMatchers(
                                "/api/v1/submissions",
                                "/api/v1/submissions/**"
                        ).authenticated()

                        // Leaderboard - logged-in users
                        .requestMatchers(
                                "/api/v1/leaderboard",
                                "/api/v1/leaderboard/**"
                        ).authenticated()

                        // Any other request needs login
                        .anyRequest().authenticated()
                )

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}