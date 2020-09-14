package org.sedpi.smsblast.endpoints.receiver;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.dto.receiver.Receiver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/receiver")
public class ReceiverController {
    private static Logger logger = LoggingUtil.getAppLogger(ReceiverController.class);

    @Autowired
    ReceiverService receiverService;

    @GetMapping(path="/{mobileNumber}")
    public Receiver searchByMobileNo(@PathVariable String mobileNumber){
        return receiverService.searchByMobileNo(mobileNumber);
    }

    @PostMapping(path="/saveReceiver")
    public Receiver saveReceiver(@RequestBody Receiver receiver){
        return receiverService.saveReceiver(receiver);
    }

    @PutMapping(path="/updateReceiver")
    public Receiver updateReceiver(@RequestBody Receiver receiver){
        return receiverService.updateReceiver(receiver);
    }
}
