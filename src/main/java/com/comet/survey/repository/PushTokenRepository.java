package com.comet.survey.repository;

import com.comet.survey.model.PushToken;
import com.comet.survey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PushTokenRepository extends JpaRepository<PushToken, Long> {
    List<PushToken> findByUserIdId(long userId);
    Boolean existsByToken(String token);
}
