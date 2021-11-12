package progi.project.mojkvart.meeting;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.thread.PostThread;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private Long id;

    @Column(name = "meeting_title")
    private String title;

    @Column(name = "meeting_report")
    private String report;

    @Column(name = "meeting_datetime")
    private LocalDate dateTime;

    @OneToOne
    @JoinColumn(name = "thread_id")
    private PostThread postThread;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @JsonIgnore
    @OneToMany(mappedBy = "meeting")
    private List<Account> accounts;

    public Meeting() {

    }

    public Meeting(Long id, String title, String report, LocalDate dateTime, PostThread postThread, District district, List<Account> accounts) {
        this.id = id;
        this.title = title;
        this.report = report;
        this.dateTime = dateTime;
        this.postThread = postThread;
        this.district = district;
        this.accounts = accounts;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public PostThread getPostThread() {
        return postThread;
    }

    public void setPostThread(PostThread postThread) {
        this.postThread = postThread;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public void setCouncil(District district) {
        this.district = district;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

}
