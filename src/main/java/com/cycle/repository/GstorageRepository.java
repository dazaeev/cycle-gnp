package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.EmployeeGral;
import com.cycle.model.Gstorage;

/**
 * @author ngonzalez
 *
 */
@Repository("gstorageRepository")
public interface GstorageRepository extends JpaRepository<Gstorage, Integer> {
	
	public Gstorage findById(int id);
	public List<Gstorage> findByEmployeeGral(EmployeeGral employeeGral);
	public List<Gstorage> findByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
}