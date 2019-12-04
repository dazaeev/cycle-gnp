package com.cycle.rest.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cycle.model.EmployeeGral;
import com.cycle.model.User;
import com.cycle.service.DashboardService;
import com.cycle.service.UserService;
import com.cycle.utils.Utils;

/**
 * @author ngonzalez
 */
@RestController
@RequestMapping("adm/cicle/")
public class CycleController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private DashboardService dashboardService;
	
	/*
	 *******************************************************************************************************
	 *******************************************************************************************************
	 ******************************** Controllers de GCLOUD ************************************************
	 *******************************************************************************************************
	 *******************************************************************************************************
	 */
	@RequestMapping(value = "findCicle", method = RequestMethod.POST)
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
					} else {
						// Para validar botones
						row.put("enabled"				 , "true");
						row.put("birthdate"				 , "");
						row.put("sex"                    , "");
						row.put("civilStatus"            , "");
						row.put("nationality"            , "");
					}
					responseData.add(row);
				}
			}
			return responseData;
		} catch (Exception e){
            throw new ServletException(e.getMessage());
        }
    }
	
	@RequestMapping(value = "initCicleGral", method = RequestMethod.POST)
    public List<Map<String, Object>> initCicleGral(@RequestBody Map<String, String> data) throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			User user = userService.findUserById(Integer.parseInt(data.get("id")));
			if(user == null) {
				throw new ServletException("Usuario inexistente.");
			}
			responseData = Utils.startingProcessesGcloud(user, userService);
		} catch (Exception e){
			Map<String, Object> row = new TreeMap<>();
            row.put("status", "Nok");
			row.put("error", "Error al guardar Envio: " + e.getMessage());
			responseData.add(row);
        }
		return responseData;
    }
	
	@RequestMapping(value = "viewCicleGral", method = RequestMethod.POST)
	public List<Map<String, Object>> viewCicleGral(@RequestBody Map<String, String> data) throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			User user = userService.findUserById(Integer.parseInt(data.get("id")));
			if(user == null) {
				throw new ServletException("Usuario inexistente.");
			}
			responseData = dashboardService.queryViewCicle(user.getEmail());
		} catch (Exception e){
            throw new ServletException(e.getMessage());
        }
		return responseData;
    }
	
	@RequestMapping(value = "viewCicleDetail", method = RequestMethod.POST)
    public List<Map<String, Object>> viewCicleDetail(@RequestBody Map<String, String> data) throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			User user = userService.findUserById(Integer.parseInt(data.get("user_id")));
			if(user == null) {
				throw new ServletException("Usuario inexistente.");
			}
			responseData = dashboardService.queryViewCicleAll(data.get("table"), user.getEmail(), data.get("file_id"));
		} catch (Exception e){
			Map<String, Object> row = new TreeMap<>();
            row.put("status", "Nok");
			row.put("error", "Error al guardar Envio: " + e.getMessage());
			responseData.add(row);
        }
		return responseData;
    }
}