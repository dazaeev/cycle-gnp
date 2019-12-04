package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Command;
import com.cycle.model.EmployeeGral;

/**
 * @author ngonzalez
 *
 */
@Repository("commandRepository")
public interface CommandRepository extends JpaRepository<Command, Integer> {
	
	public Command findById(int id);
	public Command findByName(String name);
	public Command findByNameAndEmployeeGral(String name, EmployeeGral employeeGral);
}