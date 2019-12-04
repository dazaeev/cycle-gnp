package com.cycle.rest.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cycle.model.User;
import com.cycle.repository.MenuRepository;
import com.cycle.utils.Utils;

@RestController
@RequestMapping("home/menu/")
public class MenuController {
	
	@Autowired
	private MenuRepository menuRepository;

	/**
	 * Creacion de Menu
	 * @param user
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping(value = "createMenu/{index}", method = RequestMethod.POST)
	public Map<Long, String> createMenu(@RequestBody User user, @PathVariable String index) {
		Map<Long, String> map = new HashMap<>();
		if (user == null) {
            map.put(1L, "Nok");
			map.put(2L, "Usuario Vacio");
			return map;
        }
		try {
			map.put(1L, "Ok");
			map.put(2L, Utils.createMenu(menuRepository.findMenuRoleById(user.getEmail()), index));
		} catch (Exception e) {
            map.put(1L, "Nok");
			map.put(2L, e.getMessage());
        }
		return map;
	}
}
