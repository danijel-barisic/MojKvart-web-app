package progi.project.mojkvart.role_request;

import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.user.User;

import javax.persistence.*;

@Entity
@Table(name="role_request")
public class RoleRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_request_id")
    private Long id;

    @Column(name="role_request_status")
    private String roleRequestStatus;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

    public RoleRequest() {

    }

    public RoleRequest(String roleRequestStatus) {
        this.roleRequestStatus = roleRequestStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleRequestStatus() {
        return roleRequestStatus;
    }

    public void setRoleRequestStatus(String roleRequestStatus) {
        this.roleRequestStatus = roleRequestStatus;
    }

    @Override
    public String toString() {
        return "RoleRequest{" +
                "id=" + id +
                ", roleRequestStatus='" + roleRequestStatus + '\'' +
                '}';
    }
}
