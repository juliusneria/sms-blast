package org.sedpi.smsblast.common;

import lombok.Data;

@Data
public class MessageRequest {

    private From from = new From();
    private To to = new To();
    private Message message = new Message();

    @Data
    public static class From {
        private String type;
        private String id;
    }

    @Data
    public static class To {
        private String type;
        private String number;
    }

    @Data
    public static class Message{
        private Content content = new Content();
        @Data
        public static class Content{
            private String type;
            private String text;
        }
    }
}
