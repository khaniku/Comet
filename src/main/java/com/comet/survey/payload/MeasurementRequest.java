package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

//@Data
public class MeasurementRequest {
    @NotNull
    private String description;

    @NotNull
    private long assetId;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getAssetId() {
        return assetId;
    }

    public void setAssetId(long assetId) {
        this.assetId = assetId;
    }
}
