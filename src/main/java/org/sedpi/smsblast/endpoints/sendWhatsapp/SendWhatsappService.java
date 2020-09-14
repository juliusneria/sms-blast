package org.sedpi.smsblast.endpoints.sendWhatsapp;

import org.sedpi.smsblast.dto.whatsapp.SendWhatsappReq;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappReqBulk;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappRes;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by juliusneria on 06/06/2018.
 */
@Repository
public interface SendWhatsappService {
    SendWhatsappRes sendByIndividual(SendWhatsappReq batch);
    List<SendWhatsappRes> sendByBulk(SendWhatsappReqBulk sendSmsReqBulk);
}
