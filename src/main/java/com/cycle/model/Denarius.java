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
@Table(name = "denarius")
public class Denarius {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Basic
	@Column(name = "job_id")
	private String jobId;
	
	@Basic
	@Column(name = "file")
	private String file;
	
	@Basic
	@Column(name = "folder")
	private String folder;
	
	@Basic
	@Column(name = "name_file")
	private String nameFile;
	
	@Basic
	@Column(name = "size")
	private String size;
	
	@Basic
	@Column(name = "date_time")
	private Date dateTime;
	
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

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getFolder() {
		return folder;
	}

	public void setFolder(String folder) {
		this.folder = folder;
	}

	public String getNameFile() {
		return nameFile;
	}

	public void setNameFile(String nameFile) {
		this.nameFile = nameFile;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
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