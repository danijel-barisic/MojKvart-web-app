package progi.project.mojkvart.meeting;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.council.Council;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "report")
    private String report;

    @OneToOne(mappedBy = "meeting")
    private PostThread postThread;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private Council council;

    @JsonIgnore
    @OneToMany(mappedBy = "meeting")
    private List<Account> accounts;

    public Meeting(){

    }

    public Meeting(Long id, String title, String report, PostThread postThread, Council council, List<Account> accounts) {
        this.id = id;
        this.title = title;
        this.report = report;
        this.postThread = postThread;
        this.council = council;
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

    public Council getCouncil() {
        return council;
    }

    public void setCouncil(Council council) {
        this.council = council;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

}
