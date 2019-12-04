package com.cycle.model;

import com.cycle.model.Parameter;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "parameter")
public class Parameter {
	
	@Id
	@Column(name = "id")
	private int id;
	
	@Basic
	@Column(name = "name")
	private String name;
	
	@Basic
	@Column(name = "description")
	private String description;
	
	@Basic
	@Column(name = "value")
	private String value;
	
	@Basic
	@Column(name = "active")
	private int active;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getActive() {
		return this.active;
	}

	public void setActive(int active) {
		this.active = active;
	}
}