package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;
import java.util.List;

//@Data
public class GetMeasurementRequest {
    @NotNull
    List<Long> assetIds;

    public List<Long> getAssetIds() {
        return assetIds;
    }

    public void setAssetIds(List<Long> assetIds) {
        this.assetIds = assetIds;
    }
}
