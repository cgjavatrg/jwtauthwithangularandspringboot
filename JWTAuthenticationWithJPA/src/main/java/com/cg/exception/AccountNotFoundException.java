package com.cg.exception;

public class AccountNotFoundException extends RuntimeException{
	public AccountNotFoundException() {
		// TODO Auto-generated constructor stub
	}
	
	public AccountNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "AccountNotFoundException ["+getMessage()+"]";
	}

}
