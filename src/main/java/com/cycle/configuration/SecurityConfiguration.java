package com.cycle.configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private DataSource dataSource;
	
	@Value("${spring.queries.users-query}")
	private String usersQuery;
	@Value("${spring.queries.roles-query}")
	private String rolesQuery;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication()
				.usersByUsernameQuery(usersQuery)
				.authoritiesByUsernameQuery(rolesQuery)
				.dataSource(dataSource)
				.passwordEncoder(bCryptPasswordEncoder);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.authorizeRequests()
			
			.antMatchers("/").permitAll()
			// .antMatchers(Constants.C_LOGIN).permitAll()
			
			// Registrar empleado
			.antMatchers("/registration").hasAuthority("ADMIN")

			// Paginas y/o controlers (definido por ROL)
			// career
			.antMatchers("/career/**").hasAuthority("ADMIN")
			// request
			.antMatchers("/request/**").hasAuthority("ADMIN")
			// view
			.antMatchers("/view/**").hasAuthority("ADMIN")
			
			
			.antMatchers("/db/**").hasAuthority("USERS")
			
			// Validar Roles
			.antMatchers("/templates/header_bmc.html").hasAnyAuthority("ADMIN","USER")
			// home
			.antMatchers("/home").hasAnyAuthority("ADMIN","USER")
			.antMatchers("/page/home.html").hasAnyAuthority("ADMIN","USER")
			//
			.antMatchers("/registration-company").hasAuthority("ADMIN")
			.antMatchers("/adm/registration.html").hasAuthority("ADMIN")
			// 
			.antMatchers("/encrypt").hasAnyAuthority("ADMIN","USER")
			.antMatchers("/adm/encrypt.html").hasAnyAuthority("ADMIN","USER")
			//
			.antMatchers("/decrypt").hasAnyAuthority("ADMIN","USER")
			.antMatchers("/adm/decrypt.html").hasAnyAuthority("ADMIN","USER")
			//
			.antMatchers("/send").hasAnyAuthority("ADMIN","USER")
			.antMatchers("/adm/send.html").hasAnyAuthority("ADMIN","USER")
			//
			.antMatchers("/ftp").hasAnyAuthority("ADMIN","USER")
			.antMatchers("/adm/ftp.html").hasAnyAuthority("ADMIN","USER")
			//
			.antMatchers("/cicle").hasAnyAuthority("ADMIN","USER")
			.antMatchers("/adm/cicle.html").hasAnyAuthority("ADMIN","USER")
			
			
			// test
			.antMatchers("/adm/company/fileInsFile/**").hasAnyAuthority("ADMIN","USER")
			
			// TEST FTP
			// .antMatchers("/ftp/**").permitAll()
			// .antMatchers("/adm/ftp/**").permitAll()
			// .antMatchers("/adm/ftp.html").permitAll()
			// .antMatchers("/Tarjeta SD/DCIM/Camera/**").permitAll()
			// .antMatchers("/adm/").permitAll()
			
			// Estilos permitodos para todos
			.antMatchers(HttpMethod.GET, "/css/**").permitAll()
			
			.antMatchers(HttpMethod.GET, "/assets/bootstrap-validator-master/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/css/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/fonts/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/js/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/js-controller/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/plugins/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/scss/**").permitAll()
			.antMatchers(HttpMethod.GET, "/assets/select2/**").permitAll()

			.antMatchers(HttpMethod.GET, "/assets/embed/**").permitAll()
			.antMatchers(HttpMethod.GET, "/images/**").permitAll()
			
			// Login
			.anyRequest().fullyAuthenticated().and().formLogin()
			
			// Pagina de Inicio
			//.loginPage(Constants.C_LOGIN).permitAll()
			.loginPage("/").permitAll()
			.defaultSuccessUrl("/home")
			.usernameParameter("email")
			.passwordParameter("password")
			//.and().logout().logoutSuccessUrl(Constants.C_LOGIN)
			.and().logout().logoutSuccessUrl("/")
			.and().csrf().disable();
	}
}