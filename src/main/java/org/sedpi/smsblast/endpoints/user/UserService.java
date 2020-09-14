package org.sedpi.smsblast.endpoints.user;

import org.sedpi.smsblast.dto.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserService {
    User searchByUsername(String username);
    User saveUserInfo(User user);
    User updateUserInfo(User user);
}
