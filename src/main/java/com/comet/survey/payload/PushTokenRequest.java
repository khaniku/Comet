package com.comet.survey.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PushTokenRequest {
    @NotNull
    private long userId;

    @NotNull
    private String token;

    @NotNull
    private String brand;
}
