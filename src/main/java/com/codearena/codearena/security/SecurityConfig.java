package com.codearena.codearena.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
                        // 1. Public Authentication Routes
                        .requestMatchers("/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()

                        // 🌟 2. Student & Admin can BOTH view problems using GET
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/v1/problem", "/api/v1/problem/**").hasAnyRole("USER", "ADMIN")

                        // 🌟 3. ONLY Admins can modify or create problems using POST, PUT, DELETE
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/v1/problem", "/api/v1/problem/**").hasRole("ADMIN")
                        .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/v1/problem", "/api/v1/problem/**").hasRole("ADMIN")
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/v1/problem", "/api/v1/problem/**").hasRole("ADMIN")

                        // 🌟 4. SECURE ACCESS TRACK MAPPING FOR SUBMISSIONS:
                        .requestMatchers("/api/v1/submissions", "/api/v1/submissions/**").authenticated()

                        // 🌟 5. SECURE ACCESS TRACK MAPPING FOR LEADERBOARD:
                        .requestMatchers("/api/v1/leaderboard", "/api/v1/leaderboard/**").authenticated()

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
