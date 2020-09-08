package org.sedpi.smsblast.sendSms.dto.user;
import lombok.Data;
import javax.persistence.*;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@Data
public class User{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;
    private String middleName;
    private Boolean isDisable;

    @Column(nullable = false)
    private Date createdAt;
    @Column(nullable = false)
    private Date updatedAt;

    @PrePersist
    public void onPrePersist() {
        setIsDisable(false);
        setCreatedAt(new Date());
        setUpdatedAt(new Date());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdatedAt(new Date());
    }
}
