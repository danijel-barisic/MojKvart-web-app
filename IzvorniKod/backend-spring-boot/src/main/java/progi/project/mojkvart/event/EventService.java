package progi.project.mojkvart.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.district.District;

import java.util.List;


@Service
public class EventService {

    @Autowired
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    public List<Event> listAll() {
        return eventRepository.findAll();
    }

    public boolean existsById(long id) {
        return eventRepository.findById(id).isPresent();
    }

    public Event fetch(long districtId) {
        return eventRepository.findById(districtId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    public Event createEvent(Event event) {
        Assert.isNull(event.getId(), "Event ID must be null, not: " + event.getId());
        return eventRepository.save(event);
    }

    public Event deleteEvent(long eventId) {
        Event event = fetch(eventId);
        eventRepository.delete(event);
        return event;
    }
}
