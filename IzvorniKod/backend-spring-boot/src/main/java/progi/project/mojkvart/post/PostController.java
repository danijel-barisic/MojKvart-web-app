package progi.project.mojkvart.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("")
    public List<Post> listPosts() {
        return postService.listAll();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable("id") long id) {
        if(!postService.existsById(id)) {
            throw new IllegalArgumentException("Post with id: " + id + " does not exist");
        }
        return postService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        if(post.getId() != null && postService.existsById(post.getId())) {
            throw new IllegalArgumentException("Post with id: " + post.getId() + " already exists");
        } else {
            Post saved = postService.createPost(post);
            return ResponseEntity.created(URI.create("/posts/" + saved.getId())).body(saved);
        }
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable("id") long postId) {
        if(postService.existsById(postId) == false)
            throw new IllegalArgumentException("Post with id: " + postId + " does not exist");
        postService.deletePost(postId);
    }

}
