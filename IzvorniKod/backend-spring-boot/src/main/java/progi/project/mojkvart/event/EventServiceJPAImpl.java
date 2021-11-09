package progi.project.mojkvart.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceJPAImpl implements EventService{
    @Autowired
    EventRepository repository;

    @Override
    public Optional<Event> findById(Long id) {
        Assert.notNull(id, "event id cannot be null");
        return this.repository.findById(id);
    }

    @Override
    public Event fetch(Long id) {
        return this.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    @Override
    public boolean existsById(Long id) {
        return this.repository.existsById(id);
    }

    @Override
    public List<Event> getAllEvents() {
        return this.repository.getAllEvents();
    }

    @Override
    public Event createEvent(Event event) {
        Assert.isNull(event.getId(), "event id must be null, not " + event.getId());
        return this.repository.save(event);
    }
}
