package progi.project.mojkvart.thread;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class PostThreadServiceJPA implements PostThreadService{
    @Autowired
    private PostThreadRepository postThreadRepo;

    @Override
    public List<PostThread> listAll() {
        return postThreadRepo.findAll();
    }

    @Override
    public PostThread fetch(long postThreadId) {
        return findById(postThreadId).orElseThrow(() -> new IllegalArgumentException());
    }

    @Override
    public Optional<PostThread> findById(long postThreadId) {
        Assert.notNull(postThreadId, "ID must be given");
        return postThreadRepo.findById(postThreadId);
    }

    @Override
    public PostThread createPostThread(PostThread postThread) {
        Assert.isNull(postThread.getId(), "PostThreadId must be null!");
        return postThreadRepo.save(postThread);
    }

    @Override
    public PostThread updatePostThread(PostThread postThread) {
        return postThreadRepo.save(postThread);
    }

    @Override
    public PostThread deletePostThread(PostThread postThread) {
        postThreadRepo.delete(postThread);
        return postThread;
    }
}
