package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.EmployeeGral;

/**
 * @author ngonzalez
 *
 */
@Repository("employeeGralRepository")
public interface EmployeeGralRepository extends JpaRepository<EmployeeGral, Integer> {
}