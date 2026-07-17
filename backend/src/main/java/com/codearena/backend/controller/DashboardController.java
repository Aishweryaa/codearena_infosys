package com.codearena.backend.controller;

import com.codearena.backend.dto.UserDashboardResponse;
import com.codearena.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "User Dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/user")
    @Operation(summary = "Get dashboard statistics for the authenticated user")
    public ResponseEntity<UserDashboardResponse> userDashboard(Authentication authentication) {
        return ResponseEntity.ok(dashboardService.userDashboard(authentication.getName()));
    }
}
