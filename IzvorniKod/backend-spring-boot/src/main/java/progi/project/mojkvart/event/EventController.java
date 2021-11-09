package progi.project.mojkvart.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    EventService service;

    @GetMapping("")
    List<Event> getAllEvents() {
        return this.service.getAllEvents();
    }
}
