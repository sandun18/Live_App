package com.livewave.authservice.dto;

import com.livewave.authservice.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {

    private Long id;
    private String username;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}
