package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.EmployeeGral;
import com.cycle.model.Manuals;

/**
 * @author ngonzalez
 *
 */
@Repository("manualsRepository")
public interface ManualsRepository extends JpaRepository<Manuals, Integer> {
	
	public Manuals findById(int id);
	public List<Manuals> findByEmployeeGral(EmployeeGral employeeGral);
	public List<Manuals> findByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
}