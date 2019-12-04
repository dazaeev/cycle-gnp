package com.cycle.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Company;

@Repository
public interface CompanySqlRepository extends CrudRepository<Company, Integer> {
	
	@Query(value = "select c.* from user u, \n" + 
			"	company c\n" + 
			" where c.user_id = u.user_id\n" + 
			"	and u.user_id = ?1", nativeQuery = true)
	public Company findById(int user_id);
}
