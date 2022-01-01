package progi.project.mojkvart.account;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.home.HomeRepository;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role.RoleService;
import progi.project.mojkvart.street.Street;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleService RoleService;

    @GetMapping("")
    public List<Account> listAccounts() {
        return accountService.listAll();
    }

    @GetMapping("/id/{id}")
    public Account getAccount(@PathVariable("id") long id) {
        if(accountService.findById(id).isEmpty()) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return accountService.fillWithDummyIfAdmin(accountService.fetch(id));

    }

    @GetMapping("/{email}")
    public Account getAccount(@PathVariable("email") String email) {
        if(accountService.findByEmail(email).isEmpty()) {
            throw new IllegalArgumentException("Account with email: " + email + " does not exist");
        }
        return accountService.fillWithDummyIfAdmin(accountService.fetch(email));
    }

    @GetMapping("/{email}/getdistrict")
    public District getAccountDistrict(@PathVariable("email") String email) {
        if(accountService.findByEmail(email).isEmpty()) {
            throw new IllegalArgumentException("Account with email: " + email + " does not exist");
        }
        return accountService.fetch(email).getDistrict();
    }

    @GetMapping("/{id}/district")
    public District getDistrict(@PathVariable("id") long id) {
        if(!accountService.existsById(id)) {
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
        if(!accountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return accountService.fetch(id).getRoles();
    }

    @PostMapping("")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        if(accountService.getEmailsFromAccounts().contains(account.getEmail())) {
            throw new IllegalArgumentException("Email: " + account.getEmail() + " is already used");
        }
        if(account.getId() != null && accountService.existsById(account.getId())) {
            throw new IllegalArgumentException("Account with id: " + account.getId() + " already exists");
        }
        else {
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
        if(!accountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        } else {
            List<Role> listOfRoles = new ArrayList<Role>();
            account.getRoles().clear();
            roleList.forEach(role -> {
                Role newRole = RoleService.findByName(role).orElseThrow(() -> new IllegalArgumentException("No such role."));
                listOfRoles.add(newRole);
            });
            listOfRoles.forEach(role -> {
                account.getRoles().add(role);
                RoleService.updateRole(role);
            });
            account.setRoles(listOfRoles);
            return account.getRoles();
        }
    }

    @PutMapping("/{email}")
    public Account updateAccount(@PathVariable("email") String email, @RequestBody Account account) {
        if(account.getEmail() != null && accountService.findByEmail(account.getEmail()).isEmpty()) {
            throw new IllegalArgumentException("Account with id: " + account.getId() + " does not exist");
        }
        else if(account.getEmail() == null) {
            throw new IllegalArgumentException("Account id must be given");
        }
        else {
            if(!account.getEmail().equals(email))
                throw new IllegalArgumentException("Account id must be preserved");
            System.out.println(account);
            return accountService.updateAccount(account);
        }
    }

    /*dodaje na postojece novi role*/
    @PutMapping("/roles/{id}")
    public List<Role> updateRoles(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Account account = accountService.fetch(accountId);
        Role role = null;
        roleName = roleName.replace("\"","");

        if(accountId==null){
            throw new IllegalArgumentException("Account id must be given");
        }
        else if(!accountService.existsById(accountId)){
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        }
        else{
            role = RoleService.findByName(roleName).orElseThrow(()-> new IllegalArgumentException("No such role."));
            account.getRoles().add(role);
            RoleService.updateRole(role);
        }

        return account.getRoles();
    }

    @PutMapping("/grantRole/{id}")
    public Role grantRole(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Role role = null;
        roleName = roleName.replace("\"","");

        if(accountId==null){
            throw new IllegalArgumentException("Account id must be given");
        }
        else if(!accountService.existsById(accountId)){
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        }
        else{
            role = RoleService.findByName(roleName).orElseThrow(()-> new IllegalArgumentException("No such role."));

            Account account = accountService.fetch(accountId);
            account.getRoles().add(role);
            RoleService.updateRole(role);
        }
        return role;
    }

    @DeleteMapping("/{id}")
    public Account deleteAccount(@PathVariable("id") long accountId) {
        if(!accountService.existsById(accountId))
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        return accountService.deleteAccount(accountId);
    }

    @DeleteMapping("/roles/{id}")
    public List<Role> deleteRole(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Account account = accountService.fetch(accountId);
        Role role = null;
        roleName = roleName.replace("\"","");

        if(accountId==null){
            throw new IllegalArgumentException("Account id must be given");
        }
        else if(!accountService.existsById(accountId)){
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        }
        else{
            role = RoleService.findByName(roleName).orElseThrow(()-> new IllegalArgumentException("No such role."));
            account.getRoles().remove(role);
            RoleService.updateRole(role);
        }

        return account.getRoles();
    }
}