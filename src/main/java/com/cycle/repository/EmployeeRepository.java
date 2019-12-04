package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.EmployeeGral;

@Repository("employeeRepository")
public interface EmployeeRepository extends JpaRepository<EmployeeGral, Integer> {
}