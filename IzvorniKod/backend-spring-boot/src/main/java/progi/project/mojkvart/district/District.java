package progi.project.mojkvart.district;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.meeting.Meeting;
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

    @OneToMany(mappedBy = "district")
    private List<PostThread> threads;

    @JsonIgnore
    @OneToMany(mappedBy = "district")
    private List<Meeting> meetings;

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

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }

    public List<PostThread> getThreads() {
        return threads;
    }

    public void setThreads(List<PostThread> threads) {
        this.threads = threads;
    }

    @Override
    public String toString() {
        return id + ". " + name;
    }

}
