package com.cycle.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cycle.dto.JesJob;
import com.cycle.model.EmployeeGral;
import com.cycle.model.MainFrame;
import com.cycle.model.Send;
import com.cycle.service.UserService;

@SuppressWarnings("deprecation")
public class MFrame implements Serializable {
	
	private static final long serialVersionUID = -1674191099704086783L;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MFrame.class);
	
	private static StringBuffer fecha = new StringBuffer("-------------");
    private static StringBuffer time = new StringBuffer("hh:mm:ss");
	
	/** Parses a single line of text, and returns an FTPFile.
	 * <p>Typically, the text would be something like this:
	 * <pre>
	 * ISIELW   TSU00807 ISIELW   OUTPUT TSU    ABEND=522 3 spool files
	 * jobname  jobid    owner    status type   result
	 * </pre>
	 * <pre>
	 * Use regular expressions to break into words ...
	 * remembering that:
	 * - the first backslash is the Java String escape mechanism
	 *   so that \\S is really just \S in regexp terms.
	 * - <strong>\S</strong>    means any non-whitespace character
	 * - <strong>\S+</strong>   means a bunch of them
	 * - <strong>(\S+)</strong> means a bunch of them - as a group
	 * - <strong>\s+</strong>   means some whitespace
	 * </pre>
	 * 
	 * @see org.apache.commons.net.ftp.FTPFileEntryParser#parseFTPEntry(java.lang.String)
	 */
	public static FTPFile parseFTPEntry(String arg0) {
		LOGGER.info("## --> MFrame.parseFTPEntry() ##");
		JesJob f = new JesJob();

		String sOwner = "";
		String sStatus = "";
		String sType = "";
		String sReturnCode = "";
		
		Pattern p = Pattern.compile("(\\S+)\\s+(\\S+)\\s+(.*)");
		Matcher matcher = p.matcher(arg0);
		if (matcher.find()) {
			String sJobname = matcher.group(1);
			String sJobid = matcher.group(2);
			String sRemainder = matcher.group(3);
			if (!sRemainder.equals("")) {
				Pattern p2 = Pattern.compile("(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(.*)");
				Matcher matcher2 = p2.matcher(sRemainder);
				if (matcher2.find()) {
					sOwner = matcher2.group(1);
					sStatus = matcher2.group(2);
					sType = matcher2.group(3);
					String remainder = matcher2.group(4);
					if (remainder.startsWith("RC=")) {
						sReturnCode = remainder.substring(3, 8);
					}
					if (remainder.startsWith("ABEND=")) {
						sReturnCode = "S" + remainder.substring(6, 10);
					}
					if (remainder.startsWith("(JCL error)")) {
						sReturnCode = "JCL error";
					}
				}
			}
			f.setName(sJobid);
			f.setsJobName(sJobname);
			f.setsOwner(sOwner);
			f.setsStatus(sStatus);
			f.setsJobClass(sType);
			f.setsReturnCode(sReturnCode);
			f.setType(FTPFile.DIRECTORY_TYPE);
		}
		LOGGER.info("## <-- MFrame.parseFTPEntry() ##");
		return f;
    }
	/**
	 * @param send
	 * @param data
	 * @return
	 * @throws Exception
	 */
	/**
	 * @param send
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static boolean callFtpMF(Send send, Map<String, String> data) throws Exception {
		LOGGER.info("## --> MFrame.callFtpMF() ##");
		boolean resp = false;
		FTPClient ftpClient = new FTPClient();
		FTPClient ftpClientJob = new FTPClient();
		try {
			ftpClient.connect(send.getServerAddress(), Integer.parseInt(send.getServerPort()));
			ftpClient.login(send.getUsername(), send.getPassword());
			//
			ftpClientJob.connect(send.getServerAddress(), Integer.parseInt(send.getServerPort()));
			ftpClientJob.login(send.getUsername(), send.getPassword());
			
			// Iniciando ciclo MF
			// Extraer archivo JOB - TRDESA.BTCH.CARDS.HOMOPRE.JDIRECT
			String rootMf = data.get("path-local");
			(new File(rootMf)).mkdirs();
			ftpClient.site("filetype=seq");
			LOGGER.info(ftpClient.getReplyString());
			
			String sRemoteFileNameJob = "'TRDESA.BTCH.CARDS.HOMOPRE.JDIRECT'";
			InputStream isJob = ftpClient.retrieveFileStream(sRemoteFileNameJob);
			LOGGER.info(ftpClient.getReplyString());
			FileUtils.copyInputStreamToFile(isJob, new File(rootMf + "JDIRECT"));
			ftpClient.completePendingCommand();
			
			// Mandar archivo JOB - JDIRECT
			ftpClient.site("filetype=jes");
			LOGGER.info(ftpClient.getReplyString());
			FileInputStream inputStream = new FileInputStream(rootMf + "JDIRECT"); 
			ftpClient.storeFile(send.getServerAddress(), inputStream);
			LOGGER.info(ftpClient.getReplyString());
			// Obtenemos nombre del job generado en MF
			String nameJob = "";
			String []nameJobSplit = ftpClient.getReplyString().split("[\\n]+");
			if(nameJobSplit.length > 1 && ftpClient.getReplyString().contains("successfully")) {
				String []lineSplit = nameJobSplit[0].split("\\ ");
				if(lineSplit.length > 1) {
					nameJob = lineSplit[lineSplit.length - 1].trim();
				} else {
					nameJob = lineSplit[0];
				}
			}
			// Validar que el JOB este en OUTPUT
			if(!nameJob.equals("")) {
				int continuarMax = 0;
				while (continuarMax < 20) {
					continuarMax++;
					//
					ftpClientJob.site("filetype=jes");
					ftpClientJob.site("jesowner=*");
					ftpClientJob.site("jesjobname=*");
					ftpClientJob.site("filetype=jes");
					FTPFile[] result = ftpClientJob.listFiles("*");
					if(result.length == 0) {
						ftpClientJob.site("filetype=jes");
						ftpClientJob.site("jesowner=*");
						ftpClientJob.site("jesjobname=*");
						result = ftpClientJob.listFiles("*");
					}
					if(result.length > 0) {
						for (int j = 0; j < result.length; j++) {
							if(("" + result[j]).contains(nameJob)) {
								JesJob jesJob = (JesJob) parseFTPEntry("" + result[j]);
								LOGGER.info("Is "	+ jesJob.getName()
									+ " jobname is "	+ jesJob.getsJobName()
									+ " class is "		+ jesJob.getsJobClass()
									+ " status is "		+ jesJob.getsStatus()
									+ " rc is "			+ jesJob.getsReturnCode()
									+ " owner [ "		+ jesJob.getsOwner()
									+ " ]");
								// validar owner
								if(jesJob.getsOwner().contains("OUTPUT")) {
									ftpClient.site("filetype=seq");
									LOGGER.info(ftpClient.getReplyString());
									String sRemoteFileLogJob = "'IGA.CDIRECT.LOG'";
									InputStream isLog = ftpClient.retrieveFileStream(sRemoteFileLogJob);
									LOGGER.info(ftpClient.getReplyString());
									FileUtils.copyInputStreamToFile(isLog, new File(rootMf + "CDIRECT-LOG.lau"));
									ftpClient.completePendingCommand();
									resp = true;
									//
									continuarMax = 20;
								}
							}
						}
					} else {
						LOGGER.info("Esperando OUTPUT");
						Thread.sleep(5000);
					}
				}
			}
			ftpClient.logout();
			ftpClient.disconnect();
			ftpClientJob.logout();
			ftpClientJob.disconnect();
		} catch (Exception e) {
			ftpClient.logout();
			ftpClient.disconnect();
			ftpClientJob.logout();
			ftpClientJob.disconnect();
			throw new Exception(e.getMessage());
		}
		LOGGER.info("## <-- MFrame.callFtpMF() ##");
		return resp;
	}
	
	public static void procesaLog(UserService userService, EmployeeGral employeeGral, String path) throws IOException {
		Path cdirectLog = Paths.get(path);
		List<String> logLines = Files.readAllLines(cdirectLog);
		List<String> logDia = adaptaFechaAsa(logLines);
		Map<String, String> logOk = new HashMap<>();
		for (String string : logDia) {
			if (!string.contains("SVTM052I")) {
				continue;
			}
			String key = string.substring(0, 47);
			String value = logOk.getOrDefault(key, "");
			value += string.substring(47);
			if (string.contains(" FROM ") || string.contains(" TO ") || string.contains(" COMPLETED ")) {
				logOk.put(key, value);
			}
		}
		logOk.forEach((t, u) -> {
			if (u.contains(" FROM ") && u.contains(" TO ") && u.contains(" COMPLETED ")) {
				if (
						(
								u.toUpperCase().matches(".+GL_[A-Z0-9]{3}_[0-9]{14}.TXT.+")
								&&
								u.contains("MF_SFTP_")
						) 
						|| 
						u.toUpperCase().matches(".+REC_[A-Z0-9]{3}_[0-9]{14}.TXT.+")
					) {
					String fileId = Utils.getJobId(u.trim(), ".");
					String tsMf = t.split("\\ ")[0];
					String status = (u.trim().split("COMPLETED")[1].trim()).split("\\/")[0];
					String action = tsMf;
					String type = u.contains("GL_") ? "GL" : u.contains("REC_") ? "REC" : "";
					String file = "";
					if(u.contains("GL_")) {
						file = u.substring(u.indexOf("GL_"), (u.indexOf("GL_")) + 25);
					} else if(u.contains("REC_")) {
						file = u.substring(u.indexOf("REC_"), (u.indexOf("REC_")) + 26);
					}
					String line = t + u;
					// Validar que no existe en BD
					if(userService.findMainFrameByFileIdAndAction(fileId, action) == null) {
						// Guardar en tabla
						MainFrame mainFrame = new MainFrame();
						mainFrame.setActive(1);
						mainFrame.setFileId(fileId);
						mainFrame.setFile(file);
						String[] datePlus = tsMf.split("\\+");
						mainFrame.setTsGl(Utils.formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
						mainFrame.setType(type);
						mainFrame.setStatus(status);
						mainFrame.setAction(action);
						mainFrame.setLine(line);
						mainFrame.setEmployeeGral(employeeGral);
						userService.saveMainFrame(mainFrame);
					}
				}
			}
		});
	}
	
	private static List<String> adaptaFechaAsa(List<String> logLines) {
		List<String> dia = new ArrayList<>();

		logLines.forEach((s) -> {
			if (s.length() >= 23 && s.substring(19, 23).equals("----")) {
				generaFecha(s);
			}

			String t = StringUtils.substringBefore(s.trim(), " ");
			if (t.contains(".")) {
				time.delete(0, time.length());
				time.append(t.replace(".", ":"));
			}

			dia.add(fecha + "+" + time + s);
		});

		return dia;
	}
	
	private static void generaFecha(String line) {
		fecha.delete(0, fecha.length());
		String tmp = StringUtils.substringBetween(line, "----").trim();
		SimpleDateFormat formatter = new SimpleDateFormat("EEEE, d MMM yyyy", Locale.ENGLISH);
		SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
		try {
			String capitalize = WordUtils.capitalizeFully(tmp);
			Date parse = formatter.parse(capitalize);
			fecha.append(myFormat.format(parse));
		} catch (ParseException ex) {
			LOGGER.info(ex.getMessage());
		}
	}
	
	// public static void main(String []args) throws Exception {
		/* Send send = new Send();
		send.setUsername("TN6EAM");
		send.setPassword("GNP11GNP");
		send.setServerAddress("150.23.1.37");
		send.setServerPort("21");
		send.setDestinationPath("");
		send.setChanel("FTP");
		Map<String, String> data = new TreeMap<String, String>();
		data.put("name", "ftpmf");
		callFtpMF(send, data);
		*/
		// String ruta = "C:\\opt\\ftp-mf\\CDIRECT-LOG.lau";
		// procesaLog(ruta);
	// }
}