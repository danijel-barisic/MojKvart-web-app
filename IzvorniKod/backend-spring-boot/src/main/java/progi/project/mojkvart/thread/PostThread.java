package progi.project.mojkvart.thread;

import progi.project.mojkvart.district.District;
import progi.project.mojkvart.meeting.Meeting;
import progi.project.mojkvart.post.Post;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Thread")
public class PostThread {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "thread_name")
    private String name;

    @OneToMany
    private List<Post> posts;

    @OneToOne
    private Meeting meeting;

    @ManyToOne
    private District district;

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
