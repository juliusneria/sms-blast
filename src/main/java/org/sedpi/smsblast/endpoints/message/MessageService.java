package org.sedpi.smsblast.endpoints.message;

import org.sedpi.smsblast.dto.message.Message;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by juliusneria on 06/06/2018.
 */
@Repository
public interface MessageService {
    Message save(Message message);
}
