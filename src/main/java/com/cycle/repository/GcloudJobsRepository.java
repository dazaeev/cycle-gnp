package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.EmployeeGral;
import com.cycle.model.GcloudJobs;

/**
 * @author ngonzalez
 *
 */
@Repository("gcloudJobsRepository")
public interface GcloudJobsRepository extends JpaRepository<GcloudJobs, Integer> {
	
	public GcloudJobs findById(int id);
	public GcloudJobs findByNameJob(String nameJob);
	public List<GcloudJobs> findByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
}