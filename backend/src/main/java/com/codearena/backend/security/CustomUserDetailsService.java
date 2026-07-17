package com.codearena.backend.security;

import com.codearena.backend.entity.User;
import com.codearena.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String password = user.getPasswordHash() == null ? "{noop}GOOGLE_ACCOUNT" : user.getPasswordHash();

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(password)
                .roles(user.getRole().name())
                .build();
    }
}
