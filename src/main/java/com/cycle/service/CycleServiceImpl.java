package com.cycle.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cycle.model.Bridge;
import com.cycle.model.EmployeeGral;
import com.cycle.model.GcloudJobs;
import com.cycle.model.Gstorage;
import com.cycle.model.MainFrame;
import com.cycle.model.Manuals;
import com.cycle.repository.BridgeRepository;
import com.cycle.repository.GcloudJobsRepository;
import com.cycle.repository.GstorageRepository;
import com.cycle.repository.MainFrameRepository;
import com.cycle.repository.ManualsRepository;

@Service("cycleService")
public class CycleServiceImpl implements CycleService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CycleServiceImpl.class);

	@Autowired
	private BridgeRepository bridgeRepository;
	
	@Autowired
	private ManualsRepository manualsRepository;
	
	@Autowired
	private GstorageRepository gstorageRepository;
	
	@Autowired
	private GcloudJobsRepository gcloudJobsRepository;
	
	@Autowired
	private MainFrameRepository mainFrameRepository;
	
	@Override
	public List<Bridge> findBridgeByEmployeeGralAndJobId(EmployeeGral employeeGral, String JobId) {
		return bridgeRepository.findByEmployeeGralAndJobId(employeeGral, JobId);
	}
	
	@Override
	public List<Gstorage> findGstorageByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId) {
		return gstorageRepository.findByEmployeeGralAndJobId(employeeGral, jobId);
	}
	
	@Override
	public List<GcloudJobs> findGcloudJobsByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId) {
		return gcloudJobsRepository.findByEmployeeGralAndJobId(employeeGral, jobId);
	}
	
	@Override
	public List<MainFrame> findMainFrameByEmployeeGralAndFileId(EmployeeGral employeeGral, String fileId) {
		return mainFrameRepository.findByEmployeeGralAndFileId(employeeGral, fileId);
	}
	
	@Override
	public List<Manuals> findManualsByEmployeeGralAndJobId(EmployeeGral employeeGral, String jobId) {
		return manualsRepository.findByEmployeeGralAndJobId(employeeGral, jobId);
	}
}