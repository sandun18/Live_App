package com.livewave.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProfileRequest {

    @NotNull(message = "authUserId is required")
    private Long authUserId;

    @NotBlank(message = "username is required")
    private String username;

    @NotBlank(message = "displayName is required")
    @Size(max = 100, message = "displayName must not exceed 100 characters")
    private String displayName;

    @Size(max = 500, message = "bio must not exceed 500 characters")
    private String bio;

    private String avatarUrl;

    @Size(max = 100, message = "country must not exceed 100 characters")
    private String country;
}
