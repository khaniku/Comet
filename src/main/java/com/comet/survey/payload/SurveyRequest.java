package com.comet.survey.payload;

import com.comet.survey.model.User;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SurveyRequest {

    private long surveyor;

    @Size(min = 1, max = 70)
    private String customerName;

    @Size(min = 1, max = 70)
    private String siteAddress;

    private long surveyId;

}