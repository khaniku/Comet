package com.comet.survey.payload;

import com.comet.survey.model.RoleName;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private long userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Collection<? extends GrantedAuthority> role;

    public JwtAuthenticationResponse(String accessToken, long userId, String username,
                                     String email,String firstName, String lastName, Collection<? extends GrantedAuthority> role) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }


    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

}
