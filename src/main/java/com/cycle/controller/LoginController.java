package com.cycle.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.cycle.model.User;
import com.cycle.service.UserService;

@Controller
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	/*
	 * Acceso
	 */

	@RequestMapping(value = { "/", "/login" }, method = RequestMethod.GET)
	public ModelAndView login() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("login");
		return modelAndView;
	}

	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public ModelAndView registration() {
		ModelAndView modelAndView = new ModelAndView();
		User user = new User();
		modelAndView.addObject("user", user);
		modelAndView.setViewName("registration");
		return modelAndView;
	}

	@RequestMapping(value = "/registration", method = RequestMethod.POST)
	public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
		ModelAndView modelAndView = new ModelAndView();
		User userExists = userService.findUserByEmail(user.getEmail());
		if (userExists != null) {
			bindingResult.rejectValue("email", "error.user",
					"There is already a user registered with the email provided");
		}
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("registration");
		} else {
			userService.saveUser(user);
			modelAndView.addObject("successMessage", "User has been registered successfully");
			modelAndView.addObject("user", new User());
			modelAndView.setViewName("registration");
		}
		return modelAndView;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/registration-company")
	public ModelAndView registrationUser(Model model) {
		return new ModelAndView("redirect:/adm/registration.html");
	}
	
	@RequestMapping("/registration")
	public ModelAndView registration(Model model) {
		return new ModelAndView("redirect:registration.html");
	}
	
	@RequestMapping("/encrypt")
	public ModelAndView encrypt(Model model) {
		return new ModelAndView("redirect:/adm/encrypt.html");
	}
	
	@RequestMapping("/decrypt")
	public ModelAndView decrypt(Model model) {
		return new ModelAndView("redirect:/adm/decrypt.html");
	}
	
	@RequestMapping("/send")
	public ModelAndView send(Model model) {
		return new ModelAndView("redirect:/adm/send.html");
	}
	
	/*
	 * Test FTP
	 */
	@RequestMapping("/ftp")
	public ModelAndView ftp(Model model) {
		return new ModelAndView("redirect:/adm/ftp.html");
	}
	
	/*
	 * View Cicle
	 */
	@RequestMapping("/cicle")
	public ModelAndView cicle(Model model) {
		return new ModelAndView("redirect:/adm/cicle.html");
	}
	
	/*
	 * Dashboard
	 */
	
	@RequestMapping("/home")
	public ModelAndView home(Model model) {
		return new ModelAndView("redirect:/page/home.html");
	}
	
	/*
	 * Administracion
	 */
	
	@RequestMapping("/adm/employee")
	public ModelAndView employees(Model model) {
		return new ModelAndView("redirect:/adm/employees.html");
	}
	
	@RequestMapping("/adm/employee-gral")
	public ModelAndView employeesGral(Model model) {
		return new ModelAndView("redirect:/adm/employees-gral.html");
	}
}
