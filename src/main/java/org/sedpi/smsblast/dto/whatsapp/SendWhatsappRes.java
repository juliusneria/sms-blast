package org.sedpi.smsblast.dto.whatsapp;

import lombok.Data;

@Data
public class SendWhatsappRes {
    private String status;
    private String sid;
    private String receiverNo;
    private String direction;
}
