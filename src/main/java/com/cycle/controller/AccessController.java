package com.cycle.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AccessController implements ErrorController {
	
	@Override
	public String getErrorPath() {
		return "/error";
	}
	
	@RequestMapping(value = "/error")
    public String errorKardex() {
        return "access-denied";
    }
}
