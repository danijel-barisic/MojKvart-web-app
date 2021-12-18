package progi.project.mojkvart.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("")
    public List<Event> listEvents() {
        return eventService.listAll();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable("id") long id) {
        if(!eventService.existsById(id)) {
            throw new IllegalArgumentException("Event with id: " + id + " does not exist");
        }
        return eventService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        if(event.getId() != null && eventService.existsById(event.getId())) {
            throw new IllegalArgumentException("Event with id: " + event.getId() + " already exists");
        } else {
            Event saved = eventService.createEvent(event);
            return ResponseEntity.created(URI.create("/events/" + saved.getId())).body(saved);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable("id") long eventId) {
        if(eventService.existsById(eventId))
            throw new IllegalArgumentException("Event with id: " + eventId + " does not exist");
        eventService.deleteEvent(eventId);
    }
}
