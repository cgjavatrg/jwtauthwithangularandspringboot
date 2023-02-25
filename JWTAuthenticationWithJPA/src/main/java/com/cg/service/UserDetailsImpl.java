package com.cg.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cg.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private String username;

	@JsonIgnore
	private String password;

	private String email;
	
	private LocalDate createdAt;
	
	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl( String username,  String password,
			Collection<? extends GrantedAuthority> authorities,String email,LocalDate createdAt) {
		this.username = username;
		this.password = password;
		this.authorities = authorities;
		this.email=email;
		this.createdAt=createdAt;
	}

	public static UserDetailsImpl build(User user) {
		 SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().toString());
	        List<GrantedAuthority> gr= Arrays.asList(authority);
		return new UserDetailsImpl(
				user.getUsername(), 
				user.getPassword(), 
				gr,
				user.getEmail(),
				user.getCreatedAt());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}



	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return email;
	}
	
	public LocalDate getCreatedAt() {
		return createdAt;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(username, user.username);
	}
}
