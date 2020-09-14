package org.sedpi.smsblast.endpoints.sendWhatsapp;

import com.google.gson.Gson;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import okhttp3.*;
import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.AppProperties;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.common.MessageRequest;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappReq;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappReqBulk;
import org.sedpi.smsblast.dto.whatsapp.SendWhatsappRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/**
 * Created by juliusneria on 06/06/2018.
 */
@Service
public class SendWhatsappServiceImpl implements SendWhatsappService {
    private static Logger logger = LoggingUtil.getAppLogger(SendWhatsappServiceImpl.class);

    @Autowired
    private AppProperties appProperties;

    @Override
    public SendWhatsappRes sendByIndividual(SendWhatsappReq batch) {

        logger.info("to: {}",appProperties.getTwilio().getWhatsappTag()+batch.getRecepientNo());
        logger.info("from: {}",appProperties.getTwilio().getWhatsappTag()+appProperties.getTwilio().getWhatsappNo());

        Message message = sendMessage(appProperties.getTwilio().getWhatsappTag(),
                appProperties.getTwilio().getWhatsappNo(), batch.getRecepientNo(), batch.getMessage());

        SendWhatsappRes sendWhatsappRes = new SendWhatsappRes();
        sendWhatsappRes.setDirection(message.getDirection().toString());
        sendWhatsappRes.setReceiverNo(message.getTo());
        sendWhatsappRes.setSid(message.getSid());
        sendWhatsappRes.setStatus(message.getStatus().toString());

        return sendWhatsappRes;
    }

    @Override
    public List<SendWhatsappRes> sendByBulk(SendWhatsappReqBulk sendSmsReqBulk) {
        List<SendWhatsappRes> sendWhatsappResList = new ArrayList<>();

        for(String recipient : sendSmsReqBulk.getRecipients()){

            Message message = sendMessage(appProperties.getTwilio().getWhatsappTag(),
                    appProperties.getTwilio().getWhatsappNo(), recipient, sendSmsReqBulk.getMessage());

            SendWhatsappRes sendWhatsappRes = new SendWhatsappRes();
            sendWhatsappRes.setDirection(message.getDirection().toString());
            sendWhatsappRes.setReceiverNo(message.getTo());
            sendWhatsappRes.setSid(message.getSid());
            sendWhatsappRes.setStatus(message.getStatus().toString());

            sendWhatsappResList.add(sendWhatsappRes);
        }
        return sendWhatsappResList;
    }

    public Message sendMessage(String tag, String sender, String recipient, String bodyMessage){
        return Message
                .creator(new PhoneNumber(tag+recipient), // to
                        new PhoneNumber(tag+sender), // from
                        bodyMessage)
                .create();
    }

    public void sendWhatsapp(String type, String fromId, String recipientNumber, String contentType, String messageBody) throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        MessageRequest messageRequest = new MessageRequest();
        String encoding = Base64.getEncoder().encodeToString("b46228d4:qsMGBP8w56a9PIqc".getBytes("utf-8"));
        Gson gson = new Gson();

        MessageRequest.From from = new MessageRequest.From();
        MessageRequest.To to = new MessageRequest.To();
        MessageRequest.Message.Content content = new MessageRequest.Message.Content();
        MessageRequest.Message message = new MessageRequest.Message();
        message.setContent(content);

        from.setType(type);
        from.setId(fromId);

        to.setType(type);
        to.setNumber(recipientNumber);

        content.setText(messageBody);
        content.setType(contentType);

        messageRequest.setFrom(from);
        messageRequest.setTo(to);
        messageRequest.setMessage(message);

        RequestBody body = RequestBody.create(mediaType, gson.toJson(messageRequest));
        Request request = new Request.Builder()
                .url("https://messages-sandbox.nexmo.com/v0.1/messages")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept", "application/json")
                .addHeader("Authorization", "Basic "+encoding)
                .build();
        Response response = client.newCall(request).execute();

        response.body();
    }

}
