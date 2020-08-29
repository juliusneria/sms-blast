package org.sedpi.smsblast;

import com.twilio.Twilio;
import org.sedpi.smsblast.common.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmsBlastApplication {
	public static void main(String[] args) {
		SpringApplication.run(SmsBlastApplication.class, args);
	}
}
