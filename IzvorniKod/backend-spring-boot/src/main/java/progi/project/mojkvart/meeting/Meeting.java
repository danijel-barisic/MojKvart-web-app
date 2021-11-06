package progi.project.mojkvart.meeting;

import progi.project.mojkvart.council.Council;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private Long id;

    @Column(name = "report")
    private String report;

    @OneToOne(mappedBy = "thread")
    private PostThread postThread;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private Council council;

    @OneToMany(mappedBy = "meeting")
    private List<User> users;

    public Meeting(){

    }

    public Meeting(Long id, String report, PostThread postThread, Council council, List<User> users) {
        this.id = id;
        this.report = report;
        this.postThread = postThread;
        this.council = council;
        this.users = users;
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

}
