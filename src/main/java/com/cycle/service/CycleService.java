package com.cycle.service;

import java.util.List;

import com.cycle.model.Bridge;
import com.cycle.model.EmployeeGral;
import com.cycle.model.GcloudJobs;
import com.cycle.model.Gstorage;
import com.cycle.model.MainFrame;
import com.cycle.model.Manuals;

public interface CycleService {
	
	/**
	 * @param employeeGral
	 * @param JobId
	 * @return
	 */
	public List<Bridge> findBridgeByEmployeeGralAndJobId(EmployeeGral employeeGral, String JobId);
	
	/**
	 * @param employeeGral
	 * @param jobId
	 * @return
	 */
	public List<Gstorage> findGstorageByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
	
	/**
	 * @param employeeGral
	 * @param jobId
	 * @return
	 */
	public List<GcloudJobs> findGcloudJobsByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
	
	/**
	 * @param employeeGral
	 * @param fileId
	 * @return
	 */
	public List<MainFrame> findMainFrameByEmployeeGralAndFileId(EmployeeGral employeeGral, String fileId);
	
	/**
	 * @param employeeGral
	 * @param jobId
	 * @return
	 */
	public List<Manuals> findManualsByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId);
}