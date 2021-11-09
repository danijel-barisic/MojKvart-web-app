package progi.project.mojkvart.home;

import org.springframework.lang.NonNull;
import progi.project.mojkvart.street.Street;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.account.Account;

import java.util.List;

@Entity
@Table(name = "home")
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "home_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "street_id", table = "street")
    private Street street;

    @Column(name = "home_number", nullable = false)
    private Long number;
    
    @JsonIgnore
    @OneToMany(mappedBy = "home")
    private List<Account> accounts;
    
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

public Long getNumber() {
    return this.number;
}

public void setNumber(Long number) {
    this.number = number;
}

public List<Account> getAccounts() {
    return this.accounts;
}

public void setAccounts(List<Account> accounts) {
    this.accounts = accounts;
}

    public Street getStreet() {
        return this.street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }
}

/*CREATE TABLE home
(
  home_id INT NOT NULL,
  home_number INT NOT NULL,
  street_id INT NOT NULL,

  PRIMARY KEY (home_id),
  FOREIGN KEY (street_id) REFERENCES street(street_id)
);*/