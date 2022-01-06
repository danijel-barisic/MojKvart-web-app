package progi.project.mojkvart.account;

import org.springframework.security.core.userdetails.UserDetailsService;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.home.Home;

import java.util.List;
import java.util.Optional;

public interface AccountService{

    List<Account> listAll();

    Account fetch(long accountId);

    Account fetch(String email);

    Optional<Account> findById(long accountId);

    Account createAccount(Account account);

    Account updateAccount(Account account);

    Account deleteAccount(long accountId);

    boolean existsById(long id);

    List<String> getEmailsFromAccounts();

    Optional<Account> findByEmail(String email);

    Home generateDummyHome();

    Account fillWithDummyIfAdmin(Account a);
}
