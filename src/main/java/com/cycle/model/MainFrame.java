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
 * Tabla de MF
 * Acceso unicamente administrador
 */
@Entity
@Table(name = "mainframe")
public class MainFrame {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Basic
	@Column(name = "file_id")
	private String fileId;
	
	@Basic
	@Column(name = "file")
	private String file;
	
	@Basic
	@Column(name = "ts_gl")
	private Date tsGl;
	
	@Basic
	@Column(name = "type")
	private String type;
	
	@Basic
	@Column(name = "status")
	private String status;
	
	@Basic
	@Column(name = "action")
	private String action;
	
	@Basic
	@Column(name = "line")
	private String line;
	
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

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Date getTsGl() {
		return tsGl;
	}

	public void setTsGl(Date tsGl) {
		this.tsGl = tsGl;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getLine() {
		return line;
	}

	public void setLine(String line) {
		this.line = line;
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