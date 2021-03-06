package org.sedpi.smsblast.endpoints.sendSms;

import org.sedpi.smsblast.dto.sms.SendSmsReq;
import org.sedpi.smsblast.dto.sms.SendSmsReqBulk;
import org.sedpi.smsblast.dto.sms.SendSmsRes;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by juliusneria on 06/06/2018.
 */
@Repository
public interface SendSmsService {
    SendSmsRes sendByIndividual(SendSmsReq batch);
    List<SendSmsRes> sendByBulk(SendSmsReqBulk sendSmsReqBulk);
}
