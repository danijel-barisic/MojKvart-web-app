package progi.project.mojkvart.post;

import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.user.User;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.time.LocalDate;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "date_time")
    private LocalDate dateTime;

    @Column(name = "reply_id", nullable = true)
    private Long replyId;

    @ManyToOne
    @JoinColumn(name = "thread_id")
    private PostThread thread;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public Post(){

    }

    public Post(Long id, String content, LocalDate dateTime, Long replyId, PostThread thread, User user) {
        this.id = id;
        this.content = content;
        this.dateTime = dateTime;
        this.replyId = replyId;
        this.thread = thread;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
