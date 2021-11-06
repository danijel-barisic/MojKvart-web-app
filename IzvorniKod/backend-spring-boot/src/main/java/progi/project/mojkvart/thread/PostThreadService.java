package progi.project.mojkvart.thread;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostThreadService {

    private final PostThreadRepository postThreadRepository;

    @Autowired
    public PostThreadService(PostThreadRepository postThreadRepository){
        this.postThreadRepository = postThreadRepository;
    }
}
