package com.cycle.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * @author Nazario Dazaeev Gonzalez Herrera
 * Tabla de Empleados
 * Deberan ser llenados por el usuario y despues solo modificable por administrador 
 * (LLENADO ÚNICA OCASIÓN AL INGRESO A LA EMPRESA) 
 */
@Entity
@Table(name = "employee_gral")
public class EmployeeGral {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Basic
	@Column(name = "birthdate")
	private String birthdate;
	
	@Basic
	@Column(name = "sex")
	private String sex;
	
	@Basic
	@Column(name = "civil_status")
	private String civilStatus;
	
	@Basic
	@Column(name = "nationality")
	private String nationality;
	
	@Basic
	@Column(name = "imss")
	private String imss;
	
	@Basic
	@Column(name = "military_primer")
	private String militaryPrimer;
	
	@Basic
	@Column(name = "phone")
	private String phone;
	
	@Basic
	@Column(name = "cell_phone")
	private String cellPhone;
	
	@Basic
	@Column(name = "emergency_phone")
	private String emergencyPhone;
	
	@Basic
	@Column(name = "rfc")
	private String rfc;
	
	@Basic
	@Column(name = "curp")
	private String curp;
	
	@Basic
	@Column(name = "active")
	private int active;
	
	@Column(nullable = false, updatable = false)
	@CreationTimestamp
	private Date date;
	
	@Column
	@UpdateTimestamp
	private Date modified;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<Job> job;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<Command> command;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<Bridge> bridge;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<Gstorage> gstorage;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<GcloudJobs> gcloudJobs;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<MainFrame> mainFrame;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<Manuals> manuals;
	
	@OneToMany(cascade = CascadeType.ALL,
    		fetch = FetchType.LAZY,
    		mappedBy = "employeeGral")
	private Set<Denarius> denarius;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getCivilStatus() {
		return civilStatus;
	}

	public void setCivilStatus(String civilStatus) {
		this.civilStatus = civilStatus;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getImss() {
		return imss;
	}

	public void setImss(String imss) {
		this.imss = imss;
	}

	public String getMilitaryPrimer() {
		return militaryPrimer;
	}

	public void setMilitaryPrimer(String militaryPrimer) {
		this.militaryPrimer = militaryPrimer;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getEmergencyPhone() {
		return emergencyPhone;
	}

	public void setEmergencyPhone(String emergencyPhone) {
		this.emergencyPhone = emergencyPhone;
	}

	public String getRfc() {
		return rfc;
	}

	public void setRfc(String rfc) {
		this.rfc = rfc;
	}

	public String getCurp() {
		return curp;
	}

	public void setCurp(String curp) {
		this.curp = curp;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Job> getJob() {
		return job;
	}

	public void setJob(Set<Job> job) {
		this.job = job;
	}

	public Set<Command> getCommand() {
		return command;
	}

	public void setCommand(Set<Command> command) {
		this.command = command;
	}

	public Set<Bridge> getBridge() {
		return bridge;
	}

	public void setBridge(Set<Bridge> bridge) {
		this.bridge = bridge;
	}

	public Set<Gstorage> getGstorage() {
		return gstorage;
	}

	public void setGstorage(Set<Gstorage> gstorage) {
		this.gstorage = gstorage;
	}

	public Set<GcloudJobs> getGcloudJobs() {
		return gcloudJobs;
	}

	public void setGcloudJobs(Set<GcloudJobs> gcloudJobs) {
		this.gcloudJobs = gcloudJobs;
	}

	public Set<MainFrame> getMainFrame() {
		return mainFrame;
	}

	public void setMainFrame(Set<MainFrame> mainFrame) {
		this.mainFrame = mainFrame;
	}

	public Set<Manuals> getManuals() {
		return manuals;
	}

	public void setManuals(Set<Manuals> manuals) {
		this.manuals = manuals;
	}

	public Set<Denarius> getDenarius() {
		return denarius;
	}

	public void setDenarius(Set<Denarius> denarius) {
		this.denarius = denarius;
	}
}