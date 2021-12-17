package progi.project.mojkvart.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceJPAImpl implements AccountService{

    @Autowired
    private AccountRepository accountRepo;

    @Override
    public List<Account> listAll() {
        return accountRepo.findAll();
    }

    @Override
    public Account fetch(long accountId) {
        return findById(accountId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Account fetch(String email) {
        return findByEmail(email).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<Account> findById(long accountId) {
        Assert.notNull(accountId, "ID must be given");
        return accountRepo.findById(accountId);
    }

    @Override
    public Account createAccount(Account account) {
        Assert.isNull(account.getId(),
                "Account ID must be null, not: " + account.getId()
        );
        return accountRepo.save(account);
    }

    @Override
    public Account updateAccount(Account account) {
        return accountRepo.save(account);
    }

    @Override
    public Account deleteAccount(long accountId) {
        Account account = fetch(accountId);
        accountRepo.delete(account);
        return account;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

    @Override
    public List<String> getEmailsFromAccounts() {
        var res = (List<String>) accountRepo.getEmailsFromAccounts();
        return res;
    }

    @Override
    public Optional<Account> findByEmail(String email) {
        Assert.notNull(email, "Email must be given");
        return accountRepo.findByEmail(email);
    }

}
