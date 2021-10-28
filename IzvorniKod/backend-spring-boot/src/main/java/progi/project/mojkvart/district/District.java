package progi.project.mojkvart.district;

import progi.project.mojkvart.council.Council;
import progi.project.mojkvart.street.Street;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.util.List;

@Entity
public class District {

    @Id
    @GeneratedValue
    @Column(unique = true, name = "district_id")
    private Long id;

    @Column(name = "district_name")
    private String name;

    @OneToMany(mappedBy = "district")
    private List<Street> streets;

    //*veza district - council bi trebala biti slaba*
    @OneToOne(mappedBy = "district")
    private Council council;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return id + ". " + name;
    }

}
