package progi.project.mojkvart.thread;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.district.DistrictService;
import progi.project.mojkvart.post.Post;

import java.net.URI;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/threads")
public class PostThreadController {

    @Autowired
    PostThreadService postThreadService;
    @Autowired
    DistrictService districtService;
    @Autowired
    AccountService accountService;

    @GetMapping("")
    public List<PostThread> listPosts() {
        return postThreadService.listAll();
    }

    @GetMapping("/{id}")
    public PostThread getThread(@PathVariable("id") long id) {
        if(!postThreadService.existsById(id)) {
            throw new IllegalArgumentException("PostThread with id: " + id + " does not exist");
        }
        PostThread thread = postThreadService.fetch(id);
        List<Post> posts = thread.getPosts();
        Collections.sort(posts, new Comparator<Post>() {
            @Override
            public int compare(Post post1, Post post2) {
                return post1.getId().compareTo(post2.getId());
            }
        });
        thread.setPosts(posts);
        return thread;
    }

    @PostMapping("")
    public ResponseEntity<PostThread> createAccount(@RequestBody PostThread postThread) {
        if(postThread.getId() != null && postThreadService.existsById(postThread.getId())) {
            throw new IllegalArgumentException("PostThread with id: " + postThread.getId() + " already exists");
        }
        else {
            Long accountId = postThread.getAccount().getId();
            Long districtId = postThread.getDistrict().getId();
            PostThread saved = postThreadService.createPostThread(postThread);
            saved.setAccount(accountService.fetch(accountId));
            saved.setDistrict(districtService.fetch(districtId));
            return ResponseEntity.created(URI.create("/postThread/" + saved.getId())).body(saved);
        }
    }

    @DeleteMapping("/{id}")
    public Optional<PostThread> deletePostThread(@PathVariable("id") long postThreadId) {
        if(!postThreadService.existsById(postThreadId))
            throw new IllegalArgumentException("Account with id: "+ postThreadId + " does not exist");
        postThreadService.deletePostThread(postThreadId);
        return postThreadService.findById(postThreadId);
    }
}
