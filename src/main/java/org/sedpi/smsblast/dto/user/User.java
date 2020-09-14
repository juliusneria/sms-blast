package org.sedpi.smsblast.dto.user;
import lombok.Data;
import javax.persistence.*;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@Data
public class User{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "middle_name")
    private String middleName;
    @Column(name = "is_disable")
    private Boolean isDisable;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;
    @Column(name = "updated_at", nullable = false)
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
