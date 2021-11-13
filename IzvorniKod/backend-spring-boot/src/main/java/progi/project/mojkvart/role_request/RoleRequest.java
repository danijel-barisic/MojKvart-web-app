package progi.project.mojkvart.role_request;

import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;

@Entity
@Table(name="role_request")
public class RoleRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_request_id")
    private Long id;

    @Column(name="role_request_status")
    private String status;

    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

    public RoleRequest() {

    }

    public RoleRequest(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "RoleRequest{" +
                "id=" + id +
                ", status='" + status + '\'' +
                '}';
    }
}
