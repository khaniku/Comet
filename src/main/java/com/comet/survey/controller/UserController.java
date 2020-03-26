package com.comet.survey.controller;

import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.Role;
import com.comet.survey.model.RoleName;
import com.comet.survey.model.User;
import com.comet.survey.payload.ApiResponse;
import com.comet.survey.payload.UserRequest;
import com.comet.survey.repository.RoleRepository;
import com.comet.survey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

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
}
