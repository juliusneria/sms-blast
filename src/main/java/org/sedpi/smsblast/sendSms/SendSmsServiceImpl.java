package org.sedpi.smsblast.sendSms;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.sedpi.smsblast.common.AppProperties;
import org.sedpi.smsblast.sendSms.dto.sms.SendSmsReq;
import org.sedpi.smsblast.sendSms.dto.sms.SendSmsReqBulk;
import org.sedpi.smsblast.sendSms.dto.sms.SendSmsRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by juliusneria on 06/06/2018.
 */
@Service
public class SendSmsServiceImpl implements SendSmsService {

    @Autowired
    private AppProperties appProperties;

    @Override
    public SendSmsRes sendByIndividual(SendSmsReq batch) {

        Message message = Message
                .creator(new PhoneNumber(batch.getRecepientNo()), // to
                        new PhoneNumber(appProperties.getTwilio().getSenderNo()), // from
                        batch.getMessage())
                .create();

        SendSmsRes sendSmsRes = new SendSmsRes();
        sendSmsRes.setDirection(message.getDirection().toString());
        sendSmsRes.setReceiverNo(message.getTo());
        sendSmsRes.setSid(message.getSid());
        sendSmsRes.setStatus(message.getStatus().toString());

        return sendSmsRes;
    }

    @Override
    public List<SendSmsRes> sendByBulk(SendSmsReqBulk sendSmsReqBulk) {
        List<SendSmsRes> sendSmsResList = new ArrayList<>();

        for(String recipient : sendSmsReqBulk.getRecipients()){
            Message message = Message
                    .creator(new PhoneNumber(recipient), // to
                            new PhoneNumber(appProperties.getTwilio().getSenderNo()), // from
                            sendSmsReqBulk.getMessage())
                    .create();

            SendSmsRes sendSmsRes = new SendSmsRes();
            sendSmsRes.setDirection(message.getDirection().toString());
            sendSmsRes.setReceiverNo(message.getTo());
            sendSmsRes.setSid(message.getSid());
            sendSmsRes.setStatus(message.getStatus().toString());

            sendSmsResList.add(sendSmsRes);
        }
        return sendSmsResList;
    }


}
