package com.codearena.codearena.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


        if ("admin@codearena.com".equals(username) || "user@codearena.com".equals(username)) {
            return new org.springframework.security.core.userdetails.User(
                    username,
                    "$2a$10$8K1p/aP9WbU.gZ8rFf6pzeS9K09Z4zYhU6vE0bK1A6N2w7C3v9m1m",
                    new ArrayList<>()
            );
        }



        throw new UsernameNotFoundException("User not found with email: " + username);
    }
}