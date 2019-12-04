package com.cycle.service;

import java.util.List;
import java.util.Map;

public interface DashboardService {
	
	List<Map<String, Object>> queryViewCicle(String email);
	List<Map<String, Object>> queryViewCicleDetail(String email, String fileId);
	List<Map<String, Object>> queryViewCicleAll(String table, String email, String fileId);
}