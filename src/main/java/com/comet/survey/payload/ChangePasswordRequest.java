package com.comet.survey.payload;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class ChangePasswordRequest {

    @NotNull
    String token;

    @NotNull
    String password;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
