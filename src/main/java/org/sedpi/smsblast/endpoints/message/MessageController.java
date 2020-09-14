package org.sedpi.smsblast.endpoints.message;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.dto.message.Message;
import org.sedpi.smsblast.dto.sms.SendSmsReq;
import org.sedpi.smsblast.dto.sms.SendSmsReqBulk;
import org.sedpi.smsblast.dto.sms.SendSmsRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by juliusneria on 06/06/2018.
 */
@RestController
@RequestMapping(path="/message")
public class MessageController {

    private static Logger logger = LoggingUtil.getAppLogger(MessageController.class);

    @Autowired
    MessageService messageService;

    @PostMapping(path="/saveMessage")
    public Message sendByIndividual(@RequestBody Message message){
        return messageService.save(message);
    }

}
