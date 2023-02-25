package com.cg.service;

import java.util.List;
import java.util.Set;

import com.cg.model.Account;
import com.cg.model.User;
import com.cg.model.UserDTO;

public interface UserService {
	//public UserDTO validateLogin(String username,String password);
	public String createUser(User user);
	public List<User> getAllUsers();
	public User findUserByname(String username);
	public Set<Account> getAccountsByUsername(String username);
}
