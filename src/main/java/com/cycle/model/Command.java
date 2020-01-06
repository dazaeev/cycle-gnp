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
@Table(name = "command")
public class Command {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Basic
	@Column(name = "name")
	private String name;
	
	@Basic
	@Column(name = "command", length = 300)
	private String command;
	
	@Basic
	@Column(name = "active")
	private int active;
	
	@Column(nullable = false, updatable = false)
	@CreationTimestamp
	private Date date;
	
	@Column
	@UpdateTimestamp
	private Date modified;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_gral_id", nullable = true)
	private EmployeeGral employeeGral;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCommand() {
		return command;
	}

	public void setCommand(String command) {
		this.command = command;
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