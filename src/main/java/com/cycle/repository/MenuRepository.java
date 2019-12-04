package com.cycle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cycle.model.Menu;

@Repository
public interface MenuRepository extends CrudRepository<Menu, Integer> {
	
	@Query(value = "select m.id, m.html, m.menu, m.role_id_menu, m.sub_menu \n" + 
			"	from menu m, role r \n" + 
			"		where m.role_id_menu = r.role_id \n" + 
			"	and r.role_id = (select ur.role_id \n" + 
			"						from user u, user_role ur \n" + 
			"							where u.user_id = ur.user_id \n" + 
			"						and u.email = ?1) \n" + 
			"		order by r.role, m.menu, m.sub_menu", nativeQuery = true)
	public List<Menu> findMenuRoleById(String email);
}