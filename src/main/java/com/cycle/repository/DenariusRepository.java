package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Denarius;
import com.cycle.model.EmployeeGral;

/**
 * @author ngonzalez
 *
 */
@Repository("denariusRepository")
public interface DenariusRepository extends JpaRepository<Denarius, Integer> {
	
	public Denarius findById(int id);
	public List<Denarius> findByEmployeeGral(EmployeeGral employeeGral);
	public List<Denarius> findByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
}