package com.cycle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Send;

@Repository("sendRepository")
public interface SendRepository extends JpaRepository<Send, Integer> {
}