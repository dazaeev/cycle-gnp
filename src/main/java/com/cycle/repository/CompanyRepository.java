package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Company;

@Repository("companyRepository")
public interface CompanyRepository extends JpaRepository<Company, Integer> {
}