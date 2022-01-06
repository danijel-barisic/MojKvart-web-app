package progi.project.mojkvart.account;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.home.HomeService;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role.RoleService;
import progi.project.mojkvart.security.PasswordEncoder;
import progi.project.mojkvart.street.Street;
import progi.project.mojkvart.street.StreetService;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private HomeService homeService;

    @Autowired
    private StreetService streetService;

    @GetMapping("")
    public List<Account> listAccounts() {
        return accountService.listAll();
    }

    @GetMapping("/id/{id}")
    public Account getAccount(@PathVariable("id") long id) {
        if (accountService.findById(id).isEmpty()) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return accountService.fetch(id);

    }

    @GetMapping("/{email}")
    public Account getAccount(@PathVariable("email") String email) {
        if (accountService.findByEmail(email).isEmpty()) {
            throw new IllegalArgumentException("Account with email: " + email + " does not exist");
        }
        return accountService.fetch(email);
    }

    @GetMapping("/{email}/getdistrict")
    public District getAccountDistrict(@PathVariable("email") String email) {
        if (accountService.findByEmail(email).isEmpty()) {
            throw new IllegalArgumentException("Account with email: " + email + " does not exist");
        }
        return accountService.fetch(email).getDistrict();
    }

    @GetMapping("/{id}/district")
    public District getDistrict(@PathVariable("id") long id) {
        if (!accountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return accountService.fetch(id).getDistrict();
    }

    @GetMapping("/{id}/banned")
    public boolean checkIfBanned(@PathVariable("id") Long id) {
        Account account = accountService.fetch(id);
        return account.isBlocked();
    }

    @GetMapping("/roles/{id}")
    public List<Role> getRoles(@PathVariable("id") long id) {
        if (!accountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return accountService.fetch(id).getRoles();
    }

    @PostMapping("")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        if (accountService.getEmailsFromAccounts().contains(account.getEmail())) {
            throw new IllegalArgumentException("Email: " + account.getEmail() + " is already used");
        }
        if (account.getId() != null && accountService.existsById(account.getId())) {
            throw new IllegalArgumentException("Account with id: " + account.getId() + " already exists");
        } else {
            Account saved = accountService.createAccount(account);
            return ResponseEntity.created(URI.create("/accounts/" + saved.getId())).body(saved);
        }
    }

    @PostMapping("/{id}/banned")
    public boolean setBanned(@PathVariable("id") Long id) {
        Account account = accountService.fetch(id);
        account.setBlocked(true);
        accountService.updateAccount(account);
        return account.isBlocked();
    }

    @PostMapping("/{id}/unbanned")
    public boolean setUnBanned(@PathVariable("id") Long id) {
        Account account = accountService.fetch(id);
        account.setBlocked(false);
        accountService.updateAccount(account);
        return account.isBlocked();
    }

    /*brise sve postojece i dodaje nove*/
    @PostMapping("/roles/{id}")
    public List<Role> createRoles(@PathVariable("id") long id, @RequestBody ArrayList<String> roleList) {
        Account account = accountService.fetch(id);
        if (!accountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        } else {
            List<Role> listOfRoles = new ArrayList<Role>();
            account.getRoles().clear();
            roleList.forEach(role -> {
                Role newRole = roleService.findByName(role).orElseThrow(() -> new IllegalArgumentException("No such role."));
                listOfRoles.add(newRole);
            });
            listOfRoles.forEach(role -> {
                account.getRoles().add(role);
                roleService.updateRole(role);
            });
            account.setRoles(listOfRoles);
            return account.getRoles();
        }
    }

    //json: firstName, lastName, streetId, homeNum, password
    @PutMapping("/{email}")
    public Account updateAccount(@PathVariable("email") String email, @RequestBody String json) {
        if (email == null) {
            throw new IllegalArgumentException("Account email must be given");
        }

        Account account = accountService.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Account with email: " + email + " does not exist"));

        Map<String, String> newAccountData;
        try {
            newAccountData = new ObjectMapper().readValue(json,
                    new TypeReference<Map<String, String>>() {
                    });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to process json of new account data.", e);
        }

        String newFirstName = newAccountData.get("firstName");
        if (newFirstName != null) {
            account.setFirstName(newFirstName);
        }

        String newLastName = newAccountData.get("lastName");
        if (newLastName != null) {
            account.setLastName(newLastName);
        }

        String newStreetId = newAccountData.get("streetId");
        String newHomeNum = newAccountData.get("homeNum");

        if (newStreetId != null && newHomeNum != null) {
            Street newStreet = streetService.findById(Long.parseLong(newStreetId))
                    .orElseThrow(() -> new IllegalArgumentException("No such street."));

            long homeNum = Integer.parseInt(newAccountData.get("homeNum"));
            if (homeNum < newStreet.getMinStreetNo() || homeNum > newStreet.getMaxStreetNo()) {
                throw new IllegalArgumentException("Home number is outside permitted range.");
            }

            Home home;
            Optional<Home> optHome = homeService.findByNumberAndStreetName(homeNum, newStreet.getName());
            home = optHome.orElseGet(() ->
                    homeService.createHome(new Home(homeNum, newStreet))
            );

            Street oldStreet = account.getHome().getStreet();
            if (!oldStreet.getDistrict().getId().equals(newStreet.getDistrict().getId())) {
                Optional<Role> newRole = roleService.findByName("Stanovnik");
                List<Role> tmpList = new ArrayList<>();
                tmpList.add(newRole.orElseThrow(() ->
                        new IllegalArgumentException("No such role.")));
                account.setRoles(tmpList);
            }

            account.setHome(home);
        } else if ((newStreetId == null && newHomeNum != null) || (newStreetId != null && newHomeNum == null)) {
            throw new IllegalArgumentException("Incomplete parameter list for address change," +
                    " need both streetId and homeNum.");
        }

        String newPassword = newAccountData.get("password");
        String encodedPassword;
        if (newPassword != null) {
            encodedPassword = passwordEncoder.bCryptPasswordEncoder().encode(newPassword);
            account.setPassword(encodedPassword);
        }

        return accountService.updateAccount(account);
    }

    /*dodaje na postojece novi role*/
    @PutMapping("/roles/{id}")
    public List<Role> updateRoles(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Account account = accountService.fetch(accountId);
        Role role = null;
        roleName = roleName.replace("\"", "");

        if (accountId == null) {
            throw new IllegalArgumentException("Account id must be given");
        } else if (!accountService.existsById(accountId)) {
            throw new IllegalArgumentException("Account with id: " + accountId + " does not exist");
        } else {
            role = roleService.findByName(roleName).orElseThrow(() -> new IllegalArgumentException("No such role."));
            account.getRoles().add(role);
            roleService.updateRole(role);
        }

        return account.getRoles();
    }

    @PutMapping("/grantRole/{id}")
    public Role grantRole(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Role role = null;
        roleName = roleName.replace("\"", "");

        if (accountId == null) {
            throw new IllegalArgumentException("Account id must be given");
        } else if (!accountService.existsById(accountId)) {
            throw new IllegalArgumentException("Account with id: " + accountId + " does not exist");
        } else {
            role = roleService.findByName(roleName).orElseThrow(() -> new IllegalArgumentException("No such role."));

            Account account = accountService.fetch(accountId);
            account.getRoles().add(role);
            roleService.updateRole(role);
        }
        return role;
    }

    @DeleteMapping("/{id}")
    public Account deleteAccount(@PathVariable("id") long accountId) {
        if (!accountService.existsById(accountId))
            throw new IllegalArgumentException("Account with id: " + accountId + " does not exist");
        return accountService.deleteAccount(accountId);
    }

    @DeleteMapping("/roles/{id}")
    public List<Role> deleteRole(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Account account = accountService.fetch(accountId);
        Role role = null;
        roleName = roleName.replace("\"", "");

        if (accountId == null) {
            throw new IllegalArgumentException("Account id must be given");
        } else if (!accountService.existsById(accountId)) {
            throw new IllegalArgumentException("Account with id: " + accountId + " does not exist");
        } else {
            role = roleService.findByName(roleName).orElseThrow(() -> new IllegalArgumentException("No such role."));
            account.getRoles().remove(role);
            roleService.updateRole(role);
        }

        return account.getRoles();
    }
}