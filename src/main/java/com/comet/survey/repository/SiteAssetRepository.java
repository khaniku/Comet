package com.comet.survey.repository;

import com.comet.survey.model.SiteAsset;
import com.comet.survey.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface  SiteAssetRepository extends JpaRepository<SiteAsset, Long> {
    List<SiteAsset> findBySurvey(Survey survey);
}
