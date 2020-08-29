package org.sedpi.smsblast.sendSms;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.sendSms.object.SendSmsReq;
import org.sedpi.smsblast.sendSms.object.SendSmsReqBulk;
import org.sedpi.smsblast.sendSms.object.SendSmsRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by juliusneria on 06/06/2018.
 */
@RestController
@RequestMapping(path="/sendSms")
public class SendSmsController {

    private static Logger logger = LoggingUtil.getAppLogger(SendSmsController.class);

    @Autowired
    SendSmsService sendSmsService;

    @PostMapping(path="/sendByIndividual")
    public SendSmsRes sendByIndividual(@RequestBody SendSmsReq sendSmsReq){
        return sendSmsService.sendByIndividual(sendSmsReq);
    }

    @PostMapping(path="/sendByBulk")
    public List<SendSmsRes> sendByBulk(@RequestBody SendSmsReqBulk sendSmsReqBulk){
        return sendSmsService.sendByBulk(sendSmsReqBulk);
    }

}
