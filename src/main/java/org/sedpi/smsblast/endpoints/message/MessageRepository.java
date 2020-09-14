package org.sedpi.smsblast.endpoints.message;

import org.sedpi.smsblast.dto.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
}
