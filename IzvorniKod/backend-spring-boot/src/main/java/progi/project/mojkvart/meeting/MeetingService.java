package progi.project.mojkvart.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository){
        this.meetingRepository = meetingRepository;
    }
}
