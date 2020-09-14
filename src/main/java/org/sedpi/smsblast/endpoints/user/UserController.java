package org.sedpi.smsblast.endpoints.user;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.dto.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/user")
public class UserController {
    private static Logger logger = LoggingUtil.getAppLogger(UserController.class);

    @Autowired
    UserService userService;

    @GetMapping(path="/{username}")
    public User searchByUsername(@PathVariable String username){
        return userService.searchByUsername(username);
    }

    @PostMapping(path="/saveUser")
    public User saveUserInfo(@RequestBody User user){
        return userService.saveUserInfo(user);
    }

    @PutMapping(path="/updateUser")
    public User updateUserInfo(@RequestBody User user){
        return userService.updateUserInfo(user);
    }
}
