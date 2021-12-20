package progi.project.mojkvart.account;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role.RoleService;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService AccountService;

    @Autowired
    private RoleService RoleService;

    @GetMapping("")
    public List<Account> listAccounts() {
        return AccountService.listAll();
    }

    @GetMapping("/id/{id}")
    public Account getAccount(@PathVariable("id") long id) {
        if(AccountService.findById(id).isEmpty()) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return AccountService.fetch(id);
    }

    @GetMapping("/{email}")
    public Account getAccount(@PathVariable("email") String email) {
        if(AccountService.findByEmail(email).isEmpty()) {
            throw new IllegalArgumentException("Account with email: " + email + " does not exist");
        }
        return AccountService.fetch(email);
    }

    @GetMapping("/{email}/getdistrict")
    public District getAccountDistrict(@PathVariable("email") String email) {
        if(AccountService.findByEmail(email).isEmpty()) {
            throw new IllegalArgumentException("Account with email: " + email + " does not exist");
        }
        return AccountService.fetch(email).getDistrict();
    }

    @GetMapping("/{id}/district")
    public District getDistrict(@PathVariable("id") long id) {
        if(!AccountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return AccountService.fetch(id).getDistrict();
    }

    @GetMapping("/{id}/banned")
    public boolean checkIfBanned(@PathVariable("id") Long id) {
        Account account = AccountService.fetch(id);
        return account.isBlocked();
    }

    @GetMapping("/roles/{id}")
    public List<Role> getRoles(@PathVariable("id") long id) {
        if(!AccountService.existsById(id)) {
            throw new IllegalArgumentException("Account with id: " + id + " does not exist");
        }
        return AccountService.fetch(id).getRoles();
    }

    @PostMapping("")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        if(AccountService.getEmailsFromAccounts().contains(account.getEmail())) {
            throw new IllegalArgumentException("Email: " + account.getEmail() + " is already used");
        }
        if(account.getId() != null && AccountService.existsById(account.getId())) {
            throw new IllegalArgumentException("Account with id: " + account.getId() + " already exists");
        }
        else {
            Account saved = AccountService.createAccount(account);
            return ResponseEntity.created(URI.create("/accounts/" + saved.getId())).body(saved);
        }
    }

    @PostMapping("/{id}/banned")
    public boolean setBanned(@PathVariable("id") Long id) {
        Account account = AccountService.fetch(id);
        account.setBlocked(true);
        AccountService.updateAccount(account);
        return account.isBlocked();
    }

    @PostMapping("/{id}/unbanned")
    public boolean setUnBanned(@PathVariable("id") Long id) {
        Account account = AccountService.fetch(id);
        account.setBlocked(false);
        AccountService.updateAccount(account);
        return account.isBlocked();
    }

    @PostMapping("/roles/{id}")
    public List<Role> createRoles(@PathVariable("id") long id, @RequestBody ArrayList<String> roleList) {
        Account account = AccountService.fetch(id);
        if(!AccountService.existsById(id)) {
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

    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable("id") Long id, @RequestBody Account account) {
        if(account.getId() != null && !AccountService.existsById(account.getId())) {
            throw new IllegalArgumentException("Account with id: " + account.getId() + " does not exist");
        }
        else if(account.getId() == null) {
            throw new IllegalArgumentException("Account id must be given");
        }
        else {
            if(!account.getId().equals(id))
                throw new IllegalArgumentException("Account id must be preserved");
            return AccountService.updateAccount(account);
        }
    }

    @PutMapping("/roles/{id}")
    public List<Role> updateRoles(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Account account = AccountService.fetch(accountId);
        Role role = null;
        roleName = roleName.replace("\"","");

        if(accountId==null){
            throw new IllegalArgumentException("Account id must be given");
        }
        else if(!AccountService.existsById(accountId)){
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
        else if(!AccountService.existsById(accountId)){
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        }
        else{
            role = RoleService.findByName(roleName).orElseThrow(()-> new IllegalArgumentException("No such role."));

            Account account = AccountService.fetch(accountId);
            account.getRoles().add(role);
            RoleService.updateRole(role);
        }
        return role;
    }

    @DeleteMapping("/{id}")
    public Account deleteAccount(@PathVariable("id") long accountId) {
        if(!AccountService.existsById(accountId))
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        return AccountService.deleteAccount(accountId);
    }

    @DeleteMapping("/roles/{id}")
    public List<Role> deleteRole(@PathVariable("id") Long accountId, @RequestBody String roleName) {
        Account account = AccountService.fetch(accountId);
        Role role = null;
        roleName = roleName.replace("\"","");

        if(accountId==null){
            throw new IllegalArgumentException("Account id must be given");
        }
        else if(!AccountService.existsById(accountId)){
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