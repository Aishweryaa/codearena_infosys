package com.codearena.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record GoogleLoginRequest(
        @NotBlank(message = "Google credential is required")
        String credential
) {
}
