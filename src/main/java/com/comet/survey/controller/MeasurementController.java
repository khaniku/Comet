package com.comet.survey.controller;

import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.Measurement;
import com.comet.survey.model.SiteAsset;
import com.comet.survey.model.User;
import com.comet.survey.payload.*;
import com.comet.survey.repository.MeasurementRepository;
import com.comet.survey.repository.SiteAssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/measurement")
public class MeasurementController {

    @Autowired
    SiteAssetRepository siteAssetRepository;

    @Autowired
    MeasurementRepository measurementRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createAsset(@Valid @RequestBody MeasurementRequest measurementRequest) {
        Measurement measurement = new Measurement(measurementRequest.getDescription());
        Optional<SiteAsset> siteAsset = siteAssetRepository.findById(measurementRequest.getAssetId());

        if (siteAsset.isPresent()) {
            measurement.setAsset(siteAsset.get());
        }else{
            return new ResponseEntity(new ApiResponse(false, "Asset not found"),
                    HttpStatus.BAD_REQUEST);
        }

        Measurement result = measurementRepository.save(measurement);
        return ResponseEntity.ok(result);
    }

//    @GetMapping("/measurements")
//    public ResponseEntity<?> getMeasurements(@RequestParam long assetId) {
//        Optional<SiteAsset> fetchAsset = siteAssetRepository.findById(assetId);
//        SiteAsset siteAsset = new SiteAsset();
//        if (fetchAsset.isPresent()) {
//            siteAsset = fetchAsset.get();
//        }
//        List<Measurement> measurements = measurementRepository.findByAsset(siteAsset);
//        return ResponseEntity.ok(measurements);
//    }

    @PostMapping("/measurements")
    public ResponseEntity<?> getMeasurements(@Valid @RequestBody GetMeasurementRequest getMeasurementRequest) {
        List<List> measurements = new ArrayList<>();
        for(Long assetId: getMeasurementRequest.getAssetIds()){
            Optional<SiteAsset> fetchAsset = siteAssetRepository.findById(assetId);
            SiteAsset siteAsset = new SiteAsset();
            if (fetchAsset.isPresent()) {
                siteAsset = fetchAsset.get();
            }else{
                return new ResponseEntity(new ApiResponse(false, "Asset not found"),
                        HttpStatus.BAD_REQUEST);
            }
            List<Measurement> measurement = measurementRepository.findByAsset(siteAsset);
            if(!measurement.isEmpty())
                measurements.add(measurement);
        }

        return ResponseEntity.ok(measurements);
    }

    @PutMapping("value")
    public ResponseEntity<?> updateMeasurement(@Valid @RequestBody MeasurementValueRequest measurementValueRequest) {
        Optional<SiteAsset> fetchAsset = siteAssetRepository.findById(measurementValueRequest.getAssetId());
        SiteAsset siteAsset = new SiteAsset();
        if (fetchAsset.isPresent()) {
            siteAsset = fetchAsset.get();
        }
        List<Measurement> allMeasurements = measurementRepository.findByAsset(siteAsset);

        int index = 0;
        for(Measurement measurements: measurementValueRequest.getMeasurements()){
            if(allMeasurements.get(index).getId() == measurements.getId()){
                allMeasurements.get(index).setValue(measurements.getValue());
            }
            measurementRepository.save(allMeasurements.get(index));
            index++;
        }

        return ResponseEntity.ok(new ApiResponse(true, "Value updated"));
    }
}
