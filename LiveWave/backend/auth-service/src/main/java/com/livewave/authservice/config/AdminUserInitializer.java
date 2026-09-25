package com.livewave.authservice.config;

import com.livewave.authservice.entity.Role;
import com.livewave.authservice.entity.User;
import com.livewave.authservice.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@livewave.com")
                    .password(passwordEncoder.encode("AdminPass123!"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Initialized default ADMIN test account (username: admin)");
        }
    }
}
