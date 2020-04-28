package com.comet.survey.repository;

import com.comet.survey.model.Measurement;
import com.comet.survey.model.SiteAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByAsset(SiteAsset asset);
}
