package org.sedpi.smsblast.endpoints.sendViber;

import com.google.gson.Gson;
import okhttp3.*;
import org.apache.logging.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.sedpi.smsblast.common.AppProperties;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.common.MessageRequest;
import org.sedpi.smsblast.dto.viber.SendViberReq;
import org.sedpi.smsblast.dto.viber.SendViberReqBulk;
import org.sedpi.smsblast.dto.viber.SendViberRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by juliusneria on 06/06/2018.
 */
@Service
public class SendViberServiceImpl implements SendViberService {
    private static Logger logger = LoggingUtil.getAppLogger(SendViberServiceImpl.class);

    @Autowired
    private AppProperties appProperties;

    @Override
    public SendViberRes sendByIndividual(SendViberReq batch) {
        SendViberRes sendViberRes = new SendViberRes();
        Gson gson = new Gson();
        try {
            OkHttpClient client = new OkHttpClient().newBuilder().build();
            MediaType mediaType = MediaType.parse("application/json");
            String encoding = Base64.getEncoder()
                    .encodeToString((appProperties.getVonageUser()+":"+appProperties.getVonagePassword())
                            .getBytes(StandardCharsets.UTF_8));

            Response response = sendViber(appProperties.getVonageViberType(), appProperties.getVonageViberId(),
                    batch.getRecepientNo().replaceAll("\\+", ""), appProperties.getVonageContentType(),
                    batch.getMessage(), mediaType, encoding, client);

            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(Objects.requireNonNull(response.body()).string());

            String patternString = "\\b(uuid:){0,1}\\s*([a-f0-9\\\\-]*){1}\\s*";

            Pattern pattern = Pattern.compile(patternString);

            Matcher matcher = pattern.matcher(json.get("message_uuid").toString());
            boolean matches = matcher.matches();

            sendViberRes.setSid(json.get("message_uuid").toString());
            sendViberRes.setReceiverNo(batch.getRecepientNo());
            sendViberRes.setStatus(matches ? "queued" : "error");
            sendViberRes.setDirection(matches ? "outbound-api" : "error");

            return sendViberRes;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return sendViberRes;
        }
    }

    @Override
    public List<SendViberRes> sendByBulk(SendViberReqBulk sendViberReqBulk) {
        List<SendViberRes> sendViberResList = new ArrayList<>();
        Gson gson = new Gson();

        try {
            OkHttpClient client = new OkHttpClient().newBuilder().build();
            MediaType mediaType = MediaType.parse("application/json");
            String encoding = Base64.getEncoder()
                    .encodeToString((appProperties.getVonageUser()+":"+appProperties.getVonagePassword())
                            .getBytes(StandardCharsets.UTF_8));

            for(String recipient : sendViberReqBulk.getRecipients()){
                SendViberRes sendViberRes = new SendViberRes();
                Response response = sendViber(appProperties.getVonageViberType(), appProperties.getVonageViberId(),
                        recipient.replaceAll("\\+", ""), appProperties.getVonageContentType(),
                        sendViberReqBulk.getMessage(), mediaType, encoding, client);


                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(Objects.requireNonNull(response.body()).string());

                logger.info("message_uuid: {}", json.get("message_uuid").toString());

                String patternString = "\\b(uuid:){0,1}\\s*([a-f0-9\\\\-]*){1}\\s*";

                Pattern pattern = Pattern.compile(patternString);

                Matcher matcher = pattern.matcher(json.get("message_uuid").toString());
                boolean matches = matcher.matches();

                sendViberRes.setSid(json.get("message_uuid").toString());
                sendViberRes.setReceiverNo(recipient);
                sendViberRes.setStatus(matches ? "queued" : "error");
                sendViberRes.setDirection(matches ? "outbound-api" : "error");

                sendViberResList.add(sendViberRes);
            }


            return sendViberResList;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return sendViberResList;
        }
    }

    public Response sendViber(String type, String fromId, String recipientNumber,
                              String contentType, String messageBody, MediaType mediaType,
                              String encoding, OkHttpClient client) throws IOException {

        Gson gson = new Gson();
        MessageRequest messageRequest = new MessageRequest();
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
                .url(appProperties.getMessageUrl())
                .method("POST", body)
                .addHeader("Content-Type", appProperties.getContentHeader())
                .addHeader("Accept", appProperties.getContentHeader())
                .addHeader("Authorization", "Basic "+encoding)
                .build();

        Response response = client.newCall(request).execute();

        return response;
    }

}
