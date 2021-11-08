package progi.project.mojkvart.account;

import progi.project.mojkvart.event.Event;
import progi.project.mojkvart.meeting.Meeting;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role_request.RoleRequest;
import progi.project.mojkvart.post.Post;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "is_blocked", columnDefinition = "boolean default false")
    private boolean isBlocked;

    @Column(name = "is_address_valid")
    private boolean isAddressValid;

    // only CascadeType.REMOVE is left out, because we don't want to remove accounts when we remove a role
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE,
                    CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(name = "account_role",
            joinColumns = @JoinColumn(name = "account_id"), // joinColumns is for THIS entity
            inverseJoinColumns = @JoinColumn(name = "role_id")) // inverse is for the OTHER entity
    private List<Role> roles;

    @OneToMany(mappedBy = "account")
    private List<RoleRequest> roleRequests;

    @OneToMany(mappedBy = "account")
    private List<Post> posts;

    @OneToMany(mappedBy = "account")
    private List<Event> events;

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

//    @ManyToOne
//    @JoinColumn(name = "home_id")
//    private Home home;

    public Account() {

    }

    public Account(String email, String firstName, String lastName, boolean isBlocked, boolean isAddressValid) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isBlocked = isBlocked;
        this.isAddressValid = isAddressValid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }

    public boolean isAddressValid() {
        return isAddressValid;
    }

    public void setAddressValid(boolean addressValid) {
        isAddressValid = addressValid;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isBlocked=" + isBlocked +
                ", isAddressValid=" + isAddressValid +
                '}';
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}

