package com.cycle.rest.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cycle.model.EmployeeGral;
import com.cycle.model.User;
import com.cycle.service.UserService;

/**
 * @author ngonzalez
 */
@RestController
@RequestMapping("adm/employee-gral/")
public class EmployeeGralController {
	
	@Autowired
	private UserService userService;
	
	/*
	 *******************************************************************************************************
	 *******************************************************************************************************
	 ********************************** Controllers de Employee Gral ***************************************
	 *******************************************************************************************************
	 *******************************************************************************************************
	 */
	
	/**
	 * Deberan ser llenados por el usuario y despues solo modificable por administrador 
	 * (LLENADO ÚNICA OCASIÓN AL INGRESO A LA EMPRESA) 
	 * Estos datos podran ser visibles para el empleado, pero solo modificables por el administrador"
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping(value = "findEmployeeGral", method = RequestMethod.POST)
    public List<Map<String, Object>> findEmployeeGral() throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			List<User> listUser = userService.findUserAll();
			Iterator<User> iterUser = listUser.iterator();
			while(iterUser.hasNext()) {
				Map<String, Object> row = new HashMap<>();
				User user = iterUser.next();
				if(user.getActive() > 0) {
					row.put("id", user.getId());
					row.put("name", user.getName());
					row.put("lastName", user.getLastName());
					if(null != user.getEmployee() && user.getEmployee().getActive() > 0) {
						EmployeeGral employeeGral = user.getEmployee();
						row.put("birthdate", "" + employeeGral.getBirthdate());
						row.put("sex", "" + employeeGral.getSex());
						row.put("civilStatus", "" + employeeGral.getCivilStatus());
						row.put("nationality", "" + employeeGral.getNationality());
						row.put("imss", "" + employeeGral.getImss());
						row.put("militaryPrimer", "" + employeeGral.getMilitaryPrimer());
						row.put("phone", "" + employeeGral.getPhone());
						row.put("cellPhone", "" + employeeGral.getCellPhone());
						row.put("emergencyPhone", "" + employeeGral.getEmergencyPhone());
						row.put("rfc", "" + employeeGral.getRfc());
						row.put("curp", "" + employeeGral.getCurp());
					} else {
						// Para validar botones
						row.put("enabled"				 , "true");
						row.put("birthdate"				 , "");
						row.put("sex"                    , "");
						row.put("civilStatus"            , "");
						row.put("nationality"            , "");
						row.put("imss"                   , "");
						row.put("militaryPrimer"         , "");
						row.put("phone"                  , "");
						row.put("cellPhone"              , "");
						row.put("emergencyPhone"         , "");
						row.put("rfc"                    , "");
						row.put("curp"                   , "");
					}
					responseData.add(row);
				}
			}
			return responseData;
		} catch (Exception e){
            throw new ServletException(e.getMessage());
        }
    }
	
	/**
	 * Guardar employee_gral
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "saveUserEmployeeGral", method = RequestMethod.POST)
	public Map<Long, String> saveUserEmployeeGral(@RequestBody User user) {
		Map<Long, String> map = new HashMap<>();
		if (user == null || (null == user.getEmail() || user.getEmail().equals(""))){
            map.put(1L, "Nok");
			map.put(2L, "Usuario Invalido");
			return map;
        }
		User userExists = null;
		// Validar si empleado ya existe
		if(user.getId() > 0) {
			// EDITAR empleado
			User userEmployee = userService.findById(user.getId());
			if(null != userEmployee.getEmployee()) {
				user.getEmployee().setId(userEmployee.getEmployee().getId());
			}
			userExists = userService.findById(user.getId());
		} else {
			userExists = userService.findUserByEmail(user.getEmail());
		}
		if (userExists == null) {
			map.put(1L, "Nok");
			map.put(2L, "Usuario Inexistente " + user.getEmail());
			return map;
		}
		try {
			userService.saveUserEmployeeGral(userExists, user.getEmployee());
			map.put(1L, "Ok");
			map.put(2L, "Empleado guardado con exito");
		} catch (Exception e) {
			map.put(1L, "Nok");
			map.put(2L, "Error al guardar Empleado: " + e.getMessage());
		}
		return map;
	}
	
	/**
	 * Desactivar "employee_gral"
	 * @param id
	 * @param active
	 * @return
	 */
	@RequestMapping(value = "enabledUserEmployeeGral/{id}/{active}", method = RequestMethod.POST)
	public Map<Long, String> enabledUserEmployeeGral(@PathVariable int id, @PathVariable int active) {
		Map<Long, String> map = new HashMap<>();
		try {
			if(!userService.activeEmployeeGral(id, active)) {
				throw new Exception("Empleado no modificado");
			}
			map.put(1L, "Ok");
			map.put(2L, "Empleado " + (active > 0 ? "alterado" : "eliminado") + " con exíto");
			map.put(3L, "" + id);
		} catch (Exception e) {
			map.put(1L, "Nok");
			map.put(2L, "Error: " + e.getMessage());
		}
		return map;
	}
}