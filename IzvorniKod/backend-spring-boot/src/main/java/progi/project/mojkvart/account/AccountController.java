package progi.project.mojkvart.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService AccountService;

    @GetMapping("")
    public List<Account> listAccounts() {
        return AccountService.listAll();
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

    @DeleteMapping("/{id}")
    public Account deleteAccount(@PathVariable("id") long accountId) {
        if(!AccountService.existsById(accountId))
            throw new IllegalArgumentException("Account with id: "+ accountId + " does not exist");
        return AccountService.deleteAccount(accountId);
    }
}
