package com.livewave.userservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.livewave.userservice.dto.UpdateProfileRequest;
import com.livewave.userservice.dto.UserProfileResponse;
import com.livewave.userservice.service.UserProfileService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.jwt.secret=livewave-super-secret-key-which-is-at-least-256-bits-long-12345",
        "spring.datasource.url=jdbc:postgresql://localhost:5432/livewave_users",
        "spring.jpa.hibernate.ddl-auto=none"
})
class SecurityAndProfileTest {

    private static final String TEST_SECRET = "livewave-super-secret-key-which-is-at-least-256-bits-long-12345";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserProfileService userProfileService;

    private SecretKey key;

    @BeforeEach
    void setUp() {
        key = Keys.hmacShaKeyFor(TEST_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    private String createToken(String username, String role, long expirationMillis) {
        Date now = new Date();
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMillis))
                .signWith(key)
                .compact();
    }

    @Test
    @DisplayName("1. GET /api/users/me without JWT returns 401 UNAUTHORIZED")
    void getMe_WithoutToken_Returns401() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    @DisplayName("2. GET /api/users/me with expired JWT returns 401 UNAUTHORIZED")
    void getMe_WithExpiredToken_Returns401() throws Exception {
        String expiredToken = createToken("sandun", "USER", -10000);

        mockMvc.perform(get("/api/users/me")
                        .header("Authorization", "Bearer " + expiredToken))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    @DisplayName("3. GET /api/users/me with invalid signature returns 401 UNAUTHORIZED")
    void getMe_WithInvalidSignatureToken_Returns401() throws Exception {
        SecretKey badKey = Keys.hmacShaKeyFor("different-secret-key-which-is-also-256-bits-long-1234".getBytes(StandardCharsets.UTF_8));
        String badToken = Jwts.builder()
                .subject("sandun")
                .claim("role", "USER")
                .signWith(badKey)
                .compact();

        mockMvc.perform(get("/api/users/me")
                        .header("Authorization", "Bearer " + badToken))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    @DisplayName("4. GET /api/users/me with valid USER JWT returns 200 OK and user profile")
    void getMe_WithValidToken_ReturnsProfile() throws Exception {
        String token = createToken("sandun", "USER", 3600000);

        UserProfileResponse response = UserProfileResponse.builder()
                .id(1L)
                .authUserId(4L)
                .username("sandun")
                .displayName("Sandun Perera")
                .bio("Software Engineer")
                .avatarUrl("https://example.com/avatar.jpg")
                .country("Sri Lanka")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(userProfileService.getProfileByUsername("sandun")).thenReturn(response);

        mockMvc.perform(get("/api/users/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.authUserId").value(4))
                .andExpect(jsonPath("$.username").value("sandun"))
                .andExpect(jsonPath("$.displayName").value("Sandun Perera"))
                .andExpect(jsonPath("$.bio").value("Software Engineer"))
                .andExpect(jsonPath("$.country").value("Sri Lanka"));
    }

    @Test
    @DisplayName("5. PUT /api/users/me with valid USER JWT updates profile and returns 200 OK")
    void putMe_WithValidToken_UpdatesProfile() throws Exception {
        String token = createToken("sandun", "USER", 3600000);

        UpdateProfileRequest request = UpdateProfileRequest.builder()
                .displayName("Sandun Updated")
                .bio("Updated Bio")
                .avatarUrl("https://example.com/new.jpg")
                .country("Sri Lanka")
                .build();

        UserProfileResponse response = UserProfileResponse.builder()
                .id(1L)
                .authUserId(4L)
                .username("sandun")
                .displayName("Sandun Updated")
                .bio("Updated Bio")
                .avatarUrl("https://example.com/new.jpg")
                .country("Sri Lanka")
                .createdAt(LocalDateTime.now().minusDays(1))
                .updatedAt(LocalDateTime.now())
                .build();

        when(userProfileService.updateProfileByUsername(eq("sandun"), any(UpdateProfileRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/users/me")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.authUserId").value(4))
                .andExpect(jsonPath("$.username").value("sandun"))
                .andExpect(jsonPath("$.displayName").value("Sandun Updated"))
                .andExpect(jsonPath("$.bio").value("Updated Bio"));
    }

    @Test
    @DisplayName("6. PUT /api/users/1 with normal USER token returns 403 FORBIDDEN")
    void putUserById_WithUserRole_Returns403() throws Exception {
        String userToken = createToken("regular_user", "USER", 3600000);

        UpdateProfileRequest request = UpdateProfileRequest.builder()
                .displayName("Malicious Update")
                .build();

        mockMvc.perform(put("/api/users/1")
                        .header("Authorization", "Bearer " + userToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.error").value("Forbidden"))
                .andExpect(jsonPath("$.message").value("Access denied: insufficient permissions"));
    }

    @Test
    @DisplayName("7. PUT /api/users/1 with ADMIN token succeeds (200 OK)")
    void putUserById_WithAdminRole_Returns200() throws Exception {
        String adminToken = createToken("admin_user", "ADMIN", 3600000);

        UpdateProfileRequest request = UpdateProfileRequest.builder()
                .displayName("Admin Updated Name")
                .build();

        UserProfileResponse response = UserProfileResponse.builder()
                .id(1L)
                .authUserId(4L)
                .username("sandun")
                .displayName("Admin Updated Name")
                .country("Sri Lanka")
                .build();

        when(userProfileService.updateProfile(eq(1L), any(UpdateProfileRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/users/1")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.displayName").value("Admin Updated Name"));
    }

    @Test
    @DisplayName("8. GET /api/users/1 with valid JWT returns 200 OK")
    void getUserById_WithValidToken_Returns200() throws Exception {
        String userToken = createToken("sandun", "USER", 3600000);

        UserProfileResponse response = UserProfileResponse.builder()
                .id(1L)
                .authUserId(4L)
                .username("sandun")
                .displayName("Sandun")
                .country("Sri Lanka")
                .build();

        when(userProfileService.getProfileById(1L)).thenReturn(response);

        mockMvc.perform(get("/api/users/1")
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("sandun"));
    }
}
