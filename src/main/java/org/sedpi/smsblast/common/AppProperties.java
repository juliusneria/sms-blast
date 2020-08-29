package org.sedpi.smsblast.common;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties
@Data
public class AppProperties {
    private Twilio twilio = new Twilio();

    @Data
    public static class Twilio {
        private String accountSid;
        private String authToken;
        private String senderNo;

        @Override
        public String toString() {
            return "Twilio{" +
                    "accountSid='" + accountSid + '\'' +
                    ", authToken='" + authToken + '\'' +
                    ", senderNo='" + senderNo + '\'' +
                    '}';
        }

    }
}
