package com.cycle.gcloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.gcloud.model.JobHistory;

/**
 * @author ngonzalez
 *
 */
@Repository("jobHistoryRepository")
public interface JobHistoryRepository extends JpaRepository<JobHistory, Integer> {
	
	public JobHistory findByJobId(int jobId);
	public JobHistory findByDataProcJobId(String dataProcJobId);
}