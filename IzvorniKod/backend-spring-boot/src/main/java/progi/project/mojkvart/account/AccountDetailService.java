package progi.project.mojkvart.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.security.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.springframework.security.core.authority.AuthorityUtils.NO_AUTHORITIES;
import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
public class AccountDetailService  implements UserDetailsService {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    //username is email
    public UserDetails loadUserByUsername(String email) {
        return accountService.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username with email: " + email + " does not exist"));
    }

    public Account signupAccount(Account account) {
        boolean accountExists = accountRepository.findByEmail(account.getEmail()).isPresent();

        if (accountExists) {
            throw new IllegalArgumentException("Email already in use!");
        }

        String encodedPassword = passwordEncoder.bCryptPasswordEncoder().encode(account.getPassword());

        account.setPassword(encodedPassword);

        accountService.createAccount(account);

        return account;
    }

    public Account loginAccount(Account account) {
        String pass;
        String encodedPassword = passwordEncoder.bCryptPasswordEncoder().encode(account.getPassword());
        boolean accountExists = accountRepository.findByEmail(account.getEmail()).isPresent();

        if(!accountExists) {
            throw new IllegalArgumentException("Username or password is incorrect");
        } else {
            pass = (accountRepository.findByEmail(account.getEmail()).orElse(null)).getPassword();
            if(passwordEncoder.bCryptPasswordEncoder().encode(pass) != encodedPassword)
                throw new IllegalArgumentException("Username or password is incorrect");
            return account;
        }

    }
}
