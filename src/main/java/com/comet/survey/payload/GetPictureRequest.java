package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class GetPictureRequest {
    @NotNull
    List<Long> assetIds;
}
