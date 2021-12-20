package progi.project.mojkvart.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.event.Event;
import progi.project.mojkvart.role_request.RoleRequest;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<Post> listAll() {
        return postRepository.findAll();
    }

    public boolean existsById(long id) {
        return postRepository.findById(id).isPresent();
    }

    public Post fetch(long postId) {
        return postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    public Post createPost(Post post, Long threadId) {
        Assert.isNull(post.getId(), "Post ID must be null, not: " + post.getId());
        Post saved = post;
        saved.setThreadId(threadId);
        return postRepository.save(saved);
    }
    public Post deletePost(long postId) {
        Post post = fetch(postId);
        postRepository.delete(post);
        return post;
    }

    public Post updatePost(Post post) {
        return postRepository.save(post);
    }
}
