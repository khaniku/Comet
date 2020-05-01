package com.comet.survey.payload;

import com.comet.survey.model.Measurement;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

//@Data
public class MeasurementValueRequest {
    @NotNull
    private long assetId;

    @NotNull
    List<Measurement> measurements;

    public long getAssetId() {
        return assetId;
    }

    public void setAssetId(long assetId) {
        this.assetId = assetId;
    }

    public List<Measurement> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(List<Measurement> measurements) {
        this.measurements = measurements;
    }
}
