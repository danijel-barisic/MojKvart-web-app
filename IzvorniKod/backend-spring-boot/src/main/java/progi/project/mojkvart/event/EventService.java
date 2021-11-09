package progi.project.mojkvart.event;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    Optional<Event> findById(Long id);

    Event fetch(Long id);

    boolean existsById(Long id);

    List<Event> getAllEvents();

    Event createEvent(Event event);
}
