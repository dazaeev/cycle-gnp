package com.cycle.dto;

import org.apache.commons.net.ftp.FTPFile;

/**
 * The JesJob class extends the FTPFile class. This 
 * allows for <code>JES</code> specific information to
 * be maintained, in addition to the standard <code>FTPFile</code>
 * information.
 * <p>This allows information for the spool files such as:
 * <ul>
 * <li>job name</li>
 * <li>job id</li>
 * <li>job owner</li>
 * <li>job status</li>
 * <li>job class</li>
 * <li>job return code</li>
 * </ul>
 */
public class JesJob extends FTPFile {
 
    private static final long serialVersionUID = 6718637637159272468L;
	
    private String sJobName;
    private String sOwner;
    private String sStatus;
    private String sJobClass;
    private String sReturnCode;
    private String sNumFiles;
 
    public JesJob() {
        super();
        sJobName = "";
        sOwner = "";
        sStatus = "";
        sJobClass = "";
        sReturnCode = "";
        sNumFiles = "";
    }

	public String getsJobName() {
		return sJobName;
	}

	public void setsJobName(String sJobName) {
		this.sJobName = sJobName;
	}

	public String getsOwner() {
		return sOwner;
	}

	public void setsOwner(String sOwner) {
		this.sOwner = sOwner;
	}

	public String getsStatus() {
		return sStatus;
	}

	public void setsStatus(String sStatus) {
		this.sStatus = sStatus;
	}

	public String getsJobClass() {
		return sJobClass;
	}

	public void setsJobClass(String sJobClass) {
		this.sJobClass = sJobClass;
	}

	public String getsReturnCode() {
		return sReturnCode;
	}

	public void setsReturnCode(String sReturnCode) {
		this.sReturnCode = sReturnCode;
	}

	public String getsNumFiles() {
		return sNumFiles;
	}

	public void setsNumFiles(String sNumFiles) {
		this.sNumFiles = sNumFiles;
	}
}