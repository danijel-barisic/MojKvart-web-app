package progi.project.mojkvart.meeting;

import progi.project.mojkvart.council.Council;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
public class Meeting {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String report;

    @OneToOne
    private PostThread postThread;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private Council council;

    @OneToMany(mappedBy = "meeting")
    private List<User> users;

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
