package progi.project.mojkvart.user;

import progi.project.mojkvart.event.Event;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role_request.RoleRequest;
import progi.project.mojkvart.post.Post;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "is_blocked")
    private boolean isBlocked;

    @Column(name = "is_address_valid")
    private boolean isAddressValid;

    // only CascadeType.REMOVE is left out, because we don't want to remove users when we remove a role
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE,
                    CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"), // joinColumns is for THIS entity
            inverseJoinColumns = @JoinColumn(name = "role_id")) // inverse is for the OTHER entity
    private List<Role> roles;

    @OneToMany(mappedBy = "user")
    private List<RoleRequest> roleRequests;

//    @OneToMany(mappedBy = "user")
//    private List<Event> events;

//    @ManyToOne
//    @JoinColumn(name = "home_id")
//    private Home home;

    public User() {

    }

    public User(String email, String firstName, String lastName, boolean isBlocked, boolean isAddressValid) {
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
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isBlocked=" + isBlocked +
                ", isAddressValid=" + isAddressValid +
                '}';
    }
}

