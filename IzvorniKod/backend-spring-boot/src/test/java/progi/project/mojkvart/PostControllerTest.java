package progi.project.mojkvart;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.post.Post;
import progi.project.mojkvart.post.PostService;
import progi.project.mojkvart.street.Street;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.thread.PostThreadService;

import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PostControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PostService postService;

    @MockBean
    private PostThreadService postThreadService;

    @MockBean
    private AccountService accountService;

    private PostThread postThread;

    private Home home;
    private Account account;
    private Post post;

    @BeforeEach
    public void init() {
        District district = new District(1L, "Testni kvart");
        Street street = new Street(1L, "Testna ulica", 1, 5);
        street.setDistrict(district);
        home = new Home(1L, 1L, street);

        account = new Account(1L, "John", "Doe", "johndoe@gmail.com", "pass123",
                home, null, false);

        postThread = new PostThread(1L, "Example", new ArrayList<>(), null, district);

        post = new Post(1L, "First post",
                null,
                null, postThread, account);

        post.setThreadId(postThread.getId());

//        postThread.getPosts().add(post);
    }

    @Test
    public void givenPost_whenCreatePost_thenReturnPostAsJson() throws Exception {
        Post post2 = new Post(2L, "Second post",
                null,
                null, postThread, account);

//        postThread.getPosts().add(post);

        post2.setThreadId(postThread.getId()); //Is it necessary? there's same command in controller POST
        given(accountService.fetch(any(Long.class))).willReturn(account);
        given(postService.createPost(any(Post.class), eq(postThread.getId()))).willReturn(post2);
        given(postService.existsById(eq(post2.getId()))).willReturn(false);
        given(postThreadService.existsById(eq(postThread.getId()))).willReturn(true);

        mvc.perform(post("/posts/{id}",1)
                .content(new ObjectMapper().writeValueAsString(post2))
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.content").value("Second post"));
    }

    @Test
    public void givenNonexistentPostId_whenGetPost_thenCauseError400() throws Exception {
        given(postService.existsById(any(Long.class))).willReturn(false);

        mvc.perform(get("/posts/{id}",5)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isBadRequest());
    }

}
