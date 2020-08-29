package org.sedpi.smsblast.common;

import com.twilio.Twilio;
import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.sendSms.SendSmsController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class TwilioInit {
    private static Logger logger = LoggingUtil.getAppLogger(SendSmsController.class);

    @Autowired
    private AppProperties appProperties;

    @PostConstruct
    private void postConstruct() {
        logger.info("account-sid: {}", appProperties.getTwilio().getAccountSid());
        logger.info("auth-token: {}", appProperties.getTwilio().getAuthToken());
        Twilio.init(appProperties.getTwilio().getAccountSid(), appProperties.getTwilio().getAuthToken());
    }
}
