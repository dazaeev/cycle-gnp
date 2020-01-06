package com.cycle.utils;

import java.io.File;
import java.io.Serializable;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cycle.model.Bridge;
import com.cycle.model.Command;
import com.cycle.model.GcloudJobs;
import com.cycle.model.Gstorage;
import com.cycle.model.Manuals;
import com.cycle.model.Send;
import com.cycle.model.User;
import com.cycle.service.GcloudService;
import com.cycle.service.UserService;

public class CycleMultiThreading implements Runnable, Serializable {

	private static final long serialVersionUID = -1843658510244227693L;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CycleMultiThreading.class);

	public void runBridge() throws Exception {
		// Table bridge
		Command command = userService.findCommandByNameAndEmployeeGral("bridge", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			
			List<Bridge> listBridge = userService.findBridgeByEmployeeGral(user.getEmployee());
			userService.deleteBridgeInBatch(listBridge);
			
			Map<String, String> data = new TreeMap<>();
			data.put("name", "bridge");
			data.put("command", command.getCommand());
			
			List<Map<String, Object>> resp = Utils.callSftp(user.getSend(), data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					for (int i = 0; i < outputSplit.length; i++) {
						String[] valueSplit = outputSplit[i].split("\\|");
						if (valueSplit.length == 5) {
							String jobId = Utils.getJobId(valueSplit[4].trim(), ".");
							if (!jobId.equals("")) {
								Bridge bridge = new Bridge();
								bridge.setJobId(jobId);
								bridge.setActive(1);
								String[] datePlus = valueSplit[0].split("\\+");
								bridge.setDateTime(Utils.formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
								bridge.setNameFile(valueSplit[1]);
								bridge.setSize(valueSplit[2].trim());
								bridge.setFolder(valueSplit[3].trim());
								bridge.setFile(valueSplit[4].trim());
								bridge.setEmployeeGral(user.getEmployee());
								userService.saveBridge(bridge);
							}
						}
					}
				}
			}
		}
	}

	public void runManuals() throws Exception {
		// Table manuals
		Command command = userService.findCommandByNameAndEmployeeGral("bridge-tam", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			
			List<Manuals> listManuals = userService.findManualsByEmployeeGral(user.getEmployee());
			userService.deleteManualsInBatch(listManuals);
			
			Map<String, String> data = new TreeMap<>();
			data.put("name", "bridge-tam");
			data.put("command", command.getCommand());
			
			List<Map<String, Object>> resp = Utils.callSftp(Utils.getSend("SFTP-NECAXA", userService), data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					for (int i = 0; i < outputSplit.length; i++) {
						String[] valueSplit = outputSplit[i].split("\\|");
						if (valueSplit.length == 5) {
							String jobId = Utils.getJobId(valueSplit[4].trim(), ".");
							if (!jobId.equals("")) {
								Manuals manuals = new Manuals();
								manuals.setJobId(jobId);
								manuals.setActive(1);
								String[] datePlus = valueSplit[0].split("\\+");
								manuals.setDateTime(Utils.formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
								manuals.setNameFile(valueSplit[1]);
								manuals.setSize(valueSplit[2].trim());
								manuals.setFolder(valueSplit[3].trim());
								manuals.setFile(valueSplit[4].trim());
								manuals.setEmployeeGral(user.getEmployee());
								userService.saveManuals(manuals);
							}
						}
					}
				}
			}
		}
	}

	public void runGstorage() throws Exception {
		// Table gstorage
		Command command = userService.findCommandByNameAndEmployeeGral("gstorage", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			
			List<Gstorage> listGstorage = userService.findByGstorageEmployeeGral(user.getEmployee());
			userService.deleteGstorageInBatch(listGstorage);
			
			Map<String, String> data = new TreeMap<>();
			data.put("name", "gstorage");
			data.put("command", command.getCommand());
			
			Send send = Utils.getSend("SFTP_GCLOUD", userService);
			List<Map<String, Object>> resp = Utils.callSftp(send, data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					for (int i = 0; i < outputSplit.length; i++) {

						String[] valueSplit = outputSplit[i].trim().split("  ");
						if (valueSplit.length == 3) {
							String valueString = "";
							Path path = Paths.get(valueSplit[2].trim().replaceAll("gs://", "/"), new String[0]);
							if ((path.getFileName().toString().split("\\.")).length > 1) {

								valueString = path.getFileName().toString();
								String valueFolder = "";
								String valueFolderId = "";
								if (!valueString.equals("")) {
									String[] folderSplit = valueSplit[2].trim().split("\\/");
									if (folderSplit.length > 1) {
										String auxFolder = "";
										for (int j = 0; j < folderSplit.length - 1; j++) {
											auxFolder = auxFolder + folderSplit[j] + "/";
										}
										valueFolder = auxFolder;
										valueFolderId = folderSplit[folderSplit.length - 2];
									}
								} else {
									valueFolder = valueSplit[2].trim();
								}

								String jobId = Utils.getJobId(valueFolderId, ".");
								if (!jobId.equals("")) {

									Gstorage gstorage = new Gstorage();
									gstorage.setJobId(jobId);
									gstorage.setFile(valueString);
									gstorage.setActive(1);
									String[] datePlus = valueSplit[1].trim().split("T");
									gstorage.setDateTime(Utils.formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
									gstorage.setFolder(valueFolder);
									gstorage.setNameFile(valueSplit[2].trim());
									gstorage.setSize(valueSplit[0].trim());
									gstorage.setEmployeeGral(user.getEmployee());
									userService.saveGstorage(gstorage);
								} else {
									jobId = Utils.getJobId(valueString, ".");
									if (!jobId.equals("")) {
										Gstorage gstorage = new Gstorage();
										gstorage.setJobId(jobId);
										gstorage.setFile(valueString);
										gstorage.setActive(1);
										String[] datePlus = valueSplit[1].trim().split("T");
										gstorage.setDateTime(Utils.formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
										gstorage.setFolder(valueFolder);
										gstorage.setNameFile(valueSplit[2].trim());
										gstorage.setSize(valueSplit[0].trim());
										gstorage.setEmployeeGral(user.getEmployee());
										userService.saveGstorage(gstorage);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	public void runGcloudJobs() throws Exception {
		// Table gcloud_jobs
		// Validar hacia donde consultar
		String isValidate = userService.getParameterNameAndDescription("GCLOUD", "SFTP_SQL").getValue();
		if(isValidate.equals("SQL")) {
			List<GcloudJobs> listGcloudJobs = userService.findByGcloudJobsEmployeeGral(user.getEmployee());
			userService.deleteGcloudJobsInBatch(listGcloudJobs);
			//
			List<Map<String, Object>> listGcloud = gcloudService.findJobHistoryAll(
					userService.getParameterNameAndDescription("SQL_GCLOUD", "user").getValue(),
					userService.getParameterNameAndDescription("SQL_GCLOUD", "cve").getValue(),
					userService.getParameterNameAndDescription("SQL_GCLOUD", "url").getValue(),
					userService.getParameterNameAndDescription("SQL_GCLOUD", "driverClassName").getValue());
			Iterator<Map<String, Object>> iterGcloud = listGcloud.iterator();
			while(iterGcloud.hasNext()) {
				Map<String, Object> mapRow = iterGcloud.next();
				// Proceso de gusrdado
				if(null != mapRow.get("INPUT_FILE_NAME")) {
					GcloudJobs gcloudJobs = new GcloudJobs();
					gcloudJobs.setActive(1);
					gcloudJobs.setNameJob("" + mapRow.get("DATA_PROC_JOB_ID"));
					gcloudJobs.setStatusState("" + mapRow.get("JOB_STATUS"));
					gcloudJobs.setStatusStateStartTime("" + mapRow.get("JOB_END_TIME"));
					gcloudJobs.setOutputFilePath("" + mapRow.get("OUTPUT_FILE_PATH"));
					
					gcloudJobs.setInputFile(("" + mapRow.get("INPUT_FILE_NAME")).split("\\/")[1]);
					String []splitId = ("" + mapRow.get("DATA_PROC_CLUSTER_ID")).split("\\-");
					gcloudJobs.setIdJob(splitId[splitId.length - 1]);
					
					String jobId = Utils.getJobId((gcloudJobs.getInputFile() != null
							&& !gcloudJobs.getInputFile().equals(""))
									? gcloudJobs.getInputFile()
									: "",
							".");
					if (!jobId.equals("")) {
						gcloudJobs.setJobId(jobId);
						gcloudJobs.setEmployeeGral(user.getEmployee());
						LOGGER.info(gcloudJobs.toString());
						userService.saveGcloudJobs(gcloudJobs);
					}
				}
			}
		} else if(isValidate.equals("SFTP")) {
			Command command = userService.findCommandByNameAndEmployeeGral("gcloud-jobs-list", user.getEmployee());
			if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
				Map<String, String> data = new TreeMap<>();
				data.put("name", "gcloud-jobs-list");
				data.put("command", command.getCommand());
				
				Send send = Utils.getSend("SFTP_GCLOUD", userService);
				List<Map<String, Object>> resp = Utils.callSftp(send, data);
				if (!resp.isEmpty()) {
					Map<String, Object> respMap = resp.get(0);
					if (respMap.get("status").equals("Ok")) {
						String output = "" + respMap.get("output");
						String[] outputSplit = output.split("[\\n]+");
						LOGGER.info("--> Numero de JOB's a procesar: " + outputSplit.length);
						for (int i = 0; i < outputSplit.length; i++) {

							String nameJob = "";
							if (!outputSplit[i].contains("JOB_ID")) {
								String[] nameJobSplit = outputSplit[i].split("\\ ");
								if (nameJobSplit.length > 1) {
									nameJob = nameJobSplit[0];
								}
							}
							if (!nameJob.equals("")) {
								LOGGER.info("Procesando JOB: " + nameJob);
								if (userService.findGcloudJobsByNameJob(nameJob.trim()) == null) {

									command = userService.findCommandByNameAndEmployeeGral("gcloud-jobs-describe", user.getEmployee());
									if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
										
										Map<String, String> dataDescribe = new TreeMap<>();
										dataDescribe.put("name", "gcloud-jobs-describe");
										dataDescribe.put("command", command.getCommand().replaceAll("__job-list__", nameJob));
										LOGGER.info(" --> command: " + (String) dataDescribe.get("command"));
										List<Map<String, Object>> respDescribe = Utils.callSftp(send, dataDescribe);
										if (!respDescribe.isEmpty()) {
											Map<String, Object> respDescribeMap = respDescribe.get(0);
											if (respDescribeMap.get("status").equals("Ok")) {
												String outputDescribe = "" + respDescribeMap.get("output");
												try {
													GcloudJobs gcloudJobs = new GcloudJobs();
													gcloudJobs.setActive(1);
													Map<String, String> map = Utils.loadStringYaml(outputDescribe);
													if (!map.isEmpty()) {
														Object objReference = map.get("reference");
														Map<String, String> mapPlacement = (Map<String, String>) objReference;
														if (!mapPlacement.isEmpty()) {
															System.out.println("jobId: " + (String) mapPlacement.get("jobId"));
															gcloudJobs.setNameJob(mapPlacement.get("jobId"));
														}
														Object objStatus = map.get("status");
														Map<String, String> mapStatus = (Map<String, String>) objStatus;
														if (!mapStatus.isEmpty()) {
															System.out.println("state: " + (String) mapStatus.get("state"));
															System.out.println("stateStartTime: " + (String) mapStatus.get("stateStartTime"));
															gcloudJobs.setStatusState(mapStatus.get("state"));
															gcloudJobs.setStatusStateStartTime(mapStatus.get("stateStartTime"));
														}
														Object objSparkJob = map.get("sparkJob");
														Map<String, String> mapSparkJob = (Map<String, String>) objSparkJob;
														if (!mapSparkJob.isEmpty()) {
															Object objArgs = mapSparkJob.get("args");
															ArrayList<String> arrayArgs = (ArrayList<String>) objArgs;
															System.out.println("gnp_input_files: " + ((String) arrayArgs.get(0)).split("\\/")[1]);
															System.out.println("id: " + (String) arrayArgs.get(2));
															gcloudJobs.setInputFile(((String) arrayArgs.get(0)).split("\\/")[1]);
															gcloudJobs.setIdJob(arrayArgs.get(2));
														}
													}
													String jobId = Utils.getJobId((gcloudJobs.getInputFile() != null
															&& !gcloudJobs.getInputFile().equals(""))
																	? gcloudJobs.getInputFile()
																	: "",
															".");
													if (!jobId.equals("")) {
														gcloudJobs.setJobId(jobId);
														gcloudJobs.setEmployeeGral(user.getEmployee());
														userService.saveGcloudJobs(gcloudJobs);
													}
												} catch (Exception e) {
													LOGGER.info("--> ERROR: " + nameJob + ": " + e.getMessage());
												}
											}
										}
									}
								} else {
									LOGGER.info("--> JOB existente en BD: " + nameJob);
								}
							}
						}
					}
				}
			}
		}
	}

	public void runMainframe() throws Exception {
		// Table mainframe
		Map<String, String> data = new TreeMap<String, String>();
		data.put("name", "ftpmf");
		data.put("path-local", userService.getMfFiles() + user.getId() + File.separator);
		if(MFrame.callFtpMF(Utils.getSend("FTP_MF", userService), data)) {
			// Procesar archivo LOG
			MFrame.procesaLog(userService, user.getEmployee(), data.get("path-local") + "CDIRECT-LOG.lau");
		}
	}
	
	
	public Thread cycleThread;
	private String cycleName;
	private User user;
	private UserService userService;
	private GcloudService gcloudService;
	
	public CycleMultiThreading() {}

	public CycleMultiThreading(User user, UserService userService, GcloudService gcloudService, String name) {
		this.cycleName = name;
		this.user = user;
		this.userService = userService;
		this.gcloudService = gcloudService;
	}

	@Override
	public void run() {
		LOGGER.info("Thread running" + cycleName);
		try {
			if(cycleName.equals("bridge")) {
				runBridge();
			} else if(cycleName.equals("manuals")) {
				runManuals();
			} else if(cycleName.equals("gstorage")) {
				runGstorage();
			} else if(cycleName.equals("gcloud_jobs")) {
				runGcloudJobs();
			} else if(cycleName.equals("mainframe")) {
				runMainframe();
			} else {
				LOGGER.info("Thread NOK");
			}
		} catch (Exception e) {
			LOGGER.info("Thread has been interrupted: " + e.getMessage());
		}
	}

	public void start() {
		LOGGER.info("Thread started");
		if (cycleThread == null) {
			cycleThread = new Thread(this, cycleName);
			cycleThread.start();
		}

	}
	
	public static void runCycle(User user, UserService userService, GcloudService gcloudService) throws Exception {
		CycleMultiThreading threadbridge = new CycleMultiThreading(user, userService, gcloudService, "bridge");
		threadbridge.start();
		CycleMultiThreading threadmanuals = new CycleMultiThreading(user, userService, gcloudService, "manuals");
		threadmanuals.start();
		CycleMultiThreading threadgstorage = new CycleMultiThreading(user, userService, gcloudService, "gstorage");
		threadgstorage.start();
		CycleMultiThreading threadgcloudjobs = new CycleMultiThreading(user, userService, gcloudService, "gcloud_jobs");
		threadgcloudjobs.start();
		CycleMultiThreading threadmainframe = new CycleMultiThreading(user, userService, gcloudService, "mainframe");
		threadmainframe.start();
	}
	
	public static List<Map<String, Object>> startingProcessesGcloud(User user, UserService userService, GcloudService gcloudService)
			throws Exception {
		LOGGER.info("--> # Iniciando Ciclo [" + user.getEmail() + "] #");
		List<Map<String, Object>> responseData = new LinkedList<>();
		//
		runCycle(user, userService, gcloudService);
		//
		Map<String, Object> row = new TreeMap<>();
		row.put("status", "Ok");
		responseData.add(row);
		LOGGER.info("<-- # Terminando Ciclo [" + user.getEmail() + "] #");
		return responseData;
	}
}