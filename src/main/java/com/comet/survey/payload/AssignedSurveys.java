package com.comet.survey.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class AssignedSurveys {

    @NotNull
    private long userId;

}
