package org.sedpi.smsblast.dto.whatsapp;

import lombok.Data;

@Data
public class SendWhatsappReq {
    private String recepientNo;
    private String message;
}
