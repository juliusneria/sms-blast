package org.sedpi.smsblast.common;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties
@Data
public class AppProperties {
    private Twilio twilio = new Twilio();
    private String contentHeader;
    private String messageUrl;
    private String vonageUser;
    private String vonagePassword;
    private String vonageViberType;
    private String vonageViberId;
    private String vonageContentType;

    @Data
    public static class Twilio {
        private String accountSid;
        private String authToken;
        private String senderNo;
        private String whatsappNo;
        private String whatsappTag;

        @Override
        public String toString() {
            return "Twilio{" +
                    "accountSid='" + accountSid + '\'' +
                    ", authToken='" + authToken + '\'' +
                    ", senderNo='" + senderNo + '\'' +
                    ", whatsappNo='" + whatsappNo + '\'' +
                    ", whatsappTag='" + whatsappTag + '\'' +
                    '}';
        }

    }
}
