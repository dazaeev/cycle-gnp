package com.cycle.gcloud.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Nazario Dazaeev Gonzalez Herrera 
 * Tabla de GCLOUD
 * Acceso unicamente administrador
 */
@Entity
@Table(name = "JOB_HISTORY")
public class JobHistory {

	@Id
	@Column(name = "JOB_ID")
	private int jobId;
	
	@Column(name = "INPUT_FILE_NAME")
	private String inputFileName;
	
	@Column(name = "CHECKSUM_FILE_NAME")
	private String checksumFileName;
	
	@Column(name = "JOB_START_TIME")
	private Date jobStartTime;
	
	@Column(name = "JOB_END_TIME")
	private Date jobEndTime;
	
	@Column(name = "JOB_STATUS")
	private String jobStatus;
	
	@Column(name = "JOB_TYPE")
	private String jobType;
	
	@Column(name = "INPUT_FILE_PATH")
	private String inputFilePath;
	
	@Column(name = "OUTPUT_FILE_PATH")
	private String outputFilePath;
	
	@Column(name = "DATA_PROC_CLUSTER_ID")
	private String dataProcClusterId;
	
	@Column(name = "DATA_PROC_JOB_ID")
	private String dataProcJobId;
	
	@Column(name = "GCS_MESSAGE_ID")
	private String gcsMessageId;
	
	@Column(name = "CREATED_TIME")
	private Date createdTime;
	
	@Column(name = "UPDATED_TIME")
	private Date updatedTime;

	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}

	public String getInputFileName() {
		return inputFileName;
	}

	public void setInputFileName(String inputFileName) {
		this.inputFileName = inputFileName;
	}

	public String getChecksumFileName() {
		return checksumFileName;
	}

	public void setChecksumFileName(String checksumFileName) {
		this.checksumFileName = checksumFileName;
	}

	public Date getJobStartTime() {
		return jobStartTime;
	}

	public void setJobStartTime(Date jobStartTime) {
		this.jobStartTime = jobStartTime;
	}

	public Date getJobEndTime() {
		return jobEndTime;
	}

	public void setJobEndTime(Date jobEndTime) {
		this.jobEndTime = jobEndTime;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getInputFilePath() {
		return inputFilePath;
	}

	public void setInputFilePath(String inputFilePath) {
		this.inputFilePath = inputFilePath;
	}

	public String getOutputFilePath() {
		return outputFilePath;
	}

	public void setOutputFilePath(String outputFilePath) {
		this.outputFilePath = outputFilePath;
	}

	public String getDataProcClusterId() {
		return dataProcClusterId;
	}

	public void setDataProcClusterId(String dataProcClusterId) {
		this.dataProcClusterId = dataProcClusterId;
	}

	public String getDataProcJobId() {
		return dataProcJobId;
	}

	public void setDataProcJobId(String dataProcJobId) {
		this.dataProcJobId = dataProcJobId;
	}

	public String getGcsMessageId() {
		return gcsMessageId;
	}

	public void setGcsMessageId(String gcsMessageId) {
		this.gcsMessageId = gcsMessageId;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
}