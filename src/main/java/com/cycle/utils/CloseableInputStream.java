package com.cycle.utils;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.Session;

public class CloseableInputStream extends BufferedInputStream {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CloseableInputStream.class);
	
	Session session;
	ChannelSftp sftp;
	boolean closeSession = true;

	public CloseableInputStream(InputStream is, Session session, ChannelSftp sftp, boolean closeSession) {
		super(is);
		this.session = session;
		this.sftp = sftp;
		this.closeSession = closeSession;
	}

	@Override
	public void close() throws IOException {
		if (closeSession) {
			try {
				super.close();
			} catch (Exception ex) {
				LOGGER.debug("", ex);
			} finally {
				this.close();
			}
			super.close();
		}
	}
}