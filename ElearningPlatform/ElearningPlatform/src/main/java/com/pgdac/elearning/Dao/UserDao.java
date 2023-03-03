package com.pgdac.elearning.Dao;

import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pgdac.elearning.Dto.UserDTOS;
import com.pgdac.elearning.Entity.User;

public interface UserDao extends JpaRepository<User, Integer> {
	User findByEmail(String email);
	User findById(int id);
	
	@Query(value = "SELECT * FROM USER WHERE contact = ?1", nativeQuery = true)
	User findByContact(String contact);
	UserDTOS save(@Valid UserDTOS stud);
	}
