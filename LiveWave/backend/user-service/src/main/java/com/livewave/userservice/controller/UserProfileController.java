package com.livewave.userservice.controller;

import com.livewave.userservice.dto.CreateProfileRequest;
import com.livewave.userservice.dto.UpdateProfileRequest;
import com.livewave.userservice.dto.UserProfileResponse;
import com.livewave.userservice.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public ResponseEntity<UserProfileResponse> createProfile(@Valid @RequestBody CreateProfileRequest request) {
        UserProfileResponse response = userProfileService.createProfile(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile(Authentication authentication) {
        String username = authentication.getName();
        UserProfileResponse response = userProfileService.getProfileByUsername(username);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateCurrentUserProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        String username = authentication.getName();
        UserProfileResponse response = userProfileService.updateProfileByUsername(username, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponse> getProfileById(@PathVariable Long id) {
        UserProfileResponse response = userProfileService.getProfileById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/{authUserId}")
    public ResponseEntity<UserProfileResponse> getProfileByAuthUserId(@PathVariable Long authUserId) {
        UserProfileResponse response = userProfileService.getProfileByAuthUserId(authUserId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserProfileResponse> getProfileByUsername(@PathVariable String username) {
        UserProfileResponse response = userProfileService.getProfileByUsername(username);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        UserProfileResponse response = userProfileService.updateProfile(id, request);
        return ResponseEntity.ok(response);
    }
}
