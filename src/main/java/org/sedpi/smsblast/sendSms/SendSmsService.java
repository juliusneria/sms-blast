package org.sedpi.smsblast.sendSms;

import org.sedpi.smsblast.sendSms.object.SendSmsReq;
import org.sedpi.smsblast.sendSms.object.SendSmsReqBulk;
import org.sedpi.smsblast.sendSms.object.SendSmsRes;
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
