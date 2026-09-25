package com.livewave.authservice.config;

import com.livewave.authservice.entity.Role;
import com.livewave.authservice.entity.User;
import com.livewave.authservice.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_USERNAME:}")
    private String adminUsername;

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:}")
    private String adminPassword;

    public AdminUserInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (adminUsername == null || adminUsername.isBlank()
                || adminEmail == null || adminEmail.isBlank()
                || adminPassword == null || adminPassword.isBlank()) {
            log.info("Admin bootstrap credentials not provided or incomplete. Skipping initial ADMIN creation.");
            return;
        }

        String username = adminUsername.trim();
        String email = adminEmail.trim();

        if (userRepository.existsByUsername(username)) {
            log.info("Admin user with username '{}' already exists. Skipping creation.", username);
            return;
        }

        if (userRepository.existsByEmail(email)) {
            log.info("User with email '{}' already exists. Skipping admin creation.", email);
            return;
        }

        User admin = User.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(adminPassword.trim()))
                .role(Role.ADMIN)
                .build();

        userRepository.save(admin);
        log.info("Successfully initialized ADMIN account for username: '{}'", username);
    }
}
