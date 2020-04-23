package com.comet.survey.repository;

import com.comet.survey.model.Picture;
import com.comet.survey.model.SiteAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> findByPictureAsset(SiteAsset asset);
}
