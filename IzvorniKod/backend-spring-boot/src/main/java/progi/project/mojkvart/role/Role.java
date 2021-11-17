package progi.project.mojkvart.role;

import org.springframework.stereotype.Repository;
import progi.project.mojkvart.role_request.RoleRequest;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;
import java.util.List;

@Repository
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @Column(name = "role_name")
    private String roleName;

    // lazy FetchType because we don't want to immediately fetch all accounts that have the role we're fetching
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.MERGE,
                    CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "account_role",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id"))
    private List<Account> accounts;

    @OneToMany(mappedBy = "role")
    private List<RoleRequest> roleRequests;

    public Role(){

    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", roleName='" + roleName + '\'' +
                '}';
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
}
