package com.cg.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.cg.advice.ErrorResponse;
import com.cg.repository.AccountDAO;
import com.cg.model.Account;
import com.cg.model.Role;
import com.cg.model.User;
import com.cg.model.UserDTO;
import com.cg.exception.AccountNotFoundException;
import com.cg.service.AccountService;
import com.cg.service.MyUserDetailsService;
import com.cg.service.UserDetailsImpl;
import com.cg.service.UserService;
import com.cg.util.JwtUtil;


@RestController
//@CrossOrigin(origins="http://localhost:4200",methods = {RequestMethod.GET})
@CrossOrigin(origins="http://localhost:4200",allowedHeaders = "*")
//@CrossOrigin(origins="*",allowedHeaders = "*")
public class AccountController {
	@Autowired
	AccountService accountService;

	@Autowired
	UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService;

	@Autowired
	PasswordEncoder encoder;
	
//	@PostMapping("/accounts/login")
//	public UserDTO login(@RequestParam String username,@RequestParam String password) {
//		return userService.validateLogin(username, password);
//	}
	
	@PostMapping("/accounts/login")
	public UserDTO login(@RequestParam String username,@RequestParam String password)  {

		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
		);
		
	
		

		final UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService
				.loadUserByUsername(username);

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		UserDTO udto=new UserDTO();
		udto.setUsername(userDetails.getUsername());
		
		udto.setRole(Role.valueOf(userDetails.getAuthorities().iterator().next().getAuthority()));
		udto.setEmail(userDetails.getEmail());
		udto.setCreatedAt(userDetails.getCreatedAt());
		udto.setToken(jwt);
		return udto;
		
	}
	
	

	@PostMapping("/accounts/createUser")
	public String createUser(@RequestBody User user) {
		String password=user.getPassword();
		user.setPassword(encoder.encode(password));
		return userService.createUser(user);
	}
	
	@GetMapping("/accounts/byUser/{username}")
	public Set<Account> getAccountsByUserName(@PathVariable String username){
		Set<Account> accs=userService.getAccountsByUsername(username).stream().map(ac->{ac.getUser().setPassword(null);return ac;}).collect(Collectors.toSet());
		return accs;
	} 
	
	@GetMapping("/accounts/users")
	public List<User> getAllUsers() {
		List<User> ulist=userService.getAllUsers();
		ulist=ulist.stream().map(user-> {user.setPassword(null); return user;}).collect(Collectors.toList());
		return ulist;
//		return userService.getAllUsers();
	}
	//http://localhost:8082/accounts
	@GetMapping("/accounts")
	public List<Account> showAllAcc()
	{
		
		List<Account> alist=accountService.getAllAccounts().stream().map (ac->{if(ac.getUser()!=null)ac.getUser().setPassword(null);return ac;}).collect(Collectors.toList());
		System.out.println(accountService.getAllAccounts());
		return alist;
	}
	
	 @PostMapping("/accounts")
	  public Account newAccount(@Valid @RequestBody Account newAccount) {
		 Account ac=accountService.saveAccount(newAccount);
		 if(ac.getUser()!=null) {
			 ac.getUser().setPassword(null);
		 }
		 return ac;
	  }
	   
	 @GetMapping("/accounts/{id}")
	  public Account showByAid(@PathVariable Integer id)  {
		 Account ac=accountService.getAccountById(id);
		 if(ac.getUser()!=null) {
			 ac.getUser().setPassword(null);
		 }
		 return ac;
	  }

	 @GetMapping("/accountsByCust/{cust}")
	  public List<Account> showByCustomer(@PathVariable String cust)  {

		 if(cust==null || cust.isEmpty()) {
			 throw new InputMismatchException("Customer can not be Empty");
		 }
		 else {
			 List<Account> accs=accountService.getAccountsByCustomer(cust).stream().map (ac->{if(ac.getUser()!=null)ac.getUser().setPassword(null);return ac;}).collect(Collectors.toList());;
			 System.out.println(accs);
			 return accs;
		 }
	  }

	 @GetMapping("/accountsByBalance/{minbal}/{maxbal}")
	  public List<Account> showByBalanceRange(@PathVariable double minbal,@PathVariable double maxbal) throws AccountNotFoundException {

		 if(minbal<0 || maxbal<0 || minbal>maxbal) {
			 throw new InputMismatchException("Enter proper range of balance");
		 }
		 else {
			 List<Account> accs=accountService.getAccountsByBalanceRange(minbal, maxbal).stream().map (ac->{if(ac.getUser()!=null)ac.getUser().setPassword(null);return ac;}).collect(Collectors.toList());
			  return accs;
		 }
	  }
	    
	 @PutMapping("/accounts/{id}")
	  public Account replaceAccount(@Valid @RequestBody Account newAccount, @PathVariable Integer id) {
		 
		 	Account ac=accountService.updateAccount(newAccount,id);
		 	if(ac.getUser() !=null) {
		 		ac.getUser().setPassword(null);
		 	}
	        return ac;
	  }
	        
	 @DeleteMapping("/accounts/{id}")
	  public void deleteAccount(@PathVariable Integer id) {
		 accountService.deleteAccount(id);
	  }
	 
	 
	 // local to the RestController
	 @ExceptionHandler(InputMismatchException.class)
	    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
	        List<String> details = new ArrayList<>();
	        details.add(ex.getLocalizedMessage());
	        ErrorResponse error = new ErrorResponse("Server Error From controller", details);
	        return new ResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
}
