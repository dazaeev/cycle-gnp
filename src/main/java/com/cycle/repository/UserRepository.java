package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);
	public User findById(int id);
}