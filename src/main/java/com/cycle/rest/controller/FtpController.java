package com.cycle.rest.controller;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cycle.model.Send;
import com.cycle.model.User;
import com.cycle.service.UserService;
import com.cycle.utils.Utils;

/**
 * @author ngonzalez
 */
@RestController
@RequestMapping("adm/ftp/")
public class FtpController {
	
	@Autowired
	private UserService userService;
	
	/*
	 *******************************************************************************************************
	 *******************************************************************************************************
	 ********************************** Controllers de FTP *************************************************
	 *******************************************************************************************************
	 *******************************************************************************************************
	 */
	
	/**
	 * Action: 0=Listar, 1=Descargar
	 * @param email
	 * @param action
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping(value = "findFtp/{email}/{action}", method = RequestMethod.POST)
    public List<Map<String, Object>> findFtp(@RequestBody Map<String, String> data, @PathVariable String email, @PathVariable String action) throws ServletException {
		try {
			User userExist = userService.findUserByEmail(email);
			if(userExist == null) {
				throw new ServletException("Usuario inexistente.");
			}
			return action.equals("0") ? Utils.listFile(userExist.getSend()) : 
				(action.equals("1") ? Utils.getFileSftp(userExist.getSend(), data) : null);
		} catch (Exception e){
            throw new ServletException(e.getMessage());
        }
    }
	
	@RequestMapping(value = "callSftp", method = RequestMethod.POST)
    public List<Map<String, Object>> callSftp(@RequestBody Map<String, String> data) throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			User userExist = userService.findUserByEmail(data.get("email"));
			if(userExist == null) {
				throw new ServletException("Usuario inexistente.");
			}
			Send send = userExist.getSend();
			String command = ("sh " + send.getDestinationPath() + "/" + data.get("name")).replaceAll("//", "/");
			data.put("command", command);
			responseData = Utils.callSftp(userExist.getSend(), data);
		} catch (Exception e){
			Map<String, Object> row = new TreeMap<>();
            row.put("status", "Nok");
			row.put("error", "Error al guardar Envio: " + e.getMessage());
        }
		return responseData;
    }
	
	@RequestMapping(value = "saveUserSend", method = RequestMethod.POST)
	public Map<Long, String> saveUserSend(@RequestBody User user) {
		Map<Long, String> map = new HashMap<>();
		User userExists = userService.findUserByEmail(user.getEmail());
		if (userExists == null) {
			map.put(1L, "Nok");
			map.put(2L, "Error: ¡Usuario inexistente!");
		}
		try {
			String role = userExists.getRoles().iterator().next().getRole();
			if(role.equals("ADMIN")) {
				//
				userExists = userService.findById(user.getId());
				if(null == userExists) {
					map.put(1L, "Nok");
					map.put(2L, "Error: ¡Usuario inexistente por Id!");
				}
			}
			userService.saveUserSend(userExists, user);
			map.put(1L, "Ok");
			map.put(2L, "¡Usuario alterado con exito!");
		} catch (Exception e) {
			map.put(1L, "Nok");
			map.put(2L, "Error al guardar Envio: " + e.getMessage());
		}
		return map;
	}
	
	@RequestMapping(value = "enabledUserSend/{id}/{active}", method = RequestMethod.POST)
	public Map<Long, String> enabledUserSend(@PathVariable int id, @PathVariable int active) {
		Map<Long, String> map = new HashMap<>();
		try {
			if(!userService.activeUserSend(id, active)) {
				throw new Exception("Envio no modificado");
			}
			map.put(1L, "Ok");
			map.put(2L, "Configuración de envio " + (active > 0 ? "alterado" : "eliminado") + " con exíto");
			map.put(3L, "" + id);
		} catch (Exception e) {
			map.put(1L, "Nok");
			map.put(2L, "Error: " + e.getMessage());
		}
		return map;
	}
}