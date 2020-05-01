package com.comet.survey.controller;

import com.comet.survey.exception.AppException;
import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.*;
import com.comet.survey.payload.*;
import com.comet.survey.repository.PushTokenRepository;
import com.comet.survey.repository.SurveyRepository;
import com.comet.survey.repository.SurveyStatusRepository;
import com.comet.survey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    SurveyStatusRepository surveyStatusRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PushTokenRepository pushTokenRepository;

    @GetMapping("/index")
    public List<Survey> allSurveys() {
        return surveyRepository.findAll();
    }

   @GetMapping("/assignedSurveys")
    public ResponseEntity<?> assignedSurvey(@RequestParam long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

//        if(status == null || status.length() == 0)
//            return new ResponseEntity(new ApiResponse(false, "Status is empty"),
//                    HttpStatus.BAD_REQUEST);

        List<Survey> survey = surveyRepository.findBySurveyor(user);

//        List<Survey> specificSurveys = survey.stream()
//               .filter(s -> s.getSurveyStatus().getName() == SurveyStatusName.valueOf(status))
//               .collect(Collectors.toList());

        return ResponseEntity.ok(survey);
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> updateStatus(@Valid @RequestBody SurveyStatusRequest surveyStatusRequest) {
        SurveyStatus surveyStatus = surveyStatusRepository.findByName(surveyStatusRequest.getStatus())
                .orElseThrow(() -> new AppException("Survey status not found."));
        Survey survey = surveyRepository.findById(surveyStatusRequest.getSurveyId())
                .orElseThrow(() -> new AppException("Survey not found."));
        survey.setSurveyStatus(surveyStatus);
        surveyRepository.save(survey);
        return ResponseEntity.ok(survey);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createSurvey(@Valid @RequestBody SurveyRequest surveyRequest) {
        Survey survey = new Survey(surveyRequest.getCustomerName(), surveyRequest.getSiteAddress(), surveyRequest.getDueDate());
        Optional<User> getSurveyor = userRepository.findById(surveyRequest.getSurveyor());
        User surveyor = new User();
        if(getSurveyor.isPresent()){
            surveyor = getSurveyor.get();
        }
        survey.setSurveyor(surveyor);

        SurveyStatus surveyStatus = surveyStatusRepository.findByName(SurveyStatusName.valueOf("Pending"))
                .orElseThrow(() -> new AppException("Survey status not set."));

        survey.setSurveyStatus(surveyStatus);

        List<PushToken> pushTokens = pushTokenRepository.findByUserId(surveyor);

        PushToken token = new PushToken();
        token.sendNotifications(pushTokens, surveyRequest.getCustomerName());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        Optional<User> currentUser = userRepository.findByUsername(userDetails.getUsername());

        survey.setRequester(currentUser.get());

        Survey result = surveyRepository.save(survey);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteSurvey(@RequestParam Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId)
        .orElseThrow(() -> new AppException("Survey not found."));

        surveyRepository.delete(survey);

        return ResponseEntity.ok(new ApiResponse(true, "Survey deleted"));
    } 
}
