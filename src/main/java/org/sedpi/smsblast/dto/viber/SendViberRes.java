package org.sedpi.smsblast.dto.viber;

import lombok.Data;

@Data
public class SendViberRes {
    private String status;
    private String sid;
    private String receiverNo;
    private String direction;
}
