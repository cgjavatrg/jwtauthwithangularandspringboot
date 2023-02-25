package com.cg.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.cg.model.User;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserService userService;
	
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user=userService.findUserByname(username);
       if(user==null) {
    	   throw new UsernameNotFoundException("User with this username does not exists");
        }
       
       return UserDetailsImpl.build(user);
    }
}