package progi.project.mojkvart.thread;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.mojkvart.post.Post;

import java.util.List;
import java.util.Optional;

@Service
public interface PostThreadService {

    List<PostThread> listAll();

    PostThread fetch(long postThreadId);

    Optional<PostThread> findById(long postThreadId);

    PostThread createPostThread(PostThread postThread);

    PostThread updatePostThread(PostThread postThread);

    PostThread deletePostThread(PostThread postThread);

}
