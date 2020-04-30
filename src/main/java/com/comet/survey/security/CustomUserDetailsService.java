package com.comet.survey.security;

import com.comet.survey.exception.ResourceNotFoundException;
import com.comet.survey.model.PasswordResetToken;
import com.comet.survey.model.User;
import com.comet.survey.repository.PasswordResetTokenRepository;
import com.comet.survey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Calendar;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordResetTokenRepository passwordTokenRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrEmail)
            throws UsernameNotFoundException {
        // Let people login with either username or email
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
                );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }

    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordTokenRepository.save(myToken);
    }

//    public String validatePasswordResetToken(long id, String token) {
//        PasswordResetToken passToken =
//                passwordTokenRepository.findByToken(token);
//        if ((passToken == null) || (passToken.getUser()
//                .getId() != id)) {
//            return "invalidToken";
//        }
//
//        Calendar cal = Calendar.getInstance();
//        if ((passToken.getExpiryDate()
//                .getTime() - cal.getTime()
//                .getTime()) <= 0) {
//            return "expired";
//        }
//
//        User user = passToken.getUser();
//        Authentication auth = new UsernamePasswordAuthenticationToken(
//                user, null, Arrays.asList(
//                new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
//        SecurityContextHolder.getContext().setAuthentication(auth);
//        return null;
//    }
}