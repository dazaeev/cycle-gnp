package com.cycle.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.Vector;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.yaml.snakeyaml.Yaml;

import com.cycle.model.Bridge;
import com.cycle.model.Command;
import com.cycle.model.GcloudJobs;
import com.cycle.model.Gstorage;
import com.cycle.model.Manuals;
import com.cycle.model.Menu;
import com.cycle.model.Send;
import com.cycle.model.User;
import com.cycle.service.UserService;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;
import com.jcraft.jsch.SftpException;

import mx.com.buromc.crypto.CryptoUtils;

public class Utils implements Serializable {
	
	private static final long serialVersionUID = -130400130995981892L;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(Utils.class);
	
	/**
	 * Creacion de Menu por empleado
	 * @param listMenu
	 * @param index
	 * @return
	 */
	public static String createMenu(List<Menu> listMenu, String index) {
		String resp = (null != index && index.equals("home") ? 
					Constants.C_MENU_HEADER.replaceAll("-HOME-", "class=\"active\"") : 
						Constants.C_MENU_HEADER.replaceAll("-HOME-", "")) + "\n";
		// Administrar
		List<Menu> listAdministrar = listMenu.stream().filter(x -> "Administrar".equals(x.getMenu())).collect(Collectors.toList());
		if(!listAdministrar.isEmpty()) {
			resp += Constants.C_MENU_CONTENT.replaceAll(Constants.C_MENU_TITLE, "Administrar") +
					"\n";
		}
		for (Iterator<Menu> iterator = listAdministrar.iterator(); iterator.hasNext();) {
			Menu menu = iterator.next();
			resp += menu.getHtml() + "\n";
		}
		if(!listAdministrar.isEmpty()) {
			resp += "                        </ul>\r\n" + 
					"					</li>" +
					"\n";
		}
		
		// Extras
		List<Menu> listExtras = listMenu.stream().filter(x -> "Extras".equals(x.getMenu())).collect(Collectors.toList());
		if(!listExtras.isEmpty()) {
			resp += Constants.C_MENU_CONTENT.replaceAll(Constants.C_MENU_TITLE, "Extras") +
					"\n";
		}
		for (Iterator<Menu> iterator = listExtras.iterator(); iterator.hasNext();) {
			Menu menu = iterator.next();
			resp += menu.getHtml() + "\n";
		}
		if(!listExtras.isEmpty()) {
			resp += "                        </ul>\r\n" + 
					"					</li>" +
					"\n";
		}
		
		// Plan de carrera
		List<Menu> listPlan = listMenu.stream().filter(x -> "Plan de carrera".equals(x.getMenu())).collect(Collectors.toList());
		if(!listPlan.isEmpty()) {
			resp += Constants.C_MENU_CONTENT.replaceAll(Constants.C_MENU_TITLE, "Plan de carrera") +
					"\n";
		}
		for (Iterator<Menu> iterator = listPlan.iterator(); iterator.hasNext();) {
			Menu menu = iterator.next();
			resp += menu.getHtml() + "\n";
		}
		if(!listPlan.isEmpty()) {
			resp += "                        </ul>\r\n" + 
					"					</li>" +
					"\n";
		}
		
		// Solicitar
		List<Menu> listSolicitar = listMenu.stream().filter(x -> "Solicitar".equals(x.getMenu())).collect(Collectors.toList());
		if(!listSolicitar.isEmpty()) {
			resp += Constants.C_MENU_CONTENT.replaceAll(Constants.C_MENU_TITLE, "Solicitar") +
					"\n";
		}
		for (Iterator<Menu> iterator = listSolicitar.iterator(); iterator.hasNext();) {
			Menu menu = iterator.next();
			resp += menu.getHtml() + "\n";
		}
		if(!listSolicitar.isEmpty()) {
			resp += "                        </ul>\r\n" + 
					"					</li>" +
					"\n";
		}
		
		// Ver
		List<Menu> listVer = listMenu.stream().filter(x -> "Ver".equals(x.getMenu())).collect(Collectors.toList());
		if(!listVer.isEmpty()) {
			resp += Constants.C_MENU_CONTENT.replaceAll(Constants.C_MENU_TITLE, "Ver") +
					"\n";
		}
		for (Iterator<Menu> iterator = listVer.iterator(); iterator.hasNext();) {
			Menu menu = iterator.next();
			resp += menu.getHtml() + "\n";
		}
		if(!listVer.isEmpty()) {
			resp += "                        </ul>\r\n" + 
					"					</li>" +
					"\n";
		}
		
		return resp + Constants.C_MENU_FOOTER;
	}
	
	/**
	 * @param email
	 * @return
	 */
	public static String getMailName(String email) {
		return email.replace("@", "_").replaceAll("\\.", "_");
	}
	
	/**
	 * Convertir cadena Base64 a arrego de bytes
	 * @param base64
	 * @return
	 */
	public static byte[] convertToByte(String base64) {
		return Base64.decodeBase64(base64);
	}
	
	/**
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	private static String encodeFileToBase64Binary(String fileName) throws IOException {
	    File file = new File(fileName);
	    byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(file));
	    String valueDocument = new String(encoded, StandardCharsets.UTF_8);
	    LOGGER.info("URI Obtenida: " + fileName);
	    return valueDocument;
	}
	
	/**
	 * @param in
	 * @return
	 * @throws IOException
	 */
	private static String encodeInputStreamToBase64Binary(InputStream in) throws IOException {
		byte[] bytes = IOUtils.toByteArray(in);
		return java.util.Base64.getEncoder().encodeToString(bytes);
	}
	
	/**
	 * Crear archivo -> Bytes a File
	 * @param contentBytes
	 * @param fileName
	 * @throws IOException
	 */
	public static void convertByteToFile(byte[] contentBytes, String fileName) throws IOException {
		FileUtils.writeByteArrayToFile(new File(fileName), contentBytes);
	}
	
	/**
	 * Crear archivo -> Base64 a File
	 * @param contentBase64
	 * @param fileName
	 * @throws IOException
	 */
	public static void convertBase64ToFile(String contentBase64, String fileName) throws IOException {
		FileUtils.writeByteArrayToFile(new File(fileName), convertToByte(contentBase64));
	}
	
	/**
	 * @param source
	 * @param format
	 * @return
	 */
	public static Date formatDate(String source, String format) {
		try {
			SimpleDateFormat dateFormatCN = new SimpleDateFormat(format, Locale.ENGLISH);       
		    return dateFormatCN.parse(source);
		} catch (ParseException e) {
			return null;
		}
	}
	
	/**
	 * @param folder
	 * @return
	 */
	public static boolean createFolder(String folder) {
		File fileSystem = new File(folder);
		return fileSystem.mkdirs();
	}
	
	/**
	 * @param file
	 * @param data
	 * @param encode
	 * @throws IOException
	 */
	public static void createFile(String file, String data, String encode) throws IOException {
		Files.write(Paths.get(file), data.getBytes(encode));
	}
	
	/**
	 * @param rootFile
	 * @param nameFile
	 * @param dataFile
	 * @return
	 * @throws Exception
	 */
	public static boolean createFileEmployee(String rootFile, String nameFile, String dataFile) throws Exception {
		// Separar nombre y contenido
		String []splitName = nameFile.split("____");
		String []splitData = dataFile.split("\\,");
		convertBase64ToFile(splitData[1], rootFile + File.separator + splitName[0]);
		return true;
	}
	
	/**
	 * @param nameFile
	 * @return
	 */
	public static Map<String, String> getDocEmployee(String nameFile) {
		Map<String, String> map = new HashMap<>();
		try {
			map.put("status", "Ok");
			nameFile = nameFile.replaceAll(Constants.C_BACKSLASH, "\\" + File.separator);
			String []splitName = nameFile.split("____");
			String base64Document = encodeFileToBase64Binary(splitName[0]);
			map.put("base64Document", "data:" + splitName[1] + ";base64,"+ base64Document);
		} catch (Exception e) {
			map.put("status", "Nok");
			map.put("error", "Error: " + e.getMessage());
		}
		return map;
	}
	
	/**
	 * @param email
	 * @param nameFile
	 * @param dataFile
	 * @param rootFileSystem
	 * @param folder
	 * @return
	 */
	public static String copyFileSystem(String email, String nameFile, String dataFile, String rootFileSystem, String folder) {
		String result = "";
		try {
			createFolder(rootFileSystem + File.separator + email + File.separator + folder);
			createFileEmployee(rootFileSystem + File.separator + email + File.separator + folder, nameFile, dataFile);
			result = "Ok";
		} catch (Exception e) {
			result = e.getMessage();
		}
		return result;
	}
	
	/**
	 * @param path
	 * @return
	 */
	public static boolean removeFolder(String path) {
		try {
			FileUtils.deleteDirectory(new File(path));
			return true;
		} catch (IOException e) {
			return false;
		}
	}
	
	/**
	 * @param sftp
	 * @param filePath
	 * @return
	 * @throws SftpException
	 */
	public static boolean fileExists(ChannelSftp sftp, String filePath) throws SftpException {
        boolean found = false;
        SftpATTRS attributes = null;
        try {
            attributes = sftp.stat(filePath);
        } catch (Exception e) {
            found = false;
        }
        if (attributes != null) {
            found = true;
        }
        return found;
    }
	
	/**
	 * @param value
	 * @return
	 */
	public static boolean isProgram(String value) {
		return value.contains("010_") ||
				value.contains("AND_") ||
				value.contains("CFD_") ||
				value.contains("COB_") ||
				value.contains("Datalake_") ||
				value.contains("DWH_") ||
				value.contains("EOT_") ||
				value.contains("FAC_") ||
				value.contains("FGI_") ||
				value.contains("FID_") ||
				value.contains("Metadata_") ||
				value.contains("NAZ_") ||
				value.contains("PCH_") ||
				value.contains("TAM_") ||
				value.contains("TER_") ||
				value.contains("VID_");
	}
	
	/**
	 * @param value
	 * @return
	 */
	public static int indexProgram(String value) {
		if(value.indexOf("010_"     ) > -1) { return value.indexOf("010_"); }
		if(value.indexOf("AND_"     ) > -1) { return value.indexOf("AND_"); }
		if(value.indexOf("CFD_"     ) > -1) { return value.indexOf("CFD_"); }
		if(value.indexOf("COB_"     ) > -1) { return value.indexOf("COB_"); }
		if(value.indexOf("Datalake_") > -1) { return value.indexOf("Datalake_"); }
		if(value.indexOf("DWH_"     ) > -1) { return value.indexOf("DWH_"); }
		if(value.indexOf("EOT_"     ) > -1) { return value.indexOf("EOT_"); }
		if(value.indexOf("FAC_"     ) > -1) { return value.indexOf("FAC_"); }
		if(value.indexOf("FGI_"     ) > -1) { return value.indexOf("FGI_"); }
		if(value.indexOf("FID_"     ) > -1) { return value.indexOf("FID_"); }
		if(value.indexOf("Metadata_") > -1) { return value.indexOf("Metadata_"); }
		if(value.indexOf("NAZ_"     ) > -1) { return value.indexOf("NAZ_"); }
		if(value.indexOf("PCH_"     ) > -1) { return value.indexOf("PCH_"); }
		if(value.indexOf("TAM_"     ) > -1) { return value.indexOf("TAM_"); }
		if(value.indexOf("TER_"     ) > -1) { return value.indexOf("TER_"); }
		if(value.indexOf("VID_"     ) > -1) { return value.indexOf("VID_"); }
		return -1;
	}
	
	/**
	 * @param value
	 * @param character
	 * @return
	 */
	public static String getJobId(String value, String character) {
		String jobId = "";
		if(isProgram(value)) {
			jobId = "" + value.subSequence(indexProgram(value), value.length());
		}
		String []jobIdSplit = jobId.split("\\" + character);
		return jobIdSplit[0];
	}
	
	/**
	 * @param valueYaml
	 * @return
	 */
	@SuppressWarnings({ "deprecation", "unchecked" })
	public static Map<String, String> loadStringYaml(String valueYaml) {
		Map<String, String> ret = new HashMap<>();
		Yaml yaml = new Yaml();
		InputStream stream = null;
		try {
			stream = IOUtils.toInputStream(valueYaml);
			ret = (Map<String, String>) yaml.load(valueYaml);
			if (ret == null || ret.isEmpty()) {
				return null;
			}
		} catch (Exception e1) {
			throw new RuntimeException("Read yaml error: " + e1);
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return ret;
	}
	
	/**
	 * @param name
	 * @param userService
	 * @return
	 */
	public static Send getSend(String name, UserService userService) {
		Send send = new Send();
		send.setUsername(userService.getParameterNameAndDescription(name, "user").getValue());
		send.setPassword(userService.getParameterNameAndDescription(name, "cve").getValue());
		send.setServerAddress(userService.getParameterNameAndDescription(name, "sa").getValue());
		send.setServerPort(userService.getParameterNameAndDescription(name, "sp").getValue());
		send.setDestinationPath(userService.getParameterNameAndDescription(name, "dp").getValue());
		send.setChanel(userService.getParameterNameAndDescription(name, "ch").getValue());
		return send;
	}
	
	/**
	 * @param email
	 * @param nameFile
	 * @param rootFileSystem
	 * @param folder
	 * @return
	 */
	public static Map<String, String> viewDocEmployee(String email, String nameFile, String rootFileSystem, String folder) {
		Map<String, String> map = new HashMap<>();
		try {
			String nameFinal = rootFileSystem + File.separator + getMailName(email) + File.separator + folder + File.separator + nameFile;
			String []splitName = nameFinal.split("____");
			//
			String base64Document = encodeFileToBase64Binary(splitName[0]);
			map.put("email", getMailName(email));
			map.put("namedocument", splitName[0]);
			map.put("typedocument", splitName[1]);
			map.put("base64Document", "data:" + splitName[1] + ";base64,"+ base64Document);
			map.put("status", "Ok");
		} catch (Exception e) {
			map.put("status", "Nok");
			map.put("error", "Error: " + e.getMessage());
		}
		return map;
	}
	
	/**
	 * @param multiValueMap
	 * @param secretKeyBase64
	 * @param path
	 * @param action
	 * @param type
	 * @param send
	 * @param removeFolderTmp
	 * @param algorithm
	 * @param transformation
	 * @return
	 */
	public static Map<String, String> encriptFilesDownloadSendChanel(
				MultiValueMap<String, MultipartFile> multiValueMap,
				String secretKeyBase64, 
				String path, 
				String action, 
				String type,
				Send send,
				boolean removeFolderTmp,
				String algorithm, 
				String transformation) {
		Map<String, String> map = new HashMap<>();
		try {
			//
			String pathTmp = path + "testing-encrypt/";
			File targetFile = new File(pathTmp);
			targetFile.mkdirs();
			//
			FileOutputStream fout = new FileOutputStream(path + "test.zip");
			ZipOutputStream zout = new ZipOutputStream(fout);
			Iterator<Entry<String, List<MultipartFile>>> iter = multiValueMap.entrySet().iterator();
			while(iter.hasNext()) {
				Entry<String, List<MultipartFile>> entry = iter.next();
				LOGGER.info("Key File: " + entry.getKey());
				Iterator<MultipartFile> iterMulty = entry.getValue().iterator();
				while(iterMulty.hasNext()) {
					MultipartFile file = iterMulty.next();
					String fileName = file.getOriginalFilename();
					InputStream inputMap = file.getInputStream();
					// Encriptar archivo
					targetFile = new File(pathTmp + fileName);
					OutputStream outputStream = new FileOutputStream(targetFile);
					IOUtils.copy(inputMap, outputStream);
					outputStream.close();
				    inputMap.close();
				    //
				    File initialFileencrypt = new File(pathTmp + fileName);
				    // Invocar a encrypt
				    byte[] decodedKey = java.util.Base64.getDecoder().decode(secretKeyBase64);
					SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
					if(action.equals("e")) {
						CryptoUtils.encrypt(new String(originalKey.getEncoded()), initialFileencrypt, new File(pathTmp + fileName + action.toUpperCase()));
					} else if(action.equals("d")) {
						CryptoUtils.decrypt(new String(originalKey.getEncoded()), initialFileencrypt, new File(pathTmp + fileName + action.toUpperCase()));
					}
					// Validar tipo de envio
					if(type.equals("0")) {
						// Descargar ZIP
						InputStream targetStream = new FileInputStream(new File(pathTmp + fileName + action.toUpperCase()));
					    // 
						ZipEntry ze = new ZipEntry(fileName);
						zout.putNextEntry(ze);
						zout.write(IOUtils.toByteArray(targetStream));
						//
						targetStream.close();
					} else if(type.equals("1")) {
						// Envio por SFTP
						sendFile(send, new File(pathTmp + fileName + action.toUpperCase()), fileName);
					}
				}
			}
			// Validar tipo de envio
			if(type.equals("0")) {
				zout.closeEntry();
				zout.close();
				//
				map.put("status", "Ok");
				map.put("type", "0");
				String base64Document = encodeFileToBase64Binary(path + "test.zip");
				map.put("base64Document", "data:application/zip" + ";base64,"+ base64Document);
			} else if(type.equals("1")) {
				// Envio por SFTP
				map.put("status", "Ok");
				map.put("type", "1");
				map.put("base64Document", "");
			}
			//
		} catch (Exception e) {
			map.put("status", "Nok");
			map.put("error", "Error: " + e.getMessage());
			map.put("type", "2");
			map.put("base64Document", "");
		}
		// Eliminar carpetas temporales
		if(removeFolderTmp) {
			if(removeFolder(path)) {
				LOGGER.info("Carpeta Eliminada con exito: " + path);
			}
		}
		return map;
	}
	
	/**
	 * Envio de archivo para algun canal
	 * @param send
	 * @param file
	 * @param nameFile
	 * @throws Exception
	 */
	public static void sendFile(Send send, File file, String nameFile) throws Exception {
		Session session = null;
        ChannelSftp channelSftp = null;
        try {
        	JSch jsch = new JSch();
            session = jsch.getSession(send.getUsername(), send.getServerAddress(), Integer.parseInt(send.getServerPort()));
            session.setPassword(send.getPassword());
            //
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            //
            session.setConfig(config);
            session.connect();
            channelSftp = (ChannelSftp) session.openChannel(send.getChanel().toLowerCase());
            channelSftp.connect();
            channelSftp.cd(send.getDestinationPath());
            InputStream targetStream = new FileInputStream(file);
            channelSftp.put(targetStream, nameFile, ChannelSftp.OVERWRITE);
            //
            channelSftp.disconnect();
            session.disconnect();
            //
            LOGGER.info(""
            		+ "\n\t\tsendFile: " + file
            		+ "\n\t\thost: " + send.getServerAddress()
            		+ "\n\t\tusername: " + send.getUsername()
            		+ "\n\t\tpassword: " + "***********"
            		+ "\n\t\tport: " + send.getServerPort()
            		+ "\n\t\tdestinationPath: " + send.getDestinationPath()
            		+ "\n\t\tchanel: " + send.getChanel());
        } finally {
            if (channelSftp != null && channelSftp.isConnected()) {
                channelSftp.disconnect();
            }
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
	}
	
	/**
	 * @param send
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> listFile(Send send) throws Exception {
		List<Map<String, Object>> responseData = new LinkedList<>();
		Session session = null;
        ChannelSftp channelSftp = null;
        try {
        	JSch jsch = new JSch();
            session = jsch.getSession(send.getUsername(), send.getServerAddress(), Integer.parseInt(send.getServerPort()));
            session.setPassword(send.getPassword());
            //
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            //
            session.setConfig(config);
            session.connect();
            channelSftp = (ChannelSftp) session.openChannel(send.getChanel().toLowerCase());
            channelSftp.connect();
            channelSftp.cd(send.getDestinationPath());
            //
            Vector<?> filelist = channelSftp.ls(send.getDestinationPath());
			for (int i = 0; i < filelist.size(); i++) {
				Map<String, Object> row = new TreeMap<>();
				LsEntry entry = (LsEntry) filelist.get(i);
				if(!entry.getFilename().equals(".") && !entry.getFilename().equals("..")) {
					if(!entry.getAttrs().isDir()) {
						row.put("name", entry.getFilename());
						row.put("size", entry.getAttrs().getSize());
						row.put("date", entry.getAttrs().getAtimeString());
						responseData.add(row);
					}
				}
			}
            //
            channelSftp.disconnect();
            session.disconnect();
            //
            LOGGER.info(""
            		+ "\n\t\thost: " + send.getServerAddress()
            		+ "\n\t\tusername: " + send.getUsername()
            		+ "\n\t\tpassword: " + "***********"
            		+ "\n\t\tport: " + send.getServerPort()
            		+ "\n\t\tdestinationPath: " + send.getDestinationPath()
            		+ "\n\t\tchanel: " + send.getChanel());
        } finally {
            if (channelSftp != null && channelSftp.isConnected()) {
                channelSftp.disconnect();
            }
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
        return responseData;
	}
	
	/**
	 * @param send
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> listFileFtp(Send send, Map<String, String> data) throws Exception {
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			FTPClient ftpClient = new FTPClient();
			ftpClient.connect(send.getServerAddress(), Integer.parseInt(send.getServerPort()));
			ftpClient.login(send.getUsername(), send.getPassword());

			// lists files and directories in the current working directory
			FTPFile[] files = ftpClient.listFiles(send.getDestinationPath() + "/" + data.get("folder"));

			// iterates over the files and prints details for each
			DateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			for (FTPFile file : files) {
				Map<String, Object> row = new TreeMap<>();
				String details = file.getName();
				if (file.isDirectory()) {
					details = "[" + details + "]";
					details += "\t\t" + file.getSize();
					details += "\t\t" + dateFormater.format(file.getTimestamp().getTime());
				} else {
					row.put("name", details);
					row.put("size", file.getSize());
					row.put("date", dateFormater.format(file.getTimestamp().getTime()));
					responseData.add(row);
				}
			}
			ftpClient.logout();
			ftpClient.disconnect();
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return responseData;
	}
	
	/**
	 * @param send
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> getFileFtp(Send send, Map<String, String> data) throws Exception {
		LOGGER.info("data.get(\"name\"): " + data.get("name"));
		List<Map<String, Object>> responseData = new LinkedList<>();
		try {
			FTPClient ftpClient = new FTPClient();
			ftpClient.connect(send.getServerAddress(), Integer.parseInt(send.getServerPort()));
			ftpClient.login(send.getUsername(), send.getPassword());
			ftpClient.enterLocalPassiveMode();
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
			//
			String remoteFile = send.getDestinationPath() + data.get("folder") + "/" + data.get("name");
			InputStream inputStream = ftpClient.retrieveFileStream(remoteFile);
			String base64File = encodeInputStreamToBase64Binary(inputStream);
			Map<String, Object> row = new TreeMap<>();
			row.put("base64Document", base64File);
			row.put("status", "Ok");
			row.put("name", data.get("name"));
			responseData.add(row);
			//
			ftpClient.logout();
			ftpClient.disconnect();
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return responseData;
	}
	
	/**
	 * @param send
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> getFileSftp(Send send, Map<String, String> data) throws Exception {
		LOGGER.info("data.get(\"name\"): " + data.get("name"));
		List<Map<String, Object>> responseData = new LinkedList<>();
		Session session = null;
        ChannelSftp channelSftp = null;
        try {
        	JSch jsch = new JSch();
            session = jsch.getSession(send.getUsername(), send.getServerAddress(), Integer.parseInt(send.getServerPort()));
            session.setPassword(send.getPassword());
            //
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            //
            session.setConfig(config);
            session.connect();
            channelSftp = (ChannelSftp) session.openChannel(send.getChanel().toLowerCase());
            channelSftp.connect();
            channelSftp.cd(send.getDestinationPath());
            // -----------
            if (!fileExists(channelSftp, send.getDestinationPath() + "/" + data.get("name"))) {
				throw new Exception("Could not find endpoint " + send.getDestinationPath() + "/" + data.get("name") + " that was configured as MUST EXIST");
            }
            InputStream inputStream = new CloseableInputStream(channelSftp.get(send.getDestinationPath() + "/" + data.get("name")), session, channelSftp, true);
            String base64File = encodeInputStreamToBase64Binary(inputStream);
			Map<String, Object> row = new TreeMap<>();
			row.put("base64Document", base64File);
			row.put("status", "Ok");
			row.put("name", data.get("name"));
			responseData.add(row);
            // -----------
            channelSftp.disconnect();
            session.disconnect();
            //
            LOGGER.info(""
            		+ "\n\t\thost: " + send.getServerAddress()
            		+ "\n\t\tusername: " + send.getUsername()
            		+ "\n\t\tpassword: " + "***********"
            		+ "\n\t\tport: " + send.getServerPort()
            		+ "\n\t\tdestinationPath: " + send.getDestinationPath()
            		+ "\n\t\tchanel: " + send.getChanel());
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} finally {
	        if (channelSftp != null && channelSftp.isConnected()) {
	            channelSftp.disconnect();
	        }
	        if (session != null && session.isConnected()) {
	            session.disconnect();
	        }
	    }
		return responseData;
	}
	
	/**
	 * @param send
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> callSftp(Send send, Map<String, String> data) throws Exception {
		LOGGER.info("data.get(\"name\"): " + data.get("name"));
		List<Map<String, Object>> responseData = new LinkedList<>();
		Session session = null;
        Channel channel = null;
        try {
        	JSch jsch = new JSch();
            session = jsch.getSession(send.getUsername(), send.getServerAddress(), Integer.parseInt(send.getServerPort()));
            session.setPassword(send.getPassword());
            //
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            //
            session.setConfig(config);
            session.connect();
            channel = session.openChannel("exec");
            ((ChannelExec)channel).setCommand("cd " +  send.getDestinationPath() + " && " + data.get("command"));
            channel.setInputStream(null);
            InputStreamReader in = new InputStreamReader(channel.getInputStream());
            InputStream inError = ((ChannelExec)channel).getErrStream();
            OutputStreamWriter out = new OutputStreamWriter(channel.getOutputStream());
            BufferedWriter bw = new BufferedWriter(out);
            BufferedReader br = new BufferedReader(in);
            channel.connect();
            String output = "";
            String outputAux = null;
			int exitStatus = -1;
			while ((outputAux = br.readLine()) != null) {
				bw.write(outputAux);
				System.out.println(outputAux);
				output = output + "\n" + outputAux;
				bw.flush();
				// Thread.sleep(1); // Validar si es necesario
			}
			while (true) {
				if (channel.isClosed()) {
					exitStatus = channel.getExitStatus();
					break;
				}
				try {
					Thread.sleep(50);
				} catch (Exception ex) {
					LOGGER.info(ex.getMessage());
				}
			}
			if (exitStatus != 0) {
				output = (!output.equals("") ? output + "\n--ERROR--\n" : "") + IOUtils.toString(inError, StandardCharsets.UTF_8);
	        }
			LOGGER.info("Command: {}", data.get("command"));
			LOGGER.info("Output: {}", output);
			in.close();
            out.close();
            br.close();
            bw.close();
            //
            Map<String, Object> row = new TreeMap<>();
            row.put("status", "Ok");
			row.put("name", data.get("name"));
			row.put("output", output.trim());
            row.put("exit", exitStatus);
			responseData.add(row);
			// -----------
			channel.disconnect();
            session.disconnect();
            //
            LOGGER.info(""
            		+ "\n\t\thost: " + send.getServerAddress()
            		+ "\n\t\tusername: " + send.getUsername()
            		+ "\n\t\tpassword: " + "***********"
            		+ "\n\t\tport: " + send.getServerPort()
            		+ "\n\t\tdestinationPath: " + send.getDestinationPath()
            		+ "\n\t\tchanel: " + send.getChanel());
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} finally {
	        if (channel != null && channel.isConnected()) {
	        	channel.disconnect();
	        }
	        if (session != null && session.isConnected()) {
	            session.disconnect();
	        }
	    }
		return responseData;
	}
	
	/**
	 * @param user
	 * @param userService
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, Object>> startingProcessesGcloud(User user, UserService userService)
			throws Exception {
		LOGGER.info("--> # Iniciando Ciclo [" + user.getEmail() + "] #");
		List<Map<String, Object>> responseData = new LinkedList<>();
		
		// Table bridge
		Command command = userService.findCommandByNameAndEmployeeGral("bridge", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			
			List<Bridge> listBridge = userService.findBridgeByEmployeeGral(user.getEmployee());
			userService.deleteBridgeInBatch(listBridge);
			
			Map<String, String> data = new TreeMap<>();
			data.put("name", "bridge");
			data.put("command", command.getCommand());
			
			List<Map<String, Object>> resp = callSftp(user.getSend(), data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					for (int i = 0; i < outputSplit.length; i++) {
						String[] valueSplit = outputSplit[i].split("\\|");
						if (valueSplit.length == 5) {
							String jobId = getJobId(valueSplit[4].trim(), ".");
							if (!jobId.equals("")) {
								Bridge bridge = new Bridge();
								bridge.setJobId(jobId);
								bridge.setActive(1);
								String[] datePlus = valueSplit[0].split("\\+");
								bridge.setDateTime(formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
								bridge.setNameFile(valueSplit[1]);
								bridge.setSize(valueSplit[2].trim());
								bridge.setFolder(valueSplit[3].trim());
								bridge.setFile(valueSplit[4].trim());
								bridge.setEmployeeGral(user.getEmployee());
								userService.saveBridge(bridge);
							}
						}
					}
				}
			}
		}
		// Table manuals
		command = userService.findCommandByNameAndEmployeeGral("bridge-tam", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			
			List<Manuals> listManuals = userService.findManualsByEmployeeGral(user.getEmployee());
			userService.deleteManualsInBatch(listManuals);
			
			Map<String, String> data = new TreeMap<>();
			data.put("name", "bridge-tam");
			data.put("command", command.getCommand());
			
			List<Map<String, Object>> resp = callSftp(getSend("SFTP-NECAXA", userService), data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					for (int i = 0; i < outputSplit.length; i++) {
						String[] valueSplit = outputSplit[i].split("\\|");
						if (valueSplit.length == 5) {
							String jobId = getJobId(valueSplit[4].trim(), ".");
							if (!jobId.equals("")) {
								Manuals manuals = new Manuals();
								manuals.setJobId(jobId);
								manuals.setActive(1);
								String[] datePlus = valueSplit[0].split("\\+");
								manuals.setDateTime(formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
								manuals.setNameFile(valueSplit[1]);
								manuals.setSize(valueSplit[2].trim());
								manuals.setFolder(valueSplit[3].trim());
								manuals.setFile(valueSplit[4].trim());
								manuals.setEmployeeGral(user.getEmployee());
								userService.saveManuals(manuals);
							}
						}
					}
				}
			}
		}
		// Table gstorage
		command = userService.findCommandByNameAndEmployeeGral("gstorage", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			
			List<Gstorage> listGstorage = userService.findByGstorageEmployeeGral(user.getEmployee());
			userService.deleteGstorageInBatch(listGstorage);
			
			Map<String, String> data = new TreeMap<>();
			data.put("name", "gstorage");
			data.put("command", command.getCommand());
			
			Send send = getSend("SFTP_GCLOUD", userService);
			List<Map<String, Object>> resp = callSftp(send, data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					for (int i = 0; i < outputSplit.length; i++) {

						String[] valueSplit = outputSplit[i].trim().split("  ");
						if (valueSplit.length == 3) {
							String valueString = "";
							Path path = Paths.get(valueSplit[2].trim().replaceAll("gs://", "/"), new String[0]);
							if ((path.getFileName().toString().split("\\.")).length > 1) {

								valueString = path.getFileName().toString();
								String valueFolder = "";
								String valueFolderId = "";
								if (!valueString.equals("")) {
									String[] folderSplit = valueSplit[2].trim().split("\\/");
									if (folderSplit.length > 1) {
										String auxFolder = "";
										for (int j = 0; j < folderSplit.length - 1; j++) {
											auxFolder = auxFolder + folderSplit[j] + "/";
										}
										valueFolder = auxFolder;
										valueFolderId = folderSplit[folderSplit.length - 2];
									}
								} else {
									valueFolder = valueSplit[2].trim();
								}

								String jobId = getJobId(valueFolderId, ".");
								if (!jobId.equals("")) {

									Gstorage gstorage = new Gstorage();
									gstorage.setJobId(jobId);
									gstorage.setFile(valueString);
									gstorage.setActive(1);
									String[] datePlus = valueSplit[1].trim().split("T");
									gstorage.setDateTime(formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
									gstorage.setFolder(valueFolder);
									gstorage.setNameFile(valueSplit[2].trim());
									gstorage.setSize(valueSplit[0].trim());
									gstorage.setEmployeeGral(user.getEmployee());
									userService.saveGstorage(gstorage);
								} else {
									jobId = getJobId(valueString, ".");
									if (!jobId.equals("")) {
										Gstorage gstorage = new Gstorage();
										gstorage.setJobId(jobId);
										gstorage.setFile(valueString);
										gstorage.setActive(1);
										String[] datePlus = valueSplit[1].trim().split("T");
										gstorage.setDateTime(formatDate(datePlus[0] + " " + datePlus[1], "yyyy-MM-dd HH:mm:ss"));
										gstorage.setFolder(valueFolder);
										gstorage.setNameFile(valueSplit[2].trim());
										gstorage.setSize(valueSplit[0].trim());
										gstorage.setEmployeeGral(user.getEmployee());
										userService.saveGstorage(gstorage);
									}
								}
							}
						}
					}
				}
			}
		}
		// Table gcloud_jobs
		command = userService.findCommandByNameAndEmployeeGral("gcloud-jobs-list", user.getEmployee());
		if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
			Map<String, String> data = new TreeMap<>();
			data.put("name", "gcloud-jobs-list");
			data.put("command", command.getCommand());
			
			Send send = getSend("SFTP_GCLOUD", userService);
			List<Map<String, Object>> resp = callSftp(send, data);
			if (!resp.isEmpty()) {
				Map<String, Object> respMap = resp.get(0);
				if (respMap.get("status").equals("Ok")) {
					String output = "" + respMap.get("output");
					String[] outputSplit = output.split("[\\n]+");
					LOGGER.info("--> Numero de JOB's a procesar: " + outputSplit.length);
					for (int i = 0; i < outputSplit.length; i++) {

						String nameJob = "";
						if (!outputSplit[i].contains("JOB_ID")) {
							String[] nameJobSplit = outputSplit[i].split("\\ ");
							if (nameJobSplit.length > 1) {
								nameJob = nameJobSplit[0];
							}
						}
						if (!nameJob.equals("")) {
							LOGGER.info("Procesando JOB: " + nameJob);
							if (userService.findGcloudJobsByNameJob(nameJob.trim()) == null) {

								command = userService.findCommandByNameAndEmployeeGral("gcloud-jobs-describe", user.getEmployee());
								if (command.getActive() == 1 && command.getEmployeeGral().getId() == user.getEmployee().getId()) {
									
									Map<String, String> dataDescribe = new TreeMap<>();
									dataDescribe.put("name", "gcloud-jobs-describe");
									dataDescribe.put("command", command.getCommand().replaceAll("__job-list__", nameJob));
									LOGGER.info(" --> command: " + (String) dataDescribe.get("command"));
									List<Map<String, Object>> respDescribe = callSftp(send, dataDescribe);
									if (!respDescribe.isEmpty()) {
										Map<String, Object> respDescribeMap = respDescribe.get(0);
										if (respDescribeMap.get("status").equals("Ok")) {
											String outputDescribe = "" + respDescribeMap.get("output");
											try {
												GcloudJobs gcloudJobs = new GcloudJobs();
												gcloudJobs.setActive(1);
												Map<String, String> map = loadStringYaml(outputDescribe);
												if (!map.isEmpty()) {
													Object objReference = map.get("reference");
													Map<String, String> mapPlacement = (Map<String, String>) objReference;
													if (!mapPlacement.isEmpty()) {
														System.out.println("jobId: " + (String) mapPlacement.get("jobId"));
														gcloudJobs.setNameJob(mapPlacement.get("jobId"));
													}
													Object objStatus = map.get("status");
													Map<String, String> mapStatus = (Map<String, String>) objStatus;
													if (!mapStatus.isEmpty()) {
														System.out.println("state: " + (String) mapStatus.get("state"));
														System.out.println("stateStartTime: " + (String) mapStatus.get("stateStartTime"));
														gcloudJobs.setStatusState(mapStatus.get("state"));
														gcloudJobs.setStatusStateStartTime(mapStatus.get("stateStartTime"));
													}
													Object objSparkJob = map.get("sparkJob");
													Map<String, String> mapSparkJob = (Map<String, String>) objSparkJob;
													if (!mapSparkJob.isEmpty()) {
														Object objArgs = mapSparkJob.get("args");
														ArrayList<String> arrayArgs = (ArrayList<String>) objArgs;
														System.out.println("gnp_input_files: " + ((String) arrayArgs.get(0)).split("\\/")[1]);
														System.out.println("id: " + (String) arrayArgs.get(2));
														gcloudJobs.setInputFile(((String) arrayArgs.get(0)).split("\\/")[1]);
														gcloudJobs.setIdJob(arrayArgs.get(2));
													}
												}
												String jobId = getJobId((gcloudJobs.getInputFile() != null
														&& !gcloudJobs.getInputFile().equals(""))
																? gcloudJobs.getInputFile()
																: "",
														".");
												if (!jobId.equals("")) {
													gcloudJobs.setJobId(jobId);
													gcloudJobs.setEmployeeGral(user.getEmployee());
													userService.saveGcloudJobs(gcloudJobs);
												}
											} catch (Exception e) {
												LOGGER.info("--> ERROR: " + nameJob + ": " + e.getMessage());
											}
										}
									}
								}
							} else {
								LOGGER.info("--> JOB existente en BD: " + nameJob);
							}
						}
					}
				}
			}
		}
		// Table mainframe
		Map<String, String> data = new TreeMap<String, String>();
		data.put("name", "ftpmf");
		data.put("path-local", userService.getMfFiles() + user.getId() + File.separator);
		if(MFrame.callFtpMF(getSend("FTP_MF", userService), data)) {
			// Procesar archivo LOG
			MFrame.procesaLog(userService, user.getEmployee(), data.get("path-local") + "CDIRECT-LOG.lau");
		}
		Map<String, Object> row = new TreeMap<>();
		row.put("status", "Ok");
		responseData.add(row);
		LOGGER.info("<-- # Terminando Ciclo [" + user.getEmail() + "] #");
		return responseData;
	}
}