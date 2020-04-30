package com.comet.survey.controller;

import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.*;
import com.comet.survey.payload.ApiResponse;
import com.comet.survey.payload.ChangePasswordRequest;
import com.comet.survey.payload.PushTokenRequest;
import com.comet.survey.payload.UserRequest;
import com.comet.survey.repository.PasswordResetTokenRepository;
import com.comet.survey.repository.PushTokenRepository;
import com.comet.survey.repository.RoleRepository;
import com.comet.survey.repository.UserRepository;
import com.comet.survey.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PushTokenRepository pushTokenRepository;

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Qualifier("messageSource")
    @Autowired
    private MessageSource messages;

    @Autowired
    private ServletContext servletContext;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PutMapping("/update")
    public ResponseEntity<?> updateUser( @Valid @RequestBody UserRequest userRequest) {
        User user = userRepository.findById(userRequest.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userRequest.getUserId()));

        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse(true, "User updated"));
    }

    @GetMapping("/surveyors")
    public Set<User> getSurveyors() {
        Optional<Role> role = roleRepository.findByName(RoleName.Surveyor);
        return userRepository.findByRoles(role);
    }

    @PostMapping("/pushToken")
    public ResponseEntity<?> pushToken( @Valid @RequestBody PushTokenRequest pushTokenRequest) {
        if(pushTokenRepository.existsByToken(pushTokenRequest.getToken())) {
            return new ResponseEntity(new ApiResponse(false, "Token already exist"),
                    HttpStatus.BAD_REQUEST);
        }
        PushToken pushToken = new PushToken(pushTokenRequest.getToken(), pushTokenRequest.getBrand());

        Optional<User> user = userRepository.findById(pushTokenRequest.getUserId());

        if(user.isPresent()){
            pushToken.setUserId(user.get());
        }

        pushTokenRepository.save(pushToken);

        return ResponseEntity.ok(new ApiResponse(true, "Token store successfully"));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam("email") String userEmail, HttpServletRequest request) {
        Optional<User> findUser = userRepository.findByEmail(userEmail);
        User user = new User();
        if (findUser.isPresent()) {
            user = findUser.get();
        } else {
            return new ResponseEntity(new ApiResponse(false, "Email not found"),
                    HttpStatus.BAD_REQUEST);
        }
        String token = UUID.randomUUID().toString();
        user.setToken(token);
        userRepository.save(user);
        String appUrl = request.getScheme() + "://" + request.getServerName();
        mailSender.send(constructResetTokenEmail(appUrl, request.getLocale(),
                 token, user));
        return ResponseEntity.ok(new ApiResponse(true, token));
    }

    @GetMapping("/validateToken")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        if (!userRepository.existsByToken(token)) {
            return new ResponseEntity(new ApiResponse(false, "Token does not exist"),
                    HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(new ApiResponse(true, "Token found"));
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        if(!userRepository.existsByToken(changePasswordRequest.getToken())) {
            return new ResponseEntity(new ApiResponse(false, "Token does not exist"),
                    HttpStatus.BAD_REQUEST);
        }
        Optional<User> findUser = userRepository.findByToken(changePasswordRequest.getToken());
        User user = new User();
        if(findUser.isPresent()){
            user = findUser.get();
        }
        changeUserPassword(user, changePasswordRequest.getPassword());

        return ResponseEntity.ok(new ApiResponse(true, "Password changed"));
    }

    private SimpleMailMessage constructResetTokenEmail(
            String contextPath, Locale locale, String token, User user) {
        String url = contextPath+"/resetPassword/" + token;
        String message = "Click this link to reset your password";
        return constructEmail("Reset Password", message + " \r\n" + url, user);
    }

    private SimpleMailMessage constructEmail(String subject, String body,
                                             User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom("customizebobby@gmail.com");
        return email;
    }

    public void changeUserPassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        user.setToken(null);
        userRepository.save(user);
    }


}
