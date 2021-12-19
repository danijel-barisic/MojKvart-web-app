package progi.project.mojkvart.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.district.DistrictService;
import progi.project.mojkvart.event.Event;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.thread.PostThreadService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/council")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;
    @Autowired
    private PostThreadService postThreadService;
    @Autowired
    private DistrictService districtService;
    @Autowired
    private AccountService accountService;

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

    @PostMapping("")
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        if(meeting.getId() != null && meetingService.existsById(meeting.getId())) {
            throw new IllegalArgumentException("Meeting with id: " + meeting.getId() + " already exists");
        }
        else {
            Long postThreadId = meeting.getPostThread().getId();
            Long districtId = meeting.getDistrict().getId();
            Long accountId = meeting.getAccount().getId();
            PostThread postThread = postThreadService.fetch(postThreadId);
            District district = districtService.fetch(districtId);
            Account account = accountService.fetch(accountId);
            Meeting saved = meetingService.createMeeting(meeting);
            saved.setPostThread(postThread);
            saved.setDistrict(district);
            saved.setAccounts(account);
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
