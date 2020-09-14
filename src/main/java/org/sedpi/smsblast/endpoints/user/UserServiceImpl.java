package org.sedpi.smsblast.endpoints.user;

import org.apache.logging.log4j.Logger;
import org.sedpi.smsblast.common.AppProperties;
import org.sedpi.smsblast.common.LoggingUtil;
import org.sedpi.smsblast.dto.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private static Logger logger = LoggingUtil.getAppLogger(UserServiceImpl.class);

    @Autowired
    private AppProperties appProperties;

    @Autowired
    private UserRepository userRepository;

    public UserServiceImpl(AppProperties appProperties, UserRepository userRepository) {
        this.appProperties = appProperties;
        this.userRepository = userRepository;
    }

    @Override
    public User searchByUsername(String username) {
        return userRepository.searchByUsername(username);
    }

    @Override
    public User saveUserInfo(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUserInfo(User user) {
        userRepository.updateUserInfo(user.getId(), user.getUsername(), user.getPassword(),
                user.getFirstName(), user.getLastName(), user.getMiddleName());
        return userRepository.findById(user.getId()).get();
    }
}
