package com.cg.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


import com.cg.model.User;

public interface UserDAO extends JpaRepository<User, String>{
	@Query("select u from User u where u.username=?1 and u.password=?2")
	public User login(String username,String password);
	
	//public User findByUsername(String username);
}

