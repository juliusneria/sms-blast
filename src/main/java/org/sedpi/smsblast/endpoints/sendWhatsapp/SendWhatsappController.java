package org.sedpi.smsblast.endpoints.sendWhatsapp;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappReq;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappReqBulk;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappRes;
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
@RequestMapping(path="/sendWhatsapp")
public class SendWhatsappController {

    private static Logger logger = LoggingUtil.getAppLogger(SendWhatsappController.class);

    @Autowired
    SendWhatsappService sendWhatsappService;

    @PostMapping(path="/sendByIndividual")
    public SendWhatsappRes sendByIndividual(@RequestBody SendWhatsappReq sendWhatsappReq){
        return sendWhatsappService.sendByIndividual(sendWhatsappReq);
    }

    @PostMapping(path="/sendByBulk")
    public List<SendWhatsappRes> sendByBulk(@RequestBody SendWhatsappReqBulk sendWhatsappReqBulk){
        return sendWhatsappService.sendByBulk(sendWhatsappReqBulk);
    }

}
