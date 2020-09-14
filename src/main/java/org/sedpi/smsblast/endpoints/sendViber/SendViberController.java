package org.sedpi.smsblast.endpoints.sendViber;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.dto.viber.SendViberReq;
import org.sedpi.smsblast.dto.viber.SendViberReqBulk;
import org.sedpi.smsblast.dto.viber.SendViberRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by juliusneria on 06/06/2018.
 */
@RestController
@RequestMapping(path="/sendViber")
public class SendViberController {

    private static Logger logger = LoggingUtil.getAppLogger(SendViberController.class);

    @Autowired
    SendViberService sendViberService;

    @PostMapping(path="/sendByIndividual")
    public SendViberRes sendByIndividual(@RequestBody SendViberReq sendViberReq){
        return sendViberService.sendByIndividual(sendViberReq);
    }

    @PostMapping(path="/sendByBulk")
    public List<SendViberRes> sendByBulk(@RequestBody SendViberReqBulk sendViberReqBulk){
        return sendViberService.sendByBulk(sendViberReqBulk);
    }

}
