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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role.RoleService;
import progi.project.mojkvart.street.Street;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@RunWith(SpringRunner.class)
//@WebMvcTest(controllers = AccountController.class)
//@WebIntegrationTest
//@SpringBootTest
//@AutoConfigureMockMvc
//@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AccountControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AccountService accountService;

    @MockBean
    private RoleService roleService;

    private Home home;
    private List<Role> roles;
    private Account account;

//    @MockBean
//    private RoleService roleService;
//    @MockBean
//    private PasswordEncoder passwordEncoder;
//    @MockBean
//    private AccountDetailService accountDetailService;
//    @MockBean
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @BeforeEach
    public void init() {
        Street street = new Street(1L, "Testna ulica", 1, 5);
        street.setDistrict(new District(1L, "Testni kvart"));
        home = new Home(1L, 1L, street);

        account = new Account(1L, "John", "Doe", "johndoe@gmail.com", "pass123",
                home, null, false);
        account.setRoles(new ArrayList<>());
    }

    @Test
    public void givenAccountsList_whenGetAccountsList_ThenReturnJsonArray() throws Exception {
        List<Account> accounts = Collections.singletonList(account);

        given(accountService.listAll()).willReturn(accounts);

        mvc.perform(get("/accounts")
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].firstName").value("John"));
    }

    @Test
    public void givenEmptyAccountsList_whenGetAccountsList_thenReturnEmptyJsonArray() throws Exception {
        List<Account> accounts = Collections.emptyList();

        given(accountService.listAll()).willReturn(accounts);

        mvc.perform(get("/accounts")
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", empty()));
    }

    @Test
    public void givenEmailList_whenCreateAccountWithExistingEmail_thenCauseError400() throws Exception {
        given(accountService.getEmailsFromAccounts()).willReturn(Collections.singletonList("johndoe@gmail.com"));

        mvc.perform(post("/accounts")
                .content(new ObjectMapper()
                        .writeValueAsString(new Account("Johnny", "Doe",
                                "johndoe@gmail.com", "pass123", home, null,
                                false)
                        )
                ).contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isBadRequest());
    }

    @Test
    public void whenGrantRole_thenReturnRole() throws Exception {
        given(accountService.fetch(any(Long.class))).willReturn(account);
        given(accountService.existsById(eq(1L))).willReturn(true);
        given(roleService.findByName(any(String.class))).willReturn(java.util.Optional.of(new Role("Stanovnik")));

        mvc.perform(put("/accounts/grantRole/{id}/",1)
                .content("Stanovnik").contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Stanovnik"));
    }

}
