package progi.project.mojkvart.meeting;

import java.util.List;
import java.util.Optional;

public interface MeetingService {

    List<Meeting> listAll();

    Meeting fetch(long meetingId);

    Optional<Meeting> findById(long meetingId);

    Meeting createMeeting(Meeting meeting);

    Meeting updateMeeting(Meeting meeting);

    Meeting deleteMeeting(long meetingId);

    boolean existsById(long id);
}
