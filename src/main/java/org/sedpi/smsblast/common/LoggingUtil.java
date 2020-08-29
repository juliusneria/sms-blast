package org.sedpi.smsblast.common;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoggingUtil extends LogManager {

	public static <T> Logger getAppLogger(Class<T> clazz) {
		return getLogger(clazz.getName(), "webapp-logger");
	}
	
	public static <T> Logger getJobLogger(Class<T> clazz) {
		return getLogger(clazz.getName(), "sched-job-logger");
	}
	
}
