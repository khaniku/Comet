package com.comet.survey.payload;

import com.comet.survey.model.User;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SurveyRequest {

    @NotNull(message = "Please choose a surveyor")
    private long surveyor;

    @NotNull
    @Size(min = 1, max = 70)
    private String customerName;

    @NotNull
    @Size(min = 1, max = 70)
    private String siteAddress;

}