package com.comet.survey.repository;

import com.comet.survey.model.SurveyStatus;
import com.comet.survey.model.SurveyStatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurveyStatusRepository extends JpaRepository<SurveyStatus, Long> {
    Optional<SurveyStatus> findByName(SurveyStatusName name);
}
