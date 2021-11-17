package progi.project.mojkvart.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import progi.project.mojkvart.event.Event;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.meeting.Meeting;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role_request.RoleRequest;
import progi.project.mojkvart.post.Post;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "account")
public class Account implements UserDetails {

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

    @Column(name = "is_address_valid", columnDefinition = "boolean default true")
    private boolean isAddressValid;

    // only CascadeType.REMOVE is left out, because we don't want to remove accounts when we remove a role
    @JsonIgnore
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

    @ManyToOne
    @JoinColumn(name = "home_id")
    private Home home;

    public Account() {

    }

    public Account(String firstName, String lastName, String email, String password, List<Role> roles) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roles = roles;
    }

    public Account(String email, String password) {
        this.email = email;
        this.password = password;
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
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        }
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isBlocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
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

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", isBlocked=" + isBlocked +
                ", isAddressValid=" + isAddressValid +
                ", roles='" + getRoles() + '\'' +
                '}';
    }
}

