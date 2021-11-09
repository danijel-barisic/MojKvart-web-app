package progi.project.mojkvart.event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    Optional<Event> findById(Long id);

    Event fetch(Long id);

    boolean existsById(Long id);

    List<Event> getAllEvents();

    Event createEvent(Event event);
}
