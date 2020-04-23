package com.comet.survey.payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.constraints.NotNull;

@Data
public class PictureUploadRequest {
    @NotNull
    MultipartFile file;

    @NotNull
    private long assetId;

}
