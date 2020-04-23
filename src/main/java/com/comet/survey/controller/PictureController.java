package com.comet.survey.controller;

import com.comet.survey.model.Picture;
import com.comet.survey.model.SiteAsset;
import com.comet.survey.repository.PictureRepository;
import com.comet.survey.repository.SiteAssetRepository;
import com.comet.survey.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/picture")
public class PictureController {
    @Autowired
    SiteAssetRepository siteAssetRepository;

    @Autowired
    PictureRepository pictureRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, long assetId) {
        String fileName = fileStorageService.storeFile(file);

        Optional<SiteAsset> siteAsset = siteAssetRepository.findById(assetId);
        Picture picture = new Picture();

        if (siteAsset.isPresent()) {
            picture.setPictureAsset(siteAsset.get());
            picture.setFileLocation("uploads/"+fileName);
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

}
