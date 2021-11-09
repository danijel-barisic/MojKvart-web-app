package progi.project.mojkvart.event;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(name = "event_name")
    private String name;

    @Column(name = "event_datetime")
    private LocalDateTime dateTime;

    @Column(name = "event_description", length = 5000)
    private String description;

    @Column(name = "event_location")
    private String location;

    @Column(name = "event_duration")
    private Duration duration;

    @Column(name = "account_id")
    @ManyToOne
    @JoinColumn(name = "account_id", table = "account")
    private Account account;

    @Column(name = "event_status", nullable = true)
    private String status;

    public Event(){
    }

    public Event(Long id, String name, String description, Duration duration, LocalDate datetime, String location, String status, Account account) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.datetime = datetime;
        this.location = location;
        this.status = status;
        this.account = account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}


/*
CREATE TABLE event
(
  event_id INT NOT NULL,
  event_name VARCHAR(150) NOT NULL,
  event_datetime DATETIME NOT NULL,
  event_location VARCHAR(250) NOT NULL,
  event_duration INTERVAL NOT NULL,
  event_description VARCHAR(5000) NOT NULL,
  event_status VARCHAR(25),
  account_id INT NOT NULL,

  PRIMARY KEY (event_id),
  FOREIGN KEY (account_id) REFERENCES account(account_id)
);
*/
