package com.comet.survey.payload;

import com.comet.survey.model.SurveyStatusName;
import lombok.Data;
import javax.validation.constraints.NotNull;

//@Data
public class SurveyStatusRequest {
    @NotNull
    private long surveyId;

    @NotNull
    private SurveyStatusName status;

    public long getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(long surveyId) {
        this.surveyId = surveyId;
    }

    public SurveyStatusName getStatus() {
        return status;
    }

    public void setStatus(SurveyStatusName status) {
        this.status = status;
    }
}
