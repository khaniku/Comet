package com.comet.survey.payload;

import com.comet.survey.model.User;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.*;
import java.util.Date;

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

    @Temporal(TemporalType.DATE)
    private Date dueDate;

}