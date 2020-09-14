package org.sedpi.smsblast.endpoints.sendViber;

import org.sedpi.smsblast.dto.viber.SendViberReq;
import org.sedpi.smsblast.dto.viber.SendViberReqBulk;
import org.sedpi.smsblast.dto.viber.SendViberRes;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by juliusneria on 06/06/2018.
 */
@Repository
public interface SendViberService {
    SendViberRes sendByIndividual(SendViberReq batch);
    List<SendViberRes> sendByBulk(SendViberReqBulk sendViberReqBulk);
}
