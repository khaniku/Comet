package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class MeasurementRequest {
    @NotNull
    private String description;

    @NotNull
    private long assetId;
}
