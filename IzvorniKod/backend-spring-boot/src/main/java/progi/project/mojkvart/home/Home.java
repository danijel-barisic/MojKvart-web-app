package progi.project.mojkvart.home;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.street.Street;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "home")
public class Home {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "home_id")
    private Long id;

    @Column(name = "home_number", nullable = false)
    private Long number;

    @JsonIgnore
    @OneToMany(mappedBy = "home")
    private List<Account> accounts;

    @ManyToOne
    @JoinColumn(name = "street_id")
    private Street street;

    public Home(){

    }

    public Home(Long number, Street street) {
        this.number = number;
        this.street = street;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public Street getStreet() {
        return street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }
}
