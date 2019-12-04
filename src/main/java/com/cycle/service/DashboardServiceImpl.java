package com.cycle.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service("dashboardService")
public class DashboardServiceImpl implements DashboardService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DashboardServiceImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Map<String, Object>> queryViewCicle(String email) {
		LOGGER.info("## --> DashboardServiceImpl.queryViewCicle() ##");
		String sql = "select\r\n" + 
				"	t1.file_id as file_id,\r\n" + 
				"	replace(replace(replace(DATE_FORMAT(CONVERT_TZ(t1.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T'), ':', ''), '-', ''), ' ', '') as concurrent,\r\n" + 
				"	-- substr(t1.file_id, 5, 14) as concurrent, \r\n" + 
				"	t1.file as file_gl, \r\n" + 
				"	DATE_FORMAT(CONVERT_TZ(t1.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_gl,\r\n" + 
				"	t2.file as file_rec, \r\n" + 
				"	DATE_FORMAT(CONVERT_TZ(t2.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_rec,\r\n" + 
				"	-- CONCAT(FLOOR(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)/60), ':', LPAD(MOD(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL),60), 2, 0)) AS `DURATION mm:ss`,\r\n" + 
				"	-- sec_to_time(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)),\r\n" + 
				"	IFNULL(\r\n" + 
				"		time_format(sec_to_time(timestampdiff(second, t1.ts_gl, t2.ts_gl)), '%H:%i:%s'),\r\n" + 
				"		time_format(sec_to_time(timestampdiff(second, t1.ts_gl, now())), '%H:%i:%s')\r\n" + 
				"	) as time,\r\n" + 
				"	(select x.user_id from user x, employee_gral y where x.email = '" + email + "' and x.user_id = y.user_id) as user_id\r\n" + 
				"from\r\n" + 
				"	(\r\n" + 
				"	select file, file_id, ts_gl from mainframe\r\n" + 
				"		where type = 'GL' \r\n" + 
				"	) as T1\r\n" + 
				"left join (\r\n" + 
				"	select file, file_id, ts_gl from mainframe\r\n" + 
				"		where\r\n" + 
				"			type = 'REC'\r\n" + 
				"	) as T2 on T1.file_id = T2.file_id\r\n" + 
				"union all\r\n" + 
				"select\r\n" + 
				"	t1.job_id as file_id,\r\n" + 
				"	replace(replace(replace(DATE_FORMAT(CONVERT_TZ(t1.date_time,'+03:00','+00:00'), '%Y-%m-%d %T'), ':', ''), '-', ''), ' ', '') as concurrent,\r\n" + 
				"	-- substr(t1.job_id, 5, 14) as concurrent, \r\n" + 
				"	t1.file as file_gl, \r\n" + 
				"	DATE_FORMAT(CONVERT_TZ(t1.date_time,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_gl,\r\n" + 
				"	t2.file as file_rec, \r\n" + 
				"	DATE_FORMAT(CONVERT_TZ(t2.date_time,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_rec,\r\n" + 
				"	-- CONCAT(FLOOR(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GLc)/60), ':', LPAD(MOD(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL),60), 2, 0)) AS `DURATION mm:ss`,\r\n" + 
				"	-- sec_to_time(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)),\r\n" + 
				"	IFNULL(\r\n" + 
				"		time_format(sec_to_time(timestampdiff(second, t1.date_time, t2.date_time)), '%H:%i:%s'),\r\n" + 
				"		time_format(sec_to_time(timestampdiff(second, t1.date_time, now())), '%H:%i:%s')\r\n" + 
				"	) as time,\r\n" + 
				"	(select x.user_id from user x, employee_gral y where x.email = '" + email + "' and x.user_id = y.user_id) as user_id\r\n" + 
				"from\r\n" + 
				"	(\r\n" + 
				"	select file, job_id, date_time from manuals\r\n" + 
				"		where file like '%GL_%'\r\n" + 
				"	) as T1\r\n" + 
				"left join (\r\n" + 
				"	select file, job_id, date_time from manuals\r\n" + 
				"		where file like '%REC_%'\r\n" + 
				"	) as T2 on T1.job_id = T2.job_id\r\n" + 
				"union all\r\n" + 
				"select\r\n" + 
				"	t1.job_id as file_id,\r\n" + 
				"	replace(replace(replace(DATE_FORMAT(CONVERT_TZ(t1.date_time,'+03:00','+00:00'), '%Y-%m-%d %T'), ':', ''), '-', ''), ' ', '') as concurrent,\r\n" + 
				"	-- substr(t1.job_id, 5, 14) as concurrent, \r\n" + 
				"	t1.file as file_gl, \r\n" + 
				"	DATE_FORMAT(CONVERT_TZ(t1.date_time,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_gl,\r\n" + 
				"	t2.file as file_rec, \r\n" + 
				"	DATE_FORMAT(CONVERT_TZ(t2.date_time,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_rec,\r\n" + 
				"	-- CONCAT(FLOOR(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GLc)/60), ':', LPAD(MOD(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL),60), 2, 0)) AS `DURATION mm:ss`,\r\n" + 
				"	-- sec_to_time(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)),\r\n" + 
				"	IFNULL(\r\n" + 
				"		time_format(sec_to_time(timestampdiff(second, t1.date_time, t2.date_time)), '%H:%i:%s'),\r\n" + 
				"		time_format(sec_to_time(timestampdiff(second, t1.date_time, now())), '%H:%i:%s')\r\n" + 
				"	) as time,\r\n" + 
				"	(select x.user_id from user x, employee_gral y where x.email = '" + email + "' and x.user_id = y.user_id) as user_id\r\n" + 
				"from\r\n" + 
				"	(\r\n" + 
				"	select file, job_id, date_time from bridge\r\n" + 
				"		where file like '%GL_PCH_%'\r\n" + 
				"	) as T1\r\n" + 
				"left join (\r\n" + 
				"	select file, job_id, date_time from bridge\r\n" + 
				"		where file like '%REC_PCH_%'\r\n" + 
				"	) as T2 on T1.job_id = T2.job_id\r\n" + 
				"order by 2 desc";
		LOGGER.info("## <-- DashboardServiceImpl.queryViewCicle() ##");
		return jdbcTemplate.queryForList(sql);
	}

	@Override
	public List<Map<String, Object>> queryViewCicleDetail(String email, String fileId) {
		LOGGER.info("## --> DashboardServiceImpl.queryViewCicleDetail() ##");
		String sql = "select \r\n" + 
				"	substr(b.job_id, 5, 14) as concurrent,\r\n" + 
				"	@main_ts_gl:=(\r\n" + 
				"		select DATE_FORMAT(CONVERT_TZ(main.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') from mainframe main where main.file_id = b.job_id and main.`type` = 'GL'\r\n" + 
				"	) as GL,\r\n" + 
				"	b.job_id as file_id,\r\n" + 
				"	b.file as 117_file, b.`size` as 117_size, b.folder as 117_folder, b.date_time as 117_date, \r\n" + 
				"	gs.folder as gs_folder, DATE_FORMAT(date_sub(gs.date_time, interval 9 hour), \"%Y-%m-%d %T\") as gs_date,\r\n" + 
				"	gc.id_job as gc_id_job, gc.name_job as gc_name_job, gc.status_state as gc_status, date_sub(gc.status_state_start_time, interval 6 hour) as gc_date,\r\n" + 
				"	@main_ts_rec:=(\r\n" + 
				"		select DATE_FORMAT(CONVERT_TZ(main.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') from mainframe main where main.file_id = b.job_id and main.`type` = 'REC'\r\n" + 
				"	) as REC,\r\n" + 
				"	x.user_id\r\n" + 
				"		from user x, employee_gral y, bridge b, gstorage gs, gcloud_jobs gc\r\n" + 
				"	where x.user_id = y.user_id\r\n" + 
				"		and x.email = '" + email + "'\r\n" + 
				"		and b.employee_gral_id = y.id\r\n" + 
				"		and gs.employee_gral_id = y.id\r\n" + 
				"		and gc.employee_gral_id = y.id -- init\r\n" + 
				"		and b.job_id = '" + fileId + "'\r\n" + 
				"		and b.job_id = gs.job_id\r\n" + 
				"		and gs.job_id = gc.job_id\r\n" + 
				"	order by concurrent desc";
		LOGGER.info("## <-- DashboardServiceImpl.queryViewCicleDetail() ##");
		return jdbcTemplate.queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> queryViewCicleAll(String table, String email, String fileId) {
		LOGGER.info("## --> DashboardServiceImpl.queryViewCicleAll() ##");
		String sql = "";
		if (table.equals("bridge")) {
			sql = "select\r\n" + 
					"	b.job_id as file_id,\r\n" + 
					"	b.file as 117_file,\r\n" + 
					"	b.`size` as 117_size,\r\n" + 
					"	b.folder as 117_folder,\r\n" + 
					"	DATE_FORMAT(date_sub(b.date_time, interval 3 hour), \"%Y-%m-%d %T\") as 117_date\r\n" + 
					"from\r\n" + 
					"	user x,\r\n" + 
					"	employee_gral y,\r\n" + 
					"	bridge b\r\n" + 
					"where\r\n" + 
					"	x.user_id = y.user_id\r\n" + 
					"	and x.email = '" + email + "'\r\n" + 
					"	and b.employee_gral_id = y.id\r\n" + 
					"	and b.job_id = '" + fileId + "'";
		} else if (table.equals("gstorage")) {
			sql = "select\r\n" + 
					"	gs.folder as gs_folder, \r\n" + 
					"	DATE_FORMAT(date_sub(gs.date_time, interval 3 hour), \"%Y-%m-%d %T\") as gs_date\r\n" + 
					"from\r\n" + 
					"	user x,\r\n" + 
					"	employee_gral y,\r\n" + 
					"	gstorage gs\r\n" + 
					"where\r\n" + 
					"	x.user_id = y.user_id\r\n" + 
					"	and x.email = '" + email + "'\r\n" + 
					"	and gs.employee_gral_id = y.id\r\n" + 
					"	and gs.job_id = '" + fileId + "'";
		} else if (table.equals("gcloud_jobs")) {
			sql = "select\r\n" + 
					"	gc.id_job as gc_id_job, \r\n" + 
					"	gc.name_job as gc_name_job, \r\n" + 
					"	gc.status_state as gc_status, \r\n" + 
					"	date_sub(gc.status_state_start_time, interval 6 hour) as gc_date\r\n" + 
					"from\r\n" + 
					"	user x,\r\n" + 
					"	employee_gral y,\r\n" + 
					"	gcloud_jobs gc\r\n" + 
					"where\r\n" + 
					"	x.user_id = y.user_id\r\n" + 
					"	and x.email = '" + email + "'\r\n" + 
					"	and gc.employee_gral_id = y.id\r\n" + 
					"	and gc.job_id = '" + fileId + "'";
		} else if (table.equals("mainframe")) {
			sql = "select\r\n" + 
					"	main.`type` as type,\r\n" + 
					"	DATE_FORMAT(CONVERT_TZ(main.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_gl\r\n" + 
					"from\r\n" + 
					"	user x,\r\n" + 
					"	employee_gral y,\r\n" + 
					"	mainframe main\r\n" + 
					"where\r\n" + 
					"	x.user_id = y.user_id\r\n" + 
					"	and x.email = '" + email + "'\r\n" + 
					"	and main.employee_gral_id = y.id\r\n" + 
					"	and main.file_id = '" + fileId + "'";
		} else if (table.equals("manuals")) {
			sql = "select\r\n" + 
					"	ma.file,\r\n" + 
					"	DATE_FORMAT(CONVERT_TZ(ma.date_time,'+02:00','+00:00'), '%Y-%m-%d %T') as ts_gl\r\n" + 
					"from\r\n" + 
					"	user x,\r\n" + 
					"	employee_gral y,\r\n" + 
					"	manuals ma\r\n" + 
					"where\r\n" + 
					"	x.user_id = y.user_id\r\n" + 
					"	and x.email = '" + email + "'\r\n" + 
					"	and ma.employee_gral_id = y.id\r\n" + 
					"	and ma.job_id = '" + fileId + "'";
		} else {
			return null;
		}
		LOGGER.info("## <-- DashboardServiceImpl.queryViewCicleAll() ##");
		return jdbcTemplate.queryForList(sql);
	}
}