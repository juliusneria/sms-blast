package org.sedpi.smsblast.dto.whatsapp;

import lombok.Data;

import java.util.List;

@Data
public class SendWhatsappReqBulk {
    private List<String> recipients;
    private String message;
}
