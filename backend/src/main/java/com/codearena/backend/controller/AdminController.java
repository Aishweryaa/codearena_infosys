package com.codearena.backend.controller;

import com.codearena.backend.dto.AdminDashboardResponse;
import com.codearena.backend.dto.UpdateRoleRequest;
import com.codearena.backend.dto.UserSummaryResponse;
import com.codearena.backend.service.AdminService;
import com.codearena.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin")
public class AdminController {

    private final AdminService adminService;
    private final DashboardService dashboardService;

    public AdminController(AdminService adminService, DashboardService dashboardService) {
        this.adminService = adminService;
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get admin dashboard statistics")
    public ResponseEntity<AdminDashboardResponse> dashboard() {
        return ResponseEntity.ok(dashboardService.adminDashboard());
    }

    @GetMapping("/users")
    @Operation(summary = "List every registered user")
    public ResponseEntity<List<UserSummaryResponse>> users() {
        return ResponseEntity.ok(adminService.allUsers());
    }

    @PutMapping("/users/{userId}/role")
    @Operation(summary = "Update a user's role")
    public ResponseEntity<UserSummaryResponse> updateRole(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateRoleRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(
                adminService.updateRole(userId, request, authentication.getName()));
    }
}
