package progi.project.mojkvart.event;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDate;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue
    @Column(name = "event_id")
    private Long id;

    @Column(name = "event_name")
    private String name;

    @Column(name = "event_description")
    private String description;

    @Column(name = "event_duration")
    private Duration duration;

    @Column(name = "event_datetime")
    private LocalDate datetime;

    @Column(name = "event_location")
    private String location;

    @Column(name = "event_status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account accounts;

    public Event(){
    }

    public Event(Long id, String name, String description, Duration duration, LocalDate datetime, String location, String status, Account accounts) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.datetime = datetime;
        this.location = location;
        this.status = status;
        this.accounts = accounts;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public LocalDate getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDate datetime) {
        this.datetime = datetime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Account getAccounts() {
        return accounts;
    }

    public void setAccounts(Account accounts) {
        this.accounts = accounts;
    }

}
