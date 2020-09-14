package org.sedpi.smsblast.endpoints.receiver;

import org.sedpi.smsblast.common.AppProperties;
import org.sedpi.smsblast.dto.receiver.Receiver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReceiverServiceImpl implements ReceiverService{
    @Autowired
    private AppProperties appProperties;
    @Autowired
    private ReceiverRepository receiverRepository;

    @Override
    public Receiver searchByMobileNo(String mobileNo) {
        return receiverRepository.searchByMobileNo(mobileNo);
    }

    @Override
    public Receiver saveReceiver(Receiver receiver) {
        return receiverRepository.save(receiver);
    }

    @Override
    public Receiver updateReceiver(Receiver receiver) {
        receiverRepository.updateReceiver(receiver.getId(), receiver.getMobileNo(), receiver.getLocation(),
                receiver.getFirstName(), receiver.getLastName(), receiver.getMiddleName());
        return receiverRepository.findById(receiver.getId()).get();
    }
}
