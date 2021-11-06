package progi.project.mojkvart.street;

import progi.project.mojkvart.district.District;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;

@Entity
@Table(name = "street")
public class Street {

    @Id
    @GeneratedValue
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

    public Street() {}

    public Street(String name, Integer minStreetNo, Integer maxStreetNo) {
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
