package com.project.products.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.Exceptions.CustomException;
import com.project.products.models.AuthenticationRequest;
import com.project.products.models.MyUserDetails;
import com.project.products.services.MyUserDetailsService;
import com.project.products.util.JwtUtil;

@RestController
public class LogController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;




    @CrossOrigin()
    @PostMapping(value="/authenticate",consumes = "application/json",produces = "application/json")
    public MyUserDetails createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws CustomException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new CustomException();
        }
        System.out.println(authenticationRequest.getUsername() + " " + authenticationRequest.getPassword());
        final MyUserDetails theUserDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        System.out.println(theUserDetails.getUsername()+" "+theUserDetails.getPassword()+" "+theUserDetails.getAuthorities()+theUserDetails);
        final String jwt = jwtTokenUtil.generateToken(theUserDetails);
        theUserDetails.setJwt(jwt);
        System.out.println(jwt);
        return theUserDetails;
    }


}
