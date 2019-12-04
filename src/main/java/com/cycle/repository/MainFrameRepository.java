package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.EmployeeGral;
import com.cycle.model.MainFrame;

/**
 * @author ngonzalez
 *
 */
@Repository("mainFrameRepository")
public interface MainFrameRepository extends JpaRepository<MainFrame, Integer> {
	
	public MainFrame findById(int id);
	public List<MainFrame> findByEmployeeGral(EmployeeGral employeeGral);
	public MainFrame findByFileId(String fileId);
	public MainFrame findByFileIdAndAction(String fileId, String action);
	public List<MainFrame> findByEmployeeGralAndFileId(EmployeeGral employeeGral, String fileId);
}