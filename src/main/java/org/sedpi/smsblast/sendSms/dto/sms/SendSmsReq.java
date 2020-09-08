package org.sedpi.smsblast.sendSms.dto.sms;

import lombok.Data;

@Data
public class SendSmsReq {
    private String recepientNo;
    private String message;
}
