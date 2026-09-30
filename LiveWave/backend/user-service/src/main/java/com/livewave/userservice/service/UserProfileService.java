package com.livewave.userservice.service;

import com.livewave.userservice.dto.CreateProfileRequest;
import com.livewave.userservice.dto.UpdateProfileRequest;
import com.livewave.userservice.dto.UserProfileResponse;
import com.livewave.userservice.entity.UserProfile;
import com.livewave.userservice.exception.DuplicateResourceException;
import com.livewave.userservice.exception.ResourceNotFoundException;
import com.livewave.userservice.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @Transactional
    public UserProfileResponse createProfile(CreateProfileRequest request) {
        if (userProfileRepository.existsByAuthUserId(request.getAuthUserId())) {
            throw new DuplicateResourceException("User profile with authUserId '" + request.getAuthUserId() + "' already exists");
        }

        if (userProfileRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("User profile with username '" + request.getUsername() + "' already exists");
        }

        UserProfile profile = UserProfile.builder()
                .authUserId(request.getAuthUserId())
                .username(request.getUsername().trim())
                .displayName(request.getDisplayName().trim())
                .bio(request.getBio() != null ? request.getBio().trim() : null)
                .avatarUrl(request.getAvatarUrl() != null ? request.getAvatarUrl().trim() : null)
                .country(request.getCountry() != null ? request.getCountry().trim() : null)
                .build();

        UserProfile savedProfile = userProfileRepository.save(profile);
        return mapToResponse(savedProfile);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfileById(Long id) {
        UserProfile profile = userProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User profile with id '" + id + "' not found"));
        return mapToResponse(profile);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfileByAuthUserId(Long authUserId) {
        UserProfile profile = userProfileRepository.findByAuthUserId(authUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User profile with authUserId '" + authUserId + "' not found"));
        return mapToResponse(profile);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfileByUsername(String username) {
        UserProfile profile = userProfileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User profile with username '" + username + "' not found"));
        return mapToResponse(profile);
    }

    @Transactional
    public UserProfileResponse updateProfile(Long id, UpdateProfileRequest request) {
        UserProfile profile = userProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User profile with id '" + id + "' not found"));

        if (request.getDisplayName() != null) {
            if (request.getDisplayName().isBlank()) {
                throw new IllegalArgumentException("displayName cannot be empty or blank");
            }
            profile.setDisplayName(request.getDisplayName().trim());
        }

        if (request.getBio() != null) {
            profile.setBio(request.getBio().trim());
        }

        if (request.getAvatarUrl() != null) {
            profile.setAvatarUrl(request.getAvatarUrl().trim());
        }

        if (request.getCountry() != null) {
            profile.setCountry(request.getCountry().trim());
        }

        UserProfile updatedProfile = userProfileRepository.save(profile);
        return mapToResponse(updatedProfile);
    }

    @Transactional
    public UserProfileResponse updateProfileByUsername(String username, UpdateProfileRequest request) {
        UserProfile profile = userProfileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User profile with username '" + username + "' not found"));

        if (request.getDisplayName() != null) {
            if (request.getDisplayName().isBlank()) {
                throw new IllegalArgumentException("displayName cannot be empty or blank");
            }
            profile.setDisplayName(request.getDisplayName().trim());
        }

        if (request.getBio() != null) {
            profile.setBio(request.getBio().trim());
        }

        if (request.getAvatarUrl() != null) {
            profile.setAvatarUrl(request.getAvatarUrl().trim());
        }

        if (request.getCountry() != null) {
            profile.setCountry(request.getCountry().trim());
        }

        UserProfile updatedProfile = userProfileRepository.save(profile);
        return mapToResponse(updatedProfile);
    }

    private UserProfileResponse mapToResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .id(profile.getId())
                .authUserId(profile.getAuthUserId())
                .username(profile.getUsername())
                .displayName(profile.getDisplayName())
                .bio(profile.getBio())
                .avatarUrl(profile.getAvatarUrl())
                .country(profile.getCountry())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
