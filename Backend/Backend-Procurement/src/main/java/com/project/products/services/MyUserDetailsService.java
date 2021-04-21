package com.project.products.services;




import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.products.models.MyUserDetails;
import com.project.products.models.Users;
import com.project.products.repositories.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not Found" + username));
        return user.map(MyUserDetails::new).get();
    }
}