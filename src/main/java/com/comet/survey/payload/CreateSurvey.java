package com.comet.survey.payload;

import com.comet.survey.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.*;
import java.util.Date;
@Data
public class CreateSurvey {

    @NotNull
    @Size(min = 1, max = 70)
    private String userID;

    @NotNull
    @Size(min = 1, max = 70)
    private String dueDate;

    
    @NotNull
    @Size(min = 1, max = 70)
    private String siteAddress;
   

    @NotNull
    @Size(min = 1, max = 70)
    private String customerName;

    @NotNull
    @Size(min = 1, max = 70)
    private String customerID;

    @NotNull
    @Size(min = 1, max = 70)
    private String customerEmail;


    

}