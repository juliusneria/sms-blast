package org.sedpi.smsblast.dto.receiver;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Receiver{

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "middle_name")
    private String middleName;
    @Column(name = "mobile_no", nullable = false)
    private String mobileNo;
    @Column(name = "location", nullable = false)
    private String location;


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
