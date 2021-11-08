package progi.project.mojkvart.event;


import javax.persistence.*;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue
    @Column(name = "test")
    private Long id;
}
