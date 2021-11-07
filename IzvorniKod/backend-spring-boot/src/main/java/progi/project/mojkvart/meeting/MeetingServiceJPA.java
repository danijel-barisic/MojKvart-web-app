package progi.project.mojkvart.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingServiceJPA implements MeetingService{

    @Autowired
    private MeetingRepository meetingRepo;


    @Override
    public List<Meeting> listAll() {
        return meetingRepo.findAll();
    }

    @Override
    public Meeting fetch(long meetingId) {
        return findById(meetingId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<Meeting> findById(long meetingId) {
        Assert.notNull(meetingId, "Id must be given");
        return meetingRepo.findById(meetingId);
    }

    @Override
    public Meeting createMeeting(Meeting meeting) {
        Assert.isNull(meeting.getId(), "Meeting Id must be null, not: " + meeting.getId());
        return meetingRepo.save(meeting);
    }

    @Override
    public Meeting updateMeeting(Meeting meeting) {
        return meetingRepo.save(meeting);
    }

    @Override
    public Meeting deleteMeeting(long meetingId) {
        Meeting meeting = fetch(meetingId);
        meetingRepo.delete(meeting);
        return meeting;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }
}
