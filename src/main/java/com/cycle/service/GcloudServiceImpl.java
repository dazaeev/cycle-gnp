package com.cycle.service;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service("gcloudService")
public class GcloudServiceImpl implements GcloudService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(GcloudServiceImpl.class);
	
	public DataSource getDataSource(String user, String cve, String url, String driverClassName) {
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceBuilder.url("jdbc:mysql://35.202.74.186:3306/gnpdbx78");
        dataSourceBuilder.username("apps_kzn");
        dataSourceBuilder.password("dWte0*SAA4Hb");
        return dataSourceBuilder.build();
    }
	
	@Override
	public List<Map<String, Object>> findJobHistoryAll(String user, String cve, String url, String driverClassName) {
		LOGGER.info("## --> GcloudServiceImpl.findJobHistoryAll() ##");
		JdbcTemplate jdbcTemplate = new JdbcTemplate(); 
		jdbcTemplate.setDataSource(getDataSource(user, cve, url, driverClassName));
		String sql = "select\r\n" + 
				"	JOB_ID,\r\n" + 
				"	INPUT_FILE_NAME,\r\n" + 
				"	CHECKSUM_FILE_NAME,\r\n" + 
				"	JOB_START_TIME,\r\n" + 
				"	JOB_END_TIME,\r\n" + 
				"	JOB_STATUS,\r\n" + 
				"	JOB_TYPE,\r\n" + 
				"	INPUT_FILE_PATH,\r\n" + 
				"	OUTPUT_FILE_PATH,\r\n" + 
				"	DATA_PROC_CLUSTER_ID,\r\n" + 
				"	DATA_PROC_JOB_ID,\r\n" + 
				"	GCS_MESSAGE_ID,\r\n" + 
				"	CREATED_TIME,\r\n" + 
				"	UPDATED_TIME\r\n" + 
				"from\r\n" + 
				"	JOB_HISTORY\r\n" + 
				"where JOB_TYPE = 'TRAN'\r\n" + 
				"order by\r\n" + 
				"	JOB_ID asc";
		LOGGER.info("## <-- GcloudServiceImpl.findJobHistoryAll() ##");
		return jdbcTemplate.queryForList(sql);
	}
}