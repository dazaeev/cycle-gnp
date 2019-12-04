package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Job;

/**
 * @author ngonzalez
 *
 */
@Repository("jobRepository")
public interface JobRepository extends JpaRepository<Job, Integer> {
	
	public Job findById(int id);
}