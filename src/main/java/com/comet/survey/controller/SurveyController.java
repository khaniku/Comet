package com.comet.survey.controller;

import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.PushToken;
import com.comet.survey.model.Survey;
import com.comet.survey.model.User;
import com.comet.survey.payload.ApiResponse;
import com.comet.survey.payload.AssignedSurveys;
import com.comet.survey.payload.SurveyRequest;
import com.comet.survey.payload.UserRequest;
import com.comet.survey.repository.PushTokenRepository;
import com.comet.survey.repository.SurveyRepository;
import com.comet.survey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PushTokenRepository pushTokenRepository;

    @GetMapping("/index")
    public List<Survey> allSurveys() {
        return surveyRepository.findAll();
    }

   @GetMapping("/assignedSurveys")
    public ResponseEntity<?> assignedSurvey(@Valid @RequestBody AssignedSurveys assignedSurvey) {
        User user = userRepository.findById(assignedSurvey.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", assignedSurvey.getUserId()));

       List<Survey> survey = surveyRepository.findBySurveyor(user);
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

        List<PushToken> pushTokens =  pushTokenRepository.findByUserIdId(surveyor.getId());

        PushToken token = new PushToken();
        token.sendNotifications(pushTokens, surveyRequest.getCustomerName());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        Optional<User> currentUser = userRepository.findByUsername(userDetails.getUsername());

        survey.setRequester(currentUser.get());

        Survey result = surveyRepository.save(survey);
        return ResponseEntity.ok(result);
    }

}
