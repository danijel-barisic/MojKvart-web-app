package progi.project.mojkvart.street;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.util.List;

@Entity
@Table(name = "street")
public class Street {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "street_id")
    private Long id;

    @Column(name = "street_name")
    private String name;

    @Column(name = "min_street_number")
    private Integer minStreetNo;

    @Column(name = "max_street_number")
    private Integer maxStreetNo;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @JsonIgnore
    @OneToMany(mappedBy = "street", cascade = {CascadeType.REMOVE})
    private List<Home> homes;

    public Street() {}

    public List<Home> getHomes() {
        return homes;
    }

    public void setHomes(List<Home> homes) {
        this.homes = homes;
    }

    public Street(String name, Integer minStreetNo, Integer maxStreetNo) {
        this.name = name;
        this.minStreetNo = minStreetNo;
        this.maxStreetNo = maxStreetNo;
    }

    public Street(Long id, String name, Integer minStreetNo, Integer maxStreetNo) {
        this.id = id;
        this.name = name;
        this.minStreetNo = minStreetNo;
        this.maxStreetNo = maxStreetNo;
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

    public Integer getMinStreetNo() {
        return minStreetNo;
    }

    public void setMinStreetNo(Integer minStreetNo) {
        this.minStreetNo = minStreetNo;
    }

    public Integer getMaxStreetNo() {
        return maxStreetNo;
    }

    public void setMaxStreetNo(Integer maxStreetNo) {
        this.maxStreetNo = maxStreetNo;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    @Override
    public String toString() {
        return id + ". " + name + " " + minStreetNo + "-" + maxStreetNo;
    }
}
