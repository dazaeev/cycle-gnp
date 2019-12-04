package com.cycle.rest.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cycle.model.Company;
import com.cycle.model.User;
import com.cycle.service.UserService;
import com.cycle.utils.Utils;

/**
 * @author ngonzalez
 */
@RestController
@RequestMapping("adm/company/")
public class CompanyController {
	
	@Autowired
	private UserService userService;
	
	/*
	 *******************************************************************************************************
	 *******************************************************************************************************
	 ********************************** Controllers de Company *********************************************
	 *******************************************************************************************************
	 *******************************************************************************************************
	 */
	
	@RequestMapping(value = "findCompany", method = RequestMethod.POST)
    public List<Map<String, Object>> findCompany() throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			List<User> listUser = userService.findUserAll();
			Iterator<User> iterUser = listUser.iterator();
			while(iterUser.hasNext()) {
				Map<String, Object> row = new HashMap<>();
				User user = iterUser.next();
				if(user.getActive() > 0) {
					row.put("id", user.getId());
					row.put("email", user.getEmail());
					row.put("name", user.getName());
					row.put("lastName", user.getLastName());
					row.put("rol", user.getRoles().iterator().next().getRole());
					if(null != user.getCompany() && user.getCompany().getActive() > 0) {
						Company company = user.getCompany();
						row.put("name_company", 	"" + company.getName());
						row.put("address_company",	"" + company.getAddress());
						row.put("keyBase_company",	"" + company.getKeyBase());
					} else {
						// Para validar botones
						row.put("enabled"						, "true");
						row.put("name_company"					, "");
						row.put("address_company"				, "");
						row.put("keyBase_company"				, "");
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
	 * Guardar company
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "saveUserCompany/{action}", method = RequestMethod.POST)
	public Map<Long, String> saveUserCompany(@RequestBody User user, @PathVariable String action) {
		Map<Long, String> map = new HashMap<>();
		User userExists = userService.findUserByEmail(user.getEmail());
		if (userExists != null) {
			map.put(1L, "Nok");
			map.put(2L, "Error: ¡Usuario existente!");
		}
		try {
			userService.saveUserCompany(user, action);
			map.put(1L, "Ok");
			map.put(2L, "¡Usuario creado con exito!");
		} catch (Exception e) {
			map.put(1L, "Nok");
			map.put(2L, "Error al guardar Empleado: " + e.getMessage());
		}
		return map;
	}
	
	@RequestMapping(value = "enabledUserCompany/{id}/{active}", method = RequestMethod.POST)
	public Map<Long, String> enabledUserCompany(@PathVariable int id, @PathVariable int active) {
		Map<Long, String> map = new HashMap<>();
		try {
			if(!userService.activeUserCompany(id, active)) {
				throw new Exception("Compañia no modificada");
			}
			map.put(1L, "Ok");
			map.put(2L, "Compañia " + (active > 0 ? "alterada" : "eliminada") + " con exíto");
			map.put(3L, "" + id);
		} catch (Exception e) {
			map.put(1L, "Nok");
			map.put(2L, "Error: " + e.getMessage());
		}
		return map;
	}
	
	@RequestMapping(value = "fileInsFile/{secretKeyBase64}/{action}/{type}", method = RequestMethod.POST)
    public Map<String, String> fileInsFile(
    		@PathVariable String secretKeyBase64, 
    		@PathVariable String action, 
    		@PathVariable String type, 
    		HttpServletRequest request
    ) throws ServletException {
        try {
        	String email = secretKeyBase64.replaceAll("____", "@").replaceAll("-point-", ".");
        	User user = userService.findUserByEmail(email);
        	if(null == user || null == user.getCompany()) {
        		throw new Exception("Usuario inexistente " + email);
        	}
        	MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
        	MultiValueMap<String, MultipartFile> multiValueMap = multi.getMultiFileMap();
        	Map<String, String> resp = Utils.encriptFilesDownloadSendChanel(multiValueMap, 
        								user.getCompany().getKeyBase(), 
        								userService.getRootFileSystem() + secretKeyBase64.replaceAll("-point-", "____") + "/", 
        								action, 
        								type,
        								type.equals("0") ? null : user.getSend(),
        								userService.getRootFileSystemRemove(),
        								userService.getAlgorithm(),
        								userService.getTransformation());
        	if(resp != null && resp.get("status").equals("Ok")) {
        		System.out.println("Envio correcto..");
        		resp.put("company", user.getCompany().getName());
        	}
        	return resp;
        }catch (Exception e){
        	System.out.println(e);
            throw new ServletException(e.getMessage());
        }
    }
}