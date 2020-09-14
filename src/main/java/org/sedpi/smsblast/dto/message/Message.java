package org.sedpi.smsblast.dto.message;

import lombok.Data;
import org.sedpi.smsblast.dto.receiver.Receiver;
import org.sedpi.smsblast.dto.user.User;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Message{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @OneToOne
    private User senderDetail;
    @OneToOne
    private Receiver receiver;
    @Column(nullable = false)
    private String body;
    @Column(nullable = false)
    private String portalType;

    @Column(nullable = false)
    private Date createdAt;
    @Column(nullable = false)
    private Date updatedAt;

    @PrePersist
    public void onPrePersist() {
        setCreatedAt(new Date());
        setUpdatedAt(new Date());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdatedAt(new Date());
    }
}
