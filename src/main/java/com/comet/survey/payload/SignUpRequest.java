package com.comet.survey.payload;

import com.comet.survey.model.RoleName;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 40)
    private String firstName;

    @NotBlank
    @Size(min = 4, max = 40)
    private String lastName;

    @NotBlank
    @Size(min = 3, max = 25)
    private String username;

    @NotBlank
    @Size(max = 60)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    private RoleName role;

}