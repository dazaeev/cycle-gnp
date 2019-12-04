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

import com.cycle.model.Send;
import com.cycle.model.User;
import com.cycle.service.UserService;

/**
 * @author ngonzalez
 */
@RestController
@RequestMapping("adm/send/")
public class SendController {
	
	@Autowired
	private UserService userService;
	
	/*
	 *******************************************************************************************************
	 *******************************************************************************************************
	 ********************************** Controllers de Envio ***********************************************
	 *******************************************************************************************************
	 *******************************************************************************************************
	 */
	
	@RequestMapping(value = "findSend/{email}", method = RequestMethod.POST)
    public List<Map<String, Object>> findSend(@PathVariable String email) throws ServletException {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			email = email.replaceAll("____", "@").replaceAll("-point-", ".");
			User userExist = userService.findUserByEmail(email);
			if(userExist == null) {
				throw new ServletException("Usuario inexistente.");
			}
			String role = userExist.getRoles().iterator().next().getRole();
			if(role.equals("ADMIN")) {
				List<User> listUser = userService.findUserAll();
				Iterator<User> iterUser = listUser.iterator();
				while(iterUser.hasNext()) {
					Map<String, Object> row = new HashMap<>();
					User user = iterUser.next();
					if(user.getActive() > 0) {
						row.put("id", user.getId());
						row.put("name", user.getName());
						row.put("lastName", user.getLastName());
						if(null != user.getSend() && user.getSend().getActive() > 0) {
							Send send = user.getSend();
							row.put("username", 			"" + send.getUsername());
							row.put("password", 			"" + send.getPassword());
							row.put("serverAddress", 		"" + send.getServerAddress());
							row.put("serverPort", 			"" + send.getServerPort());
							row.put("destinationPath", 		"" + send.getDestinationPath());
							row.put("originPath", 			"" + send.getOriginPath());
							row.put("chanel", 				"" + send.getChanel());
						} else {
							// Para validar botones
							row.put("enabled", 				"true");
							row.put("username", 			"");
							row.put("password", 			"");
							row.put("serverAddress", 		"");
							row.put("serverPort", 			"");
							row.put("destinationPath", 		"");
							row.put("originPath", 			"");
							row.put("chanel", 				"");
						}
						responseData.add(row);
					}
				}
			} else {
				//
				Map<String, Object> row = new HashMap<>();
				if(userExist.getActive() > 0) {
					row.put("id", userExist.getId());
					row.put("name", userExist.getName());
					row.put("lastName", userExist.getLastName());
					if(null != userExist.getSend() && userExist.getSend().getActive() > 0) {
						Send send = userExist.getSend();
						row.put("username", 			"" + send.getUsername());
						row.put("password", 			"" + send.getPassword());
						row.put("serverAddress", 		"" + send.getServerAddress());
						row.put("serverPort", 			"" + send.getServerPort());
						row.put("destinationPath", 		"" + send.getDestinationPath());
						row.put("originPath", 			"" + send.getOriginPath());
						row.put("chanel", 				"" + send.getChanel());
					} else {
						// Para validar botones
						row.put("enabled", 				"true");
						row.put("username", 			"");
						row.put("password", 			"");
						row.put("serverAddress", 		"");
						row.put("serverPort", 			"");
						row.put("destinationPath", 		"");
						row.put("originPath", 			"");
						row.put("chanel", 				"");
					}
					responseData.add(row);
				}
			}
			return responseData;
		} catch (Exception e){
            throw new ServletException(e.getMessage());
        }
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