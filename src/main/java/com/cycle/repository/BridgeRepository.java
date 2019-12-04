package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Bridge;
import com.cycle.model.EmployeeGral;

/**
 * @author ngonzalez
 *
 */
@Repository("bridgeRepository")
public interface BridgeRepository extends JpaRepository<Bridge, Integer> {
	
	public Bridge findById(int id);
	public List<Bridge> findByEmployeeGral(EmployeeGral employeeGral);
	public List<Bridge> findByEmployeeGralAndJobId(EmployeeGral employeeGral, String JobId);
}