package progi.project.mojkvart.post;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "date_time")
    private LocalDate dateTime;

    @Column(name = "reply_id", nullable = true)
    private Long replyId;

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

    @Override
    public String toString() {
        return super.toString();
    }
}