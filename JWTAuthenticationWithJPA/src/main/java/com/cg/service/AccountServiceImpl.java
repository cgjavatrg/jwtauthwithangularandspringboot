package com.cg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.repository.AccountDAO;
import com.cg.repository.UserDAO;
import com.cg.model.Account;
import com.cg.model.User;
import com.cg.exception.AccountNotFoundException;

@Service("accountService")
public class AccountServiceImpl implements AccountService{

	@Autowired
	AccountDAO accountDAO;
	
	@Autowired
	UserDAO userDAO;
	
	//@Transactional
	@Override
	public Account saveAccount(Account ac) {
			return accountDAO.save(ac);
	}

	//@Transactional
	@Override
	public Account updateAccount(Account newAccount,int id) {
		// TODO Auto-generated method stub
		 Optional<Account> optac=accountDAO.findById(id);
		 Account ac=null;
		 ac=optac.get();
		 if(ac==null) {
				throw new AccountNotFoundException("Could not find Account with id "+id);
			}
		 if(optac.isPresent()) {
			 ac.setBalance(newAccount.getBalance());
			 User u=ac.getUser();
			 if(u!=null) {
				 u.setCreatedAt(newAccount.getUser().getCreatedAt());
				 u.setEmail(newAccount.getUser().getEmail());
				 u.setFullName(newAccount.getUser().getFullName());
				 ac.setUser(u);
			 }
			 else {
				 Optional<User> opu=userDAO.findById(newAccount.getUser().getUsername());
				 if(opu.isPresent()) {
					 u=opu.get();
				 }
				 ac.setUser(u);
			 }
		
		 }
		 
		 return accountDAO.save(ac);
	}

	//@Transactional
	@Override
	public void deleteAccount(int aid) {
		// TODO Auto-generated method stub
		accountDAO.deleteById(aid);
	}

	//@Transactional
	@Override
	public List<Account> getAllAccounts() {
		// TODO Auto-generated method stub
		return accountDAO.findAll();
	}

	//@Transactional
	@Override
	public Account getAccountById(int aid)  {
	
		Optional<Account> ac=accountDAO.findById(aid);
		if(!ac.isPresent()) {
			throw new AccountNotFoundException("Could not find Account with id "+aid);
		}
		else
			return ac.get();
	}

	@Override
	public List<Account> getAccountsByCustomer(String cust)  {
		// TODO Auto-generated method stub
		cust="%"+cust+"%";
		List<Account> alist=accountDAO.findByCustomerContaining(cust);
		if(alist.size()==0) {
			throw new AccountNotFoundException("Could not find any Account with customer "+cust);
		}
		else
			return alist;
		
	}

	@Override
	public List<Account> getAccountsByBalanceRange(double minbal, double maxbal)  {
		List<Account> alist=accountDAO.findByBalanceBetween(minbal, maxbal);
		if(alist.size()==0) {
			throw new AccountNotFoundException("Could not find any Account in balance range of  "+minbal +" and "+maxbal);
		}
		else
			return alist;
	}
}
