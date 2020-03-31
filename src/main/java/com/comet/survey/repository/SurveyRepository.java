package com.comet.survey.repository;

import com.comet.survey.model.Survey;
import com.comet.survey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    Optional<Survey> findByCustomerName(String name);
    Optional<Survey> findById(long id);
    Optional<Survey> findBySurveyor(long id);
}
