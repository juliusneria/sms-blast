package org.sedpi.smsblast.endpoints.receiver;

import org.sedpi.smsblast.dto.receiver.Receiver;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiverService {
    Receiver searchByMobileNo(String mobileNo);
    Receiver saveReceiver(Receiver receiver);
    Receiver updateReceiver(Receiver receiver);
}
