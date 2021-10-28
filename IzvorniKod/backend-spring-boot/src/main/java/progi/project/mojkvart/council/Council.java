package progi.project.mojkvart.council;

import progi.project.mojkvart.district.District;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;

@Entity
public class Council{

    @Id
    @GeneratedValue
    @Column(unique = true, name = "council_id")
    private Long id;

    //*veza district - council bi trebala biti slaba*
    @OneToOne
    @JoinColumn(name = "district_id")
    private District district;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
