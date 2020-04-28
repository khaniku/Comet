package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class ChangePasswordRequest {

    @NotNull
    String token;

    @NotNull
    String password;
}
