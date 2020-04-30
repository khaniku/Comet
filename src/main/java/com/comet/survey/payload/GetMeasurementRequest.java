package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class GetMeasurementRequest {
    @NotNull
    List<Long> assetIds;
}
