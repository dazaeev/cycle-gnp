package com.cycle.service;

import java.util.List;
import java.util.Map;

public interface GcloudService {
	
	List<Map<String, Object>> findJobHistoryAll(String user, String cve, String url, String driverClassName);
}