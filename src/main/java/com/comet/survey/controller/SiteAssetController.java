package com.comet.survey.controller;

import com.comet.survey.model.SiteAsset;
import com.comet.survey.model.Survey;
import com.comet.survey.payload.SiteAssetRequest;
import com.comet.survey.repository.SiteAssetRepository;
import com.comet.survey.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/siteAsset")
public class SiteAssetController {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    SiteAssetRepository siteAssetRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createAsset(@Valid @RequestBody SiteAssetRequest siteAssetRequest) {
        SiteAsset siteAsset = new SiteAsset(siteAssetRequest.getDescription(), siteAssetRequest.getAssetType());
        Optional<Survey> survey = surveyRepository.findById(siteAssetRequest.getSurveyId());
        if (survey.isPresent()) {
            siteAsset.setSurvey(survey.get());
        }
        SiteAsset result = siteAssetRepository.save(siteAsset);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/assets")
    public ResponseEntity<?> assignedSurvey(@RequestParam long surveyId) {
        Optional<Survey> fetchSurvey = surveyRepository.findById(surveyId);
        Survey survey = new Survey();
        if (fetchSurvey.isPresent()) {
            survey = fetchSurvey.get();
        }
        List<SiteAsset> siteAssets = siteAssetRepository.findBySurvey(survey);
        return ResponseEntity.ok(siteAssets);
    }
}
