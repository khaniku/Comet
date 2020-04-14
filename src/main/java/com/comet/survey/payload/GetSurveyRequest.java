package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class GetSurveyRequest {
    @NotNull
    private long surveyId;
}
