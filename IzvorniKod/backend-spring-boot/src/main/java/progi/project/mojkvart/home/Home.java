package progi.project.mojkvart.home;


import org.springframework.lang.NonNull;
import progi.project.mojkvart.street.Street;

import javax.persistence.*;

@Entity
@Table(name = "home")
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "home_id")
    private Long id;

    @Column(name = "home_number")
//    @NonNull
    private Long homeNumber;

    @ManyToOne
    @JoinColumn(name = "street_id", table = "street")
    private Street street;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHomeNumber() {
        return this.homeNumber;
    }

    public void setHomeNumber(Long home_number) {
        this.homeNumber = home_number;
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