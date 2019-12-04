package com.cycle.utils;

public class Constants {

	private Constants() {
		throw new IllegalStateException("kardex-buromc: Exception Constants");
	}
	
	public static final String C_LOGIN = "/login";
	
	// Menu
	public static final String C_MENU_TITLE = "-TITLE-";
	public static final String C_MENU_HEADER = 
			"                <ul class=\"nav navbar-nav\">\n" + 
			"                    <li -HOME->\n" + 
			"                        <a href=\"/home\"> <i class=\"menu-icon fa fa-dashboard\"></i>Dashboard</a>\n" + 
			"                    </li>\n" + 
			"                    <h2 class=\"menu-title\" style=\"color: #00999d;\">Opciones</h2><!-- /.menu-title -->";
	public static final String C_MENU_CONTENT = "					<li class=\"menu-item-has-children dropdown\">\r\n" + 
			"						<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"menu-icon fa fa-laptop\"></i>-TITLE-</a>\r\n" + 
			"						<ul class=\"sub-menu children dropdown-menu\">";
	public static final String C_MENU_FOOTER = "                </ul>";
	
	public static final String C_BACKSLASH = "-BACKSLASH-";
}