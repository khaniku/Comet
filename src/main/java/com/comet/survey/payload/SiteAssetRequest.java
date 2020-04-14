package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class SiteAssetRequest {
    @NotNull
    private String description;

    @NotNull
    private String assetType;

    @NotNull
    private int surveyId;
}
