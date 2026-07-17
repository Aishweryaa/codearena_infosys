package com.codearena.backend.dto;

import com.codearena.backend.enums.Role;
import jakarta.validation.constraints.NotNull;

public record UpdateRoleRequest(
        @NotNull(message = "Role is required")
        Role role
) {
}
