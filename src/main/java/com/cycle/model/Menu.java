package com.cycle.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * @author Nazario Dazaeev Gonzalez Herrera
 * Tabla Menus
 */
@Entity
@Table(name = "menu")
public class Menu {
	
	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "role_id_menu", nullable = false, precision = 0)
	private int roleId;
	
	@Basic
	@Column(name = "menu", nullable = true, length = 200)
	private String menu;
	
	@Basic
	@Column(name = "sub_menu", nullable = true, length = 200)
	private String subMenu;
	
	@Basic
	@Column(name = "html", nullable = true, length = 500)
	private String html;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "menu_role", joinColumns = @JoinColumn(name = "role_id_menu"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getMenu() {
		return menu;
	}

	public void setMenu(String menu) {
		this.menu = menu;
	}

	public String getSubMenu() {
		return subMenu;
	}

	public void setSubMenu(String subMenu) {
		this.subMenu = subMenu;
	}

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
