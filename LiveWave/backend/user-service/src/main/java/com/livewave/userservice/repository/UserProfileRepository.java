package com.livewave.userservice.repository;

import com.livewave.userservice.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByAuthUserId(Long authUserId);

    Optional<UserProfile> findByUsername(String username);

    boolean existsByAuthUserId(Long authUserId);

    boolean existsByUsername(String username);
}
