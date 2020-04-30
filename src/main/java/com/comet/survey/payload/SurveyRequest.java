package com.comet.survey.payload;

import com.comet.survey.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    @Size(min = 1, max = 80)
    private String customerName;

    @NotNull
    @Size(min = 1, max = 100)
    private String siteAddress;

    @JsonFormat(pattern="dd MMMM yyyy")
    @Temporal(TemporalType.DATE)
    private Date dueDate;

}