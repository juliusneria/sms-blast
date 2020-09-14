package org.sedpi.smsblast.dto.viber;

import lombok.Data;

@Data
public class SendViberReq {
    private String recepientNo;
    private String message;
}
