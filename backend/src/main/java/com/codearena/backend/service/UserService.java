package com.codearena.backend.service;

import com.codearena.backend.dto.UserProfileResponse;
import com.codearena.backend.entity.User;
import com.codearena.backend.exception.ResourceNotFoundException;
import com.codearena.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileResponse currentUser(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User account not found"));

        return toProfile(user);
    }

    public UserProfileResponse toProfile(User user) {
        return new UserProfileResponse(
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
