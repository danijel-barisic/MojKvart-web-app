package progi.project.mojkvart.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.event.Event;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.meeting.Meeting;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role_request.RoleRequest;
import progi.project.mojkvart.post.Post;
import progi.project.mojkvart.thread.PostThread;

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
    @ManyToMany(fetch = FetchType.EAGER)/*(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH} */
    @JoinTable(name = "account_role",
            joinColumns = @JoinColumn(name = "account_id"), // joinColumns is for THIS entity
            inverseJoinColumns = @JoinColumn(name = "role_id")) // inverse is for the OTHER entity
    private List<Role> roles;

    @OneToMany(mappedBy = "account", cascade = {CascadeType.REMOVE})
    private List<RoleRequest> roleRequests;

    @OneToMany(mappedBy = "account", cascade = {CascadeType.REMOVE})
    private List<Post> posts;

    @OneToMany(mappedBy = "account", cascade = {CascadeType.REMOVE})
    private List<PostThread> threads;

    @OneToMany(mappedBy = "account", cascade = {CascadeType.REMOVE})
    private List<Event> events;

    @OneToMany(mappedBy = "account", cascade = {CascadeType.REMOVE})
    private List<Meeting> meetings;

    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
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

    public Account(String firstName, String lastName, String email, String password, Home home,
                   List<Role> roles, boolean isAddressValid) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roles = roles;
        this.home = home;
        this.isAddressValid = isAddressValid;
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

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
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

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return !isBlocked;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
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

    public District getDistrict() {
        return home.getStreet().getDistrict();
    }

    public Home getHome() {
        return home;
    }

    public void setHome(Home home) {
        this.home = home;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", home=" + home.getId() +
                '}';
    }
}

