package org.sedpi.smsblast.endpoints.user;

import org.sedpi.smsblast.dto.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT * FROM User u WHERE u.username = ?1", nativeQuery = true)
    User searchByUsername(String username);

    @Transactional
    @Modifying
    @Query(value = "UPDATE user SET " +
            "username = ?2, " +
            "password = ?3, " +
            "first_name = ?4, " +
            "last_name = ?5, " +
            "middle_name = ?6 " +
            "WHERE id = ?1", nativeQuery = true)
    void updateUserInfo(Long id, String username, String password,
                        String firstname, String lastname, String middlename);
}
