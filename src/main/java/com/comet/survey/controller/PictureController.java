package com.comet.survey.controller;

import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.Measurement;
import com.comet.survey.model.Picture;
import com.comet.survey.model.SiteAsset;
import com.comet.survey.model.User;
import com.comet.survey.payload.GetPictureRequest;
import com.comet.survey.repository.PictureRepository;
import com.comet.survey.repository.SiteAssetRepository;
import com.comet.survey.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/picture")
public class PictureController {

    private static final Logger logger = LoggerFactory.getLogger(PictureController.class);


    @Autowired
    SiteAssetRepository siteAssetRepository;

    @Autowired
    PictureRepository pictureRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, long assetId) {
        System.out.println("file: "+file);
        String fileName = fileStorageService.storeFile(file);
        Optional<SiteAsset> siteAsset = siteAssetRepository.findById(assetId);
        Picture picture = new Picture();

        if (siteAsset.isPresent()) {
            picture.setPictureAsset(siteAsset.get());
            //String filePath = "uploads/"+fileName;
            picture.setFileLocation(fileName);
        }
        Picture result = pictureRepository.save(picture);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/uploadMultiple")
    public List<ResponseEntity> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, long assetId) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, assetId))
                .collect(Collectors.toList());
    }

    @PostMapping("/fetchPictures")
    public ResponseEntity<?> fetchPictures(@RequestBody GetPictureRequest getPictureRequest) {
        List<List> pictures = new ArrayList<>();

        for(Long assetId: getPictureRequest.getAssetIds()){
            Optional<SiteAsset> fetchAsset = siteAssetRepository.findById(assetId);
            SiteAsset siteAsset = new SiteAsset();
            if (fetchAsset.isPresent()) {
                siteAsset = fetchAsset.get();
            }
            List<Picture> picture = pictureRepository.findByPictureAsset(siteAsset);
            if(!picture.isEmpty())
                pictures.add(picture);
        }

        return ResponseEntity.ok(pictures);
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
