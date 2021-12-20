package progi.project.mojkvart.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.role_request.RoleRequest;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.thread.PostThreadService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    PostService postService;
    @Autowired
    PostThreadService postThreadService;
    @Autowired
    AccountService accountService;

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

    /* id je postthread id*/
    @PostMapping("/{id}")
    public ResponseEntity<Post> createPost(@PathVariable("id")Long threadId, @RequestBody Post post) {
        if(post.getId() != null && postService.existsById(post.getId())) {
            throw new IllegalArgumentException("Post with id: " + post.getId() + " already exists");
        } else if(!post.getThreadId().equals(threadId)){
            throw new IllegalArgumentException("Post id must be preserved");
        } else if(!postThreadService.existsById(threadId)) {
            throw new IllegalArgumentException("Thread with id: "+ threadId + " doesnt exist");
        }
        else {
            Post saved = post;
            Account account = post.getAccount();
            Long accountId = account.getId();
            account = accountService.fetch(accountId);
            PostThread postThread = postThreadService.fetch(threadId);
            saved.setAccount(account);
            saved.setThread(postThread);
            saved = postService.createPost(saved, threadId);
            return ResponseEntity.created(URI.create("/posts/" + saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable("id") Long id, @RequestBody Post post) {
        if (post.getId() != null && !postService.existsById(post.getId())) {
            throw new IllegalArgumentException("Post request with id: " + post.getId() + " does not exist");
        } else if (post.getId() == null) {
            throw new IllegalArgumentException("Post id must be given");
        } else {
            if (!post.getId().equals(id))
                throw new IllegalArgumentException("Post request id must be preserved");
            Account account = post.getAccount();
            Long accountId = account.getId();
            account = accountService.fetch(accountId);
            Long threadId = post.getThreadId();
            PostThread postThread = postThreadService.fetch(threadId);
            post.setAccount(account);
            post.setThread(postThread);
            return postService.updatePost(post);
        }
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable("id") long postId) {
        if(postService.existsById(postId) == false)
            throw new IllegalArgumentException("Post with id: " + postId + " does not exist");
        postService.deletePost(postId);
    }

}
