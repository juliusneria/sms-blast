package org.sedpi.smsblast.sendSms.object;

import lombok.Data;

@Data
public class SendSmsReq {
    private String recepientNo;
    private String message;
}
