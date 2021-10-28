package progi.project.mojkvart.meeting;

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
    private Council council;

    @OneToMany
    private List<User> users;

}
