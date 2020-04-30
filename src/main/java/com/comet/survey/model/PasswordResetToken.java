package com.comet.survey.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class PasswordResetToken {

    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;

    public PasswordResetToken(){}

    public PasswordResetToken(String token, User user){
        this.token = token;
        this.user = user;
    }
}
