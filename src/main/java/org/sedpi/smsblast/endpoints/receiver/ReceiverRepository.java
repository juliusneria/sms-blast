package org.sedpi.smsblast.endpoints.receiver;

import org.sedpi.smsblast.dto.receiver.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ReceiverRepository extends JpaRepository<Receiver,Long> {

    @Query(value = "SELECT * FROM Receiver r WHERE r.mobile_no = ?1", nativeQuery = true)
    Receiver searchByMobileNo(String mobileNo);

    @Transactional
    @Modifying
    @Query(value = "UPDATE receiver SET " +
            "mobile_no = ?2, " +
            "location = ?3, " +
            "first_name = ?4, " +
            "last_name = ?5, " +
            "middle_name = ?6 " +
            "WHERE id = ?1", nativeQuery = true)
    void updateReceiver(Long id, String mobileNo, String location,
                            String firstname, String lastname, String middlename);
}
