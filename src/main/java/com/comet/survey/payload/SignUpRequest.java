package com.comet.survey.payload;

<<<<<<< HEAD

=======
import com.comet.survey.model.RoleName;
>>>>>>> 79e0b060b5116028218caa11d6f3a54e8b060477
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SignUpRequest {
    @NotBlank
    @Size(min = 1, max = 40)
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 40)
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