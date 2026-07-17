package com.codearena.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must contain 3 to 50 characters")
        @Pattern(regexp = "^[A-Za-z0-9_]+$", message = "Username can contain only letters, numbers and underscore")
        String username,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email address")
        @Size(max = 190, message = "Email is too long")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 64, message = "Password must contain 8 to 64 characters")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,64}$",
                message = "Password must contain uppercase, lowercase, number and special character"
        )
        String password
) {
}
