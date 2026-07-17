package com.codearena.backend.service;

import com.codearena.backend.dto.UpdateRoleRequest;
import com.codearena.backend.dto.UserSummaryResponse;
import com.codearena.backend.entity.User;
import com.codearena.backend.exception.ResourceNotFoundException;
import com.codearena.backend.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserSummaryResponse> allUsers() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::toSummary)
                .toList();
    }

    @Transactional
    public UserSummaryResponse updateRole(
            Long userId,
            UpdateRoleRequest request,
            String currentAdminEmail) {

        User target = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (target.getEmail().equalsIgnoreCase(currentAdminEmail)
                && target.getRole() != request.role()) {
            throw new IllegalArgumentException("You cannot change your own admin role");
        }

        target.setRole(request.role());
        return toSummary(userRepository.save(target));
    }

    private UserSummaryResponse toSummary(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getAuthProvider().name(),
                user.getProfilePicture(),
                user.getCreatedAt()
        );
    }
}
