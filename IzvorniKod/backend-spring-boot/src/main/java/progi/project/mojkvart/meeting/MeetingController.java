package progi.project.mojkvart.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.event.Event;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/council")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @GetMapping("")
    public List<Meeting> listMeetings() {
        return meetingService.listAll();
    }

    @GetMapping("/{id}")
    public Meeting getMeeting(@PathVariable("id") long id) {
        if(!meetingService.existsById(id)) {
            throw new IllegalArgumentException("Event with id: " + id + " does not exist");
        }
        return meetingService.fetch(id);
    }

    //ne postavalja se district_id !*!*!*!
    @PostMapping("")
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        if(meeting.getId() != null && meetingService.existsById(meeting.getId())) {
            throw new IllegalArgumentException("Meeting with id: " + meeting.getId() + " already exists");
        }
        else {
            Meeting saved = meetingService.createMeeting(meeting);
            return ResponseEntity.created(URI.create("/council/" + saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public Meeting updateMeeting(@PathVariable("id") Long id, @RequestBody Meeting meeting) {
        if(meeting.getId() != null && !meetingService.existsById(meeting.getId())) {
            throw new IllegalArgumentException("Meeting with id: " + meeting.getId() + " does not exist");
        }
        else if(meeting.getId() == null) {
            throw new IllegalArgumentException("Meeting id must be given");
        }
        else {
            if(!meeting.getId().equals(id))
                throw new IllegalArgumentException("Meeting id must be preserved");
            return meetingService.updateMeeting(meeting);
        }
    }

    @DeleteMapping("/{id}")
    public Meeting deleteMeeting(@PathVariable("id") long meetingId) {
        if(!meetingService.existsById(meetingId))
            throw new IllegalArgumentException("Meeting with id: " + meetingId + " does not exist");
        return meetingService.deleteMeeting(meetingId);
    }
}
