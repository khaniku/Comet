package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

//@Data
public class SiteAssetRequest {
    @NotNull
    private String description;

    @NotNull
    private String assetType;

    @NotNull
    private int surveyId;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public int getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(int surveyId) {
        this.surveyId = surveyId;
    }
}
