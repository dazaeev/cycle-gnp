package com.cycle.service;

import java.util.List;

import com.cycle.model.Bridge;
import com.cycle.model.Command;
import com.cycle.model.EmployeeGral;
import com.cycle.model.GcloudJobs;
import com.cycle.model.Gstorage;
import com.cycle.model.MainFrame;
import com.cycle.model.Manuals;
import com.cycle.model.Parameter;
import com.cycle.model.Send;
import com.cycle.model.User;

public interface UserService {
	/**
	 * @param id
	 * @return
	 */
	Parameter getParameterForId(int id);
	/**
	 * @param name
	 * @return
	 */
	Parameter getParameterForName(String name);
	/**
	 * @param name
	 * @param description
	 * @return
	 */
	Parameter getParameterNameAndDescription(String name, String description);
	//
	/**
	 * @return
	 */
	public String getRootFileSystem();
	//
	/**
	 * @return
	 */
	public boolean getRootFileSystemRemove();
	//
	/**
	 * @return
	 */
	public String getAlgorithm();
	//
	/**
	 * @return
	 */
	public String getTransformation();
	/**
	 * @return
	 */
	public String getMfFiles();
	//
	/**
	 * @param id
	 * @return
	 */
	public User findById(int id);
	//
	/**
	 * @param user
	 */
	public void saveUser(User user);
	/**
	 * @return
	 */
	public List<EmployeeGral> findEmployeeAll();
	/**
	 * @param id
	 * @param active
	 * @return
	 * @throws Exception
	 */
	public boolean activeUser(int id, int active) throws Exception;
	//
	/**
	 * @return
	 */
	public List<User> findUserAll();
	/**
	 * @param email
	 * @return
	 */
	public User findUserByEmail(String email);
	
	/**
	 * @param id
	 * @return
	 */
	public User findUserById(int id);
	
	// Employee Gral
	/**
	 * Guardar Empleado General
	 * @param user
	 * @param employeeGral
	 * @throws Exception
	 */
	public void saveUserEmployeeGral(User user, EmployeeGral employeeGral) throws Exception;
	/**
	 * Eliminado logico en Empleado General
	 * @param id
	 * @param active
	 * @return
	 * @throws Exception
	 */
	public boolean activeEmployeeGral(int id, int active) throws Exception;
	
	/**
	 * @param user
	 * @param action
	 * @throws Exception
	 */
	public void saveUserCompany(User user, String action) throws Exception;
	/**
	 * @param id
	 * @param active
	 * @return
	 * @throws Exception
	 */
	public boolean activeUserCompany(int id, int active) throws Exception;
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Send findSendById(int id) throws Exception;
	/**
	 * @param userExists
	 * @param user
	 * @throws Exception
	 */
	public void saveUserSend(User userExists, User user) throws Exception;
	/**
	 * @param id
	 * @param active
	 * @return
	 * @throws Exception
	 */
	public boolean activeUserSend(int id, int active) throws Exception;
	
	/**
	 * @param name
	 * @param employeeGral
	 * @return
	 */
	public Command findCommandByNameAndEmployeeGral(String name, EmployeeGral employeeGral);
	
	/**
	 * @param employeeGral
	 * @return
	 */
	public List<Bridge> findBridgeByEmployeeGral(EmployeeGral employeeGral);
	
	/**
	 * @param bridge
	 */
	public void saveBridge(Bridge bridge);
	
	/**
	 * @param bridges
	 */
	public void deleteBridgeInBatch(List<Bridge> bridges);
	
	/**
	 * @param employeeGral
	 * @return
	 */
	public List<Manuals> findManualsByEmployeeGral(EmployeeGral employeeGral);
	
	/**
	 * @param bridge
	 */
	public void saveManuals(Manuals bridge);
	
	/**
	 * @param manuals
	 */
	public void deleteManualsInBatch(List<Manuals> manuals);
	
	/**
	 * @param employeeGral
	 * @return
	 */
	public List<Gstorage> findByGstorageEmployeeGral(EmployeeGral employeeGral);
	
	/**
	 * @param gstorage
	 */
	public void saveGstorage(Gstorage gstorage);
	
	/**
	 * @param gstorages
	 */
	public void deleteGstorageInBatch(List<Gstorage> gstorages);
	
	/**
	 * @param nameJob
	 * @return
	 */
	public GcloudJobs findGcloudJobsByNameJob(String nameJob);
	
	/**
	 * @param employeeGral
	 * @return
	 */
	public List<GcloudJobs> findByGcloudJobsEmployeeGral(EmployeeGral employeeGral);
	
	/**
	 * @param gcloudJobs
	 */
	public void saveGcloudJobs(GcloudJobs gcloudJobs);
	
	/**
	 * @param gcloudJobs
	 */
	public void deleteGcloudJobsInBatch(List<GcloudJobs> gcloudJobs);
	
	/**
	 * @param glId
	 * @return
	 */
	public MainFrame findMainFrameByFileId(String fileId);
	
	/**
	 * @param glId
	 * @param action
	 * @return
	 */
	public MainFrame findMainFrameByFileIdAndAction(String fileId, String action);
	
	/**
	 * @param mainFrame
	 */
	public void saveMainFrame(MainFrame mainFrame);
}