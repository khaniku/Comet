package com.comet.survey.repository;

import com.comet.survey.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {


    Boolean existsByToken(String token);

    Optional<PasswordResetToken> findByToken(String token);
}
