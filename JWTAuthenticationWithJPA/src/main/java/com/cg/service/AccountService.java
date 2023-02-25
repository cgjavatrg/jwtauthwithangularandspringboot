package com.cg.service;

import java.util.List;

import com.cg.model.Account;
import com.cg.exception.AccountNotFoundException;

public interface AccountService {
	public  Account saveAccount(Account ac);
	public Account updateAccount(Account newAccount,int id);
	public void deleteAccount(int aid);
	
	public Account getAccountById(int aid);
	
	public List<Account> getAllAccounts();
	
	public List<Account> getAccountsByCustomer(String cust) ;
	
	public List<Account> getAccountsByBalanceRange(double minbal,double maxbal) ;
	
}
