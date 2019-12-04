package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Parameter;

@Repository("parameterRepository")
public interface ParameterRepository extends JpaRepository<Parameter, Integer> {
	
	Parameter findById(int paramInt);
	Parameter findByName(String paramString);
	Parameter findByNameAndDescription(String paramString1, String paramString2);
	Parameter findByValueAndActive(String paramString, int paramInt);
}
