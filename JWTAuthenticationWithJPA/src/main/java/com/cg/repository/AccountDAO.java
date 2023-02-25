package com.cg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cg.model.Account;

public interface AccountDAO extends JpaRepository<Account, Integer>{
	 @Query("FROM Account ac WHERE ac.user.fullName like ?1")
	    List<Account> findByCustomerContaining(String customer);
	 
	 @Query("SELECT a FROM Account a WHERE balance between   :minbal AND :maxbal")
	   List<Account> findByBalanceBetween(@Param("minbal") double minbal, @Param("maxbal") double maxbal);
}


// /  findBy<<propertyname>>
// find account list by customer in Account class method name is 
//  findByCustomer
/// find by Account by balance property
//  findByBalance