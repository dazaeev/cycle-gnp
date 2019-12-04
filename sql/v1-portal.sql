select * from `user`;
select * from user_role;
select * from `role`;

select * from menu for update;

select * from send for update;

select * from company for update;

select * from temp_details;

select * from `parameter` for update;


select * from employee_gral for update;
	select * from job for update;

select * from employee_gral for update;
	select * from command for update;
	select * from bridge;
		select count(*) from bridge; -- 394
		-- delete from bridge;
	select * from gstorage;
		select count(*) from gstorage; -- 742
		-- delete from gstorage;
	select * from gcloud_jobs for update;
		select count(*) from gcloud_jobs; -- 703
		-- delete from gcloud_jobs;
	select * from mainframe for update; -- 2019-11-15+09:00:04
		select count(*) from mainframe;
	select * from manuals for update;
		select count(*) from manuals;
		-- delete from manuals;
	-- commit;

-- MariaDB
-- GRANT ALL ON *.* to root@'10.64.125.118' IDENTIFIED BY 'admin'; --permiso a windows
-- GRANT ALL ON *.* to root@'10.64.171.74' IDENTIFIED BY 'admin'; --permiso a windows
-- MySQL
-- CREATE USER 'guillermo'@'%' IDENTIFIED BY 'root';
-- GRANT ALL PRIVILEGES ON *.* TO 'guillermo'@'%' WITH GRANT OPTION;
CREATE USER 'eli'@'%' IDENTIFIED BY 'eli';
GRANT ALL PRIVILEGES ON *.* TO 'eli'@'%' WITH GRANT OPTION;

-- # Iniciando sql final
select b.job_id,
	b.file, b.folder, b.date_time, 
	gs.folder, gs.date_time, 
	gc.id_job, gc.name_job, gc.status_state, gc.status_state_start_time 
		from user x, employee_gral y, bridge b, gstorage gs, gcloud_jobs gc
	where x.user_id = y.user_id
		and x.email = 'nazario.gonzalez@gnp.com.mx'
		and b.employee_gral_id = y.id
		and gs.employee_gral_id = y.id
		and gc.employee_gral_id = y.id -- init
		and b.job_id = gs.job_id
		and gs.job_id = gc.job_id;

select b.*  from bridge b where b.file like '%GL_AND_20190919125110%';
select gs.* from gstorage gs where gs.name_file like '%GL_AND_20190919125110%';

select gc.* from gcloud_jobs gc where gc.input_file = 'GL_FAC_20191101113314.TXT';


-- ##############

-- FILE, FOLDER, DATE, FOLDER_GS, DATE_GS, ID_JOB_GC, NAME_JOB_GC, STATUS_STATE_GC, STATUS_STATE_START_TIME_GC
-- GL_AND_20191017010632.TXT GL_AND_20191016133646.TXT GL_AND_20191024010515.TXT GL_AND_20191026011950.TXT GL_AND_20191108104426.TXT

select b.file, b.folder, b.date_time from bridge b where b.file like '%XlaTransactionUploadTemplate_VID_20191113195005632.zip%';
select gs.folder, gs.date_time from gstorage gs where gs.name_file like '%XlaTransactionUploadTemplate_VID_20191113195005632.zip%';
select gc.id_job, gc.name_job, gc.status_state, gc.status_state_start_time from gcloud_jobs gc where gc.input_file like '%XlaTransactionUploadTemplate_VID_20191113195005632.zipv%';

-- v1 report
select
    b.file as b_file, b.folder as b_folder, DATE_FORMAT(b.date_time, '%Y-%m-%d %T') as b_date_time,
    gs.folder as gs_folder, DATE_FORMAT(gs.date_time, '%Y-%m-%d %T') as gs_date_time,
    gc.id_job as gc_id_job, gc.name_job as gc_name_job, gc.status_state as gc_status_state, gc.status_state_start_time as gc_status_state_start_time
from (
    select distinct file as file from bridge
    union
    select distinct name_file as file from gstorage
    union
    select distinct input_file as file from gcloud_jobs
) as cicle
    left outer join bridge as b on b.file = cicle.file
    left outer join gstorage as gs on gs.name_file = cicle.file
    left outer join gcloud_jobs as gc on gc.input_file = cicle.file;

select b.file, b.folder, b.date_time,
	gs.folder, gs.date_time, 
	gc.id_job, gc.name_job, gc.status_state, gc.status_state_start_time 
		from user x, employee_gral y, bridge b, gstorage gs, gcloud_jobs gc
	where x.user_id = y.user_id
		and x.email = 'nazario.gonzalez@gnp.com.mx'
		and b.employee_gral_id = y.id
		and gs.employee_gral_id = y.id
		and gc.employee_gral_id = y.id -- init
		and b.file = gs.name_file
		and gs.name_file = gc.input_file
		and b.file like '%GL_AND_20190919125110%';

select b.* from bridge b where b.file like '%GL_AND_20191115112731%';
select gs.* from gstorage gs;
select gc.* from gcloud_jobs gc where gc.name_job = 'pp-dataproc-job-retry-1-969';

select count(*) from gcloud_jobs gc; -- 661

SELECT DATE_FORMAT('2019-11-10 21:00:17', '%Y-%m-%d %T');

-- v2 report ID
select
	cicle.gl_id,
	ma.type as mf_type,
	b.file as b_file, b.folder as b_folder, DATE_FORMAT(date_sub(b.date_time	, INTERVAL 3 DAY), '%Y-%m-%d %T') as b_date_time,
    gs.folder as gs_folder, DATE_FORMAT(gs.date_time, '%Y-%m-%d %T') as gs_date_time,
    gc.id_job as gc_id_job, gc.name_job as gc_name_job, gc.status_state as gc_status_state, gc.status_state_start_time as gc_status_state_start_time,
    ma.status as ma_status, ma.action as ma_action, ma.ts_gl as ma_ts_gl
from (
	select distinct file_id as gl_id from mainframe
	union
    select distinct job_id as gl_id from bridge
    union
    select distinct job_id as gl_id from gstorage
    union
    select distinct job_id as gl_id from gcloud_jobs
) as cicle
	left outer join mainframe as ma on ma.file_id = cicle.gl_id
    left outer join bridge as b on b.job_id = cicle.gl_id
    left outer join gstorage as gs on gs.job_id = cicle.gl_id
    left outer join gcloud_jobs as gc on gc.job_id = cicle.gl_id
    and cicle.gl_id = 'COB_20191127100132';

-- v2 report NOMBRE ARCHIVO
select
	cicle.file,
	b.file as b_file, b.folder as b_folder, DATE_FORMAT(date_sub(b.date_time	, INTERVAL 3 DAY), '%Y-%m-%d %T') as b_date_time,
    gs.folder as gs_folder, DATE_FORMAT(gs.date_time, '%Y-%m-%d %T') as gs_date_time,
    gc.id_job as gc_id_job, gc.name_job as gc_name_job, gc.status_state as gc_status_state, gc.status_state_start_time as gc_status_state_start_time
from (
    select distinct file as file from bridge
    union
    select distinct file as file from gstorage
    union
    select distinct input_file as file from gcloud_jobs
) as cicle
    left outer join bridge as b on b.file = cicle.file
    left outer join gstorage as gs on gs.file = cicle.file
    left outer join gcloud_jobs as gc on gc.input_file = cicle.file;
   

-- v3 report
select
	substr(v2.job_id, 5, 14) as concurrent,
	v2.job_id as job_id_1,
	ley as ley_2,
	DATE_FORMAT(v2.date_time, "%Y-%m-%d %T") as date_time_3,
	v2.size as size_4,
	v4.name_job as name_job_5,
	v4.status_state as status_state_6,
	date_sub(v4.status_state_start_time, interval 6 hour) as start_time_7,
	gsley as gsley_8,
	DATE_FORMAT(date_sub(v3.date_time, interval 6 hour), "%Y-%m-%d %T") as date_time_9,
	"REC RECIBIDO" as ly_10,
	v5.file as file_11,
	DATE_FORMAT(v5.date_time, "%Y-%m-%d %T") as date_time_12
from
	(
		select job_id from gstorage
			union
		select job_id from bridge
			union
		select job_id from gcloud_jobs 
	) as V1
	left outer join (
		select
			substr(job_id, 5, 14), job_id, folder, file, date_time, size, "NO PROCESADO" as ley
		from
			bridge
		where
			folder like '%/kaizen_uat/sistemas/%' and file like '%GL%txt%'
	union all
		select
			substr(job_id, 5, 14), job_id, folder, file, date_time, size, "ENV AL BUCKET" as ley
		from
			bridge
		where
			(
				folder like '%/kaizen_uat/respaldo/respaldo_unpload%' 
					or folder like '%/kaizen_uat/respaldo/respaldo_manual_unpload%'
					or folder like '%/kaizen_uat/respaldo/respaldo_reproceso_unpload%'
					or folder like '%/informatica/ftp/trz/mov_m_output%')
				and file like '%GL%txt%'
			) as v2 
			on v1.job_id = v2.job_id
	left outer join (
		select
			substr(job_id,
			5,
			14),
			job_id,
			folder,
			name_file,
			date_time,
			size,
			"GL esperando en PP" as gsley
		from
			gstorage
		where
			folder like '%gs://pre-processor-gnp-kaisen-uat/gnp_input_files/%'
			and name_file like '%GL%'
	union all
		select
			substr(job_id,
			5,
			14),
			job_id,
			folder,
			name_file,
			date_time,
			size,
			"Solicitado al OIC" as gsley
		from
			gstorage
		where
			folder like '%gs://pre-processor-gnp-kaisen-uat/delivered/%'
			and folder like '%GL%' ) as v3 
			on v1.job_id = v3.job_id
	left outer join (
		select
			substr(job_id, 5, 14), job_id, input_file, id_job, name_job, status_state, status_state_start_time
		from
			gcloud_jobs
		where
			input_file like '%GL%') as v4 
		on v1.job_id = v4.job_id
	left outer join (
		select
			substr(job_id, 5, 14), job_id, folder, file, date_time, size, "REC GENERADOS"
		from
			bridge
		where 
			(
				folder like '%/kaizen_uat/respaldo/respaldo_rec_unzip%' 
					or folder like '%/kaizen_uat/oracle/Outbound/GL/%'
			)
			and file like '%REC%TXT%' ) as v5 
			on v1.job_id = v5.job_id
	where
		v2.job_id is not null
	order by 1 desc;



SELECT DATE_FORMAT("2019-11-15 11:27:48", "%Y-%m-%d %T");
select date_time from bridge where file = 'GL_AND_20191115112731.TXT';
	-- +---------------------+
	-- | date_time           |
	-- +---------------------+
	-- | 2019-11-15 14:27:48 |
	-- +---------------------+

-- v4 report
select
	substr(init.file_id, 5, 14) as concurrent,
	init.file_id as job_id_1,
	init.type as init_type, init.ts_gl as init_ts_gl,
	ley as ley_2,
	DATE_FORMAT(v2.date_time, "%Y-%m-%d %T") as date_time_3,
	v2.size as size_4,
	v4.name_job as name_job_5,
	v4.status_state as status_state_6,
	date_sub(v4.status_state_start_time, interval 6 hour) as start_time_7,
	gsley as gsley_8,
	DATE_FORMAT(date_sub(v3.date_time, interval 6 hour), "%Y-%m-%d %T") as date_time_9,
	"REC RECIBIDO" as ly_10,
	v5.file as file_11,
	DATE_FORMAT(v5.date_time, "%Y-%m-%d %T") as date_time_12,
	end.type as end_type, end.ts_gl as end_ts_gl
from
	(	select file_id from mainframe
			union
		select job_id from gstorage
			union
		select job_id from bridge
			union
		select job_id from gcloud_jobs
	) as V1
	left outer join (
		select file_id, type, ts_gl from mainframe main where main.type = 'GL'
		) as init
			on v1.file_id = init.file_id
	left outer join (
		select
			substr(job_id, 5, 14), job_id, folder, file, date_time, size, "NO PROCESADO" as ley
		from
			bridge
		where
			folder like '%/kaizen_uat/sistemas/%' and file like '%GL%txt%'
	union all
		select
			substr(job_id, 5, 14), job_id, folder, file, date_time, size, "ENV AL BUCKET" as ley
		from
			bridge
		where
			(
				folder like '%/kaizen_uat/respaldo/respaldo_unpload%' 
					or folder like '%/kaizen_uat/respaldo/respaldo_manual_unpload%'
					or folder like '%/kaizen_uat/respaldo/respaldo_reproceso_unpload%'
					or folder like '%/informatica/ftp/trz/mov_m_output%')
				and file like '%GL%txt%'
			) as v2 
			on v1.file_id = v2.job_id
	left outer join (
		select
			substr(job_id,
			5,
			14),
			job_id,
			folder,
			name_file,
			date_time,
			size,
			"GL esperando en PP" as gsley
		from
			gstorage
		where
			folder like '%gs://pre-processor-gnp-kaisen-uat/gnp_input_files/%'
			and name_file like '%GL%'
	union all
		select
			substr(job_id,
			5,
			14),
			job_id,
			folder,
			name_file,
			date_time,
			size,
			"Solicitado al OIC" as gsley
		from
			gstorage
		where
			folder like '%gs://pre-processor-gnp-kaisen-uat/delivered/%'
			and folder like '%GL%' ) as v3 
			on v1.file_id = v3.job_id
	left outer join (
		select
			substr(job_id, 5, 14), job_id, input_file, id_job, name_job, status_state, status_state_start_time
		from
			gcloud_jobs
		where
			input_file like '%GL%') as v4 
		on v1.file_id = v4.job_id
	left outer join (
		select
			substr(job_id, 5, 14), job_id, folder, file, date_time, size, "REC GENERADOS"
		from
			bridge
		where 
			(
				folder like '%/kaizen_uat/respaldo/respaldo_rec_unzip%' 
					or folder like '%/kaizen_uat/oracle/Outbound/GL/%'
					or folder like '%/informatica/ftp/trz/mov_m_input/procesado%'
			)
			and file like '%REC%TXT%' ) as v5 
			on v1.file_id = v5.job_id
	left outer join (
		select file_id, type, ts_gl from mainframe main where main.type = 'REC'
		) as end
			on v1.file_id = end.file_id
	where
		init.file_id is not null
	order by 1 desc;

	-- VID_20191127095625	GL	2019-11-27 10:36:26
	-- TER_20191127090358	GL	2019-11-27 09:09:34

-- commit;
-- delete from bridge where employee_gral_id = 4;
-- delete from gstorage where employee_gral_id = 4;
-- delete from gcloud_jobs where employee_gral_id = 4;
-- delete from mainframe where employee_gral_id = 4;

select * from bridge;
	select count(*) from bridge;
	-- delete from bridge;
select * from gstorage;
	select count(*) from gstorage;
	-- delete from gstorage;
select * from gcloud_jobs;
	select count(*) from gcloud_jobs;
	-- delete from gcloud_jobs;
select file_id, file, ts_gl, type, status, action, line from mainframe; -- 010_20191115080241, VID_20191126095753
	select count(*) from mainframe; -- 95
	-- delete from mainframe;
select * from manuals;
	select count(*) from manuals;


select 'ENVIANDO GL' as type from mainframe main where main.type = 'GL';



-- Query GL - REC
select
	t1.file_id as file_id,
	replace(replace(replace(DATE_FORMAT(CONVERT_TZ(t1.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T'), ':', ''), '-', ''), ' ', '') as concurrent,
	-- substr(t1.file_id, 5, 14) as concurrent, 
	t1.file as file_gl, 
	DATE_FORMAT(CONVERT_TZ(t1.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_gl,
	t2.file as file_rec, 
	DATE_FORMAT(CONVERT_TZ(t2.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_rec,
	-- CONCAT(FLOOR(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)/60), ':', LPAD(MOD(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL),60), 2, 0)) AS `DURATION mm:ss`,
	-- sec_to_time(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)),
	IFNULL(
		time_format(sec_to_time(timestampdiff(second, t1.ts_gl, t2.ts_gl)), '%H:%i:%s'),
		time_format(sec_to_time(timestampdiff(second, t1.ts_gl, now())), '%H:%i:%s')
	) as time,
	(select x.user_id from user x, employee_gral y where x.email = 'nazario.gonzalez@gnp.com.mx' and x.user_id = y.user_id) as user_id
from
	(
	select file, file_id, ts_gl from mainframe
		where type = 'GL' 
	) as T1
left join (
	select file, file_id, ts_gl from mainframe
		where
			type = 'REC'
	) as T2 on T1.file_id = T2.file_id
union all
select
	t1.job_id as file_id,
	replace(replace(replace(DATE_FORMAT(CONVERT_TZ(t1.date_time,'+02:00','+00:00'), '%Y-%m-%d %T'), ':', ''), '-', ''), ' ', '') as concurrent,
	-- substr(t1.job_id, 5, 14) as concurrent, 
	t1.file as file_gl, 
	DATE_FORMAT(CONVERT_TZ(t1.date_time,'+02:00','+00:00'), '%Y-%m-%d %T') as ts_gl,
	t2.file as file_rec, 
	DATE_FORMAT(CONVERT_TZ(t2.date_time,'+02:00','+00:00'), '%Y-%m-%d %T') as ts_rec,
	-- CONCAT(FLOOR(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GLc)/60), ':', LPAD(MOD(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL),60), 2, 0)) AS `DURATION mm:ss`,
	-- sec_to_time(TIMESTAMPDIFF(second, T1.TS_GL, T2.TS_GL)),
	IFNULL(
		time_format(sec_to_time(timestampdiff(second, t1.date_time, t2.date_time)), '%H:%i:%s'),
		time_format(sec_to_time(timestampdiff(second, t1.date_time, now())), '%H:%i:%s')
	) as time,
	(select x.user_id from user x, employee_gral y where x.email = 'nazario.gonzalez@gnp.com.mx' and x.user_id = y.user_id) as user_id
from
	(
	select file, job_id, date_time from manuals
		where file like '%GL_%'
	) as T1
left join (
	select file, job_id, date_time from manuals
		where file like '%REC_%'
	) as T2 on T1.job_id = T2.job_id
order by 2 desc;



-- Detail
select 
	substr(b.job_id, 5, 14) as concurrent,
	@main_ts_gl:=(
		select DATE_FORMAT(CONVERT_TZ(main.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') from mainframe main where main.file_id = b.job_id and main.`type` = 'GL'
	) as GL,
	b.job_id as file_id,
	b.file as 117_file, b.`size` as 117_size, b.folder as 117_folder, b.date_time as 117_date, 
	gs.folder as gs_folder, DATE_FORMAT(date_sub(gs.date_time, interval 9 hour), "%Y-%m-%d %T") as gs_date,
	gc.id_job as gc_id_job, gc.name_job as gc_name_job, gc.status_state as gc_status, date_sub(gc.status_state_start_time, interval 6 hour) as gc_date,
	@main_ts_rec:=(
		select DATE_FORMAT(CONVERT_TZ(main.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') from mainframe main where main.file_id = b.job_id and main.`type` = 'REC'
	) as REC,
	x.user_id
		from user x, employee_gral y, bridge b, gstorage gs, gcloud_jobs gc
	where x.user_id = y.user_id
		and x.email = 'nazario.gonzalez@gnp.com.mx'
		and b.employee_gral_id = y.id
		and gs.employee_gral_id = y.id
		and gc.employee_gral_id = y.id -- init
		and b.job_id = 'TER_20191202082437'
		and b.job_id = gs.job_id
		and gs.job_id = gc.job_id
	order by concurrent desc;


select * from bridge where job_id = 'COB_20191129100733';
select * from gstorage where job_id = 'COB_20191129100733';
select * from gcloud_jobs where job_id = 'COB_20191129100733';
	select * from mainframe where file_id = 'COB_20191129100733';
	select * from manuals where job_id = 'COB_20191129100733';

-- NAZ_20191129101104
-- COB_20191129100733
-- FGI_20191129100931
-- TER_20191202082437

-- Detail v2 [VID_20191119094852 - no existe validar]

-- BRIDGE
select
	b.job_id as file_id,
	b.file as 117_file,
	b.`size` as 117_size,
	b.folder as 117_folder,
	DATE_FORMAT(date_sub(b.date_time, interval 3 hour), "%Y-%m-%d %T") as 117_date
from
	user x,
	employee_gral y,
	bridge b
where
	x.user_id = y.user_id
	and x.email = 'nazario.gonzalez@gnp.com.mx'
	and b.employee_gral_id = y.id
	and b.job_id = 'TER_20191129083016';
-- GSTORAGE
select
	gs.folder as gs_folder, 
	gs.date_time,
	DATE_FORMAT(date_sub(gs.date_time, interval 3 hour), "%Y-%m-%d %T") as gs_date
from
	user x,
	employee_gral y,
	gstorage gs
where
	x.user_id = y.user_id
	and x.email = 'nazario.gonzalez@gnp.com.mx'
	and gs.employee_gral_id = y.id
	and gs.job_id = 'TER_20191129083016';
-- GCLOUD_JOBS
select
	gc.id_job as gc_id_job, 
	gc.name_job as gc_name_job, 
	gc.status_state as gc_status, 
	gc.status_state_start_time,
	date_sub(gc.status_state_start_time, interval 6 hour) as gc_date
from
	user x,
	employee_gral y,
	gcloud_jobs gc
where
	x.user_id = y.user_id
	and x.email = 'nazario.gonzalez@gnp.com.mx'
	and gc.employee_gral_id = y.id
	and gc.job_id = 'TER_20191129083016';
-- MAINFRAME
select
	main.`type` as type,
	DATE_FORMAT(CONVERT_TZ(main.ts_gl,'+03:00','+00:00'), '%Y-%m-%d %T') as ts_gl
from
	user x,
	employee_gral y,
	mainframe main
where
	x.user_id = y.user_id
	and x.email = 'nazario.gonzalez@gnp.com.mx'
	and main.employee_gral_id = y.id
	and main.file_id = 'TER_20191129083016';
-- MANUALS
select
	ma.file,
	DATE_FORMAT(CONVERT_TZ(ma.date_time,'+02:00','+00:00'), '%Y-%m-%d %T') as ts_gl
from
	user x,
	employee_gral y,
	manuals ma
where
	x.user_id = y.user_id
	and x.email = 'nazario.gonzalez@gnp.com.mx'
	and ma.employee_gral_id = y.id
	and ma.job_id = 'TER_20191129083016';








