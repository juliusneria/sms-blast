package org.sedpi.smsblast.sendSms.object;

import lombok.Data;

import java.util.List;

@Data
public class SendSmsReqBulk {
    private List<String> recipients;
    private String message;
}