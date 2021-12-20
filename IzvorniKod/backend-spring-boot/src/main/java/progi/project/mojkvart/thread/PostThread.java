package progi.project.mojkvart.thread;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.meeting.Meeting;
import progi.project.mojkvart.post.Post;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "thread")
public class PostThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thread_id")
    private Long id;

    @Column(name = "thread_name")
    private String name;

    @OneToMany(mappedBy = "thread")
    private List<Post> posts;

    @JsonIgnore
    @OneToOne(mappedBy = "postThread")
    private Meeting meeting;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public PostThread(){
    }

    public PostThread(Long id, String name, List<Post> posts, Meeting meeting, District district) {
        this.id = id;
        this.name = name;
        this.posts = posts;
        this.meeting = meeting;
        this.district = district;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
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

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
