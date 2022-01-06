package progi.project.mojkvart.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.home.HomeRepository;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceJPAImpl implements AccountService{

    private Home dummyHome = null;
    private boolean isSet = false;

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private HomeRepository homeRepository;

    @Override
    public List<Account> listAll() {
        return accountRepo.findByOrderById();
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
        return accountRepo.getEmailsFromAccounts();
    }

    @Override
    public Optional<Account> findByEmail(String email) {
        Assert.notNull(email, "Email must be given");
        return accountRepo.findByEmail(email);
    }

    @Override
    public Home generateDummyHome() {
        /*var h = new Home(-1L, -1L, new Street(-1L,"", 0, 0));
        h.getStreet().setDistrict(new District(-1L, ""));
        dummyHome = h;
        if(!isSet) {
            homeRepository.save(dummyHome);
            isSet = true;
        }*/
        Home h = homeRepository.getById(Long.valueOf(-1));
        return h;
    }

    @Override
    public Account fillWithDummyIfAdmin(Account a) {
        for (Role role : a.getRoles()) {
            if (role.getName().equals("ADMIN")) {
                a.setHome(dummyHome);
            }
        }
        return a;
    }

}
