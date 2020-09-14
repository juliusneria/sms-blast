package org.sedpi.smsblast.dto.viber;

import lombok.Data;

import java.util.List;

@Data
public class SendViberReqBulk {
    private List<String> recipients;
    private String message;
}
