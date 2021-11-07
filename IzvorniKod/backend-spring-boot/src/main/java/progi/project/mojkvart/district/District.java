package progi.project.mojkvart.district;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.council.Council;
import progi.project.mojkvart.street.Street;
import progi.project.mojkvart.thread.PostThread;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.util.List;

@Entity
@Table(name="district")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "district_id")
    private Long id;

    @Column(name = "district_name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "district")
    private List<Street> streets;

    @OneToOne(mappedBy = "district")
    private Council council;

    @OneToMany(mappedBy = "district")
    private List<PostThread> threads;

    public District() {}

    public District(String name) {
        this.name = name;
    }

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

    public List<Street> getStreets() {
        return streets;
    }

    public void setStreets(List<Street> streets) {
        this.streets = streets;
    }

    public Council getCouncil() {
        return council;
    }

    public void setCouncil(Council council) {
        this.council = council;
    }

    @Override
    public String toString() {
        return id + ". " + name;
    }

}
