package com.cycle.model;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * @author Nazario Dazaeev Gonzalez Herrera 
 * Tabla de Jobs
 * Acceso unicamente administrador
 */
@Entity
@Table(name = "gcloud_jobs")
public class GcloudJobs {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Basic
	@Column(name = "job_id")
	private String jobId;
	
	@Basic
	@Column(name = "input_file")
	private String inputFile;
	
	@Basic
	@Column(name = "id_job")
	private String idJob;
	
	@Basic
	@Column(name = "name_job")
	private String nameJob;
	
	@Basic
	@Column(name = "status_state")
	private String statusState;
	
	@Basic
	@Column(name = "status_state_start_time")
	private String statusStateStartTime;
	
	@Basic
	@Column(name = "active")
	private int active;
	
	@Column(nullable = false, updatable = false)
	@CreationTimestamp
	private Date date;
	
	@Column
	@UpdateTimestamp
	private Date modified;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_gral_id", nullable = true)
	private EmployeeGral employeeGral;
	
	@Override
	public String toString() {
		return "GcloudJobs [jobId=" + jobId + ", inputFile=" + inputFile + ", idJob=" + idJob + ", nameJob=" + nameJob
				+ ", statusState=" + statusState + ", statusStateStartTime=" + statusStateStartTime + "]";
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getInputFile() {
		return inputFile;
	}

	public void setInputFile(String inputFile) {
		this.inputFile = inputFile;
	}

	public String getIdJob() {
		return idJob;
	}

	public void setIdJob(String idJob) {
		this.idJob = idJob;
	}

	public String getNameJob() {
		return nameJob;
	}

	public void setNameJob(String nameJob) {
		this.nameJob = nameJob;
	}

	public String getStatusState() {
		return statusState;
	}

	public void setStatusState(String statusState) {
		this.statusState = statusState;
	}

	public String getStatusStateStartTime() {
		return statusStateStartTime;
	}

	public void setStatusStateStartTime(String statusStateStartTime) {
		this.statusStateStartTime = statusStateStartTime;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getModified() {
		return modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

	public EmployeeGral getEmployeeGral() {
		return employeeGral;
	}

	public void setEmployeeGral(EmployeeGral employeeGral) {
		this.employeeGral = employeeGral;
	}
}