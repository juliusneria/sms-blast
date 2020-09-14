package org.sedpi.smsblast.dto.sms;

import lombok.Data;

@Data
public class SendSmsRes {
    private String status;
    private String sid;
    private String receiverNo;
    private String direction;
}
