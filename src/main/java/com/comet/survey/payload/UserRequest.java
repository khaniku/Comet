package com.comet.survey.payload;

import com.comet.survey.model.RoleName;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserRequest {

    private long userId;

    @Size(min = 1, max = 40)
    private String firstName;

    @Size(min = 1, max = 40)
    private String lastName;

    @Size(min = 3, max = 25)
    private String username;

    @Size(max = 60)
    @Email
    private String email;

}
