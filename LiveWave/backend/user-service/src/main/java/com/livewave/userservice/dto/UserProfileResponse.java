package com.livewave.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private Long id;
    private Long authUserId;
    private String username;
    private String displayName;
    private String bio;
    private String avatarUrl;
    private String country;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
