package org.sedpi.smsblast.endpoints.message;

import com.twilio.type.PhoneNumber;
import org.sedpi.smsblast.common.AppProperties;
import org.sedpi.smsblast.dto.message.Message;
import org.sedpi.smsblast.dto.sms.SendSmsReq;
import org.sedpi.smsblast.dto.sms.SendSmsReqBulk;
import org.sedpi.smsblast.dto.sms.SendSmsRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by juliusneria on 06/06/2018.
 */
@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private AppProperties appProperties;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }
}
