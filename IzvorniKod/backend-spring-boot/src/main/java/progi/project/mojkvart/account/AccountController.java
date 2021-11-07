package progi.project.mojkvart.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Account> createAccount(@RequestBody Account Account) {
        if(AccountService.getEmailsFromAccounts().contains(Account.getEmail()) == true) {
            throw new IllegalArgumentException("Email: " + Account.getEmail() + " is already used");
        }
        if(Account.getId() != null && AccountService.existsById(Account.getId()) == true) {
            throw new IllegalArgumentException("Account with id: " + Account.getId() + " already exists");
        }
        else {
            Account saved = AccountService.createAccount(Account);
            return ResponseEntity.created(URI.create("/Accounts/" + saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable("id") Long id, @RequestBody Account Account) {
        if(Account.getId() != null && AccountService.existsById(Account.getId()) == false) {
            throw new IllegalArgumentException("Account with id: " + Account.getId() + " does not exist");
        }
        else if(Account.getId() == null) {
            throw new IllegalArgumentException("Account id must be given");
        }
        else {
            if(!Account.getId().equals(id))
                throw new IllegalArgumentException("Account id must be preserved");
            return AccountService.updateAccount(Account);
        }
    }

    @DeleteMapping("/{id}")
    public Account deleteAccount(@PathVariable("id") long AccountId) {
        if(AccountService.existsById(AccountId) == false)
            throw new IllegalArgumentException("Account with id: "+ AccountId + " does not exist");
        return AccountService.deleteAccount(AccountId);
    }
}
