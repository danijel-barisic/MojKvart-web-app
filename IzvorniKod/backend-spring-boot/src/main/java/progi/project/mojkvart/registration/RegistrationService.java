package progi.project.mojkvart.registration;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountDetailService;
import progi.project.mojkvart.role.Role;

import java.util.Arrays;

@Service
@AllArgsConstructor
public class RegistrationService {
    @Autowired
    private Role role;

    @Autowired
    private final AccountDetailService accountDetailService;
    @Autowired
    private final EmailValidator emailValidator;

    public Account register(RegistrationRequest request) {
        if (!emailValidator.validate(request.getEmail())) {
            throw new IllegalStateException("email not valid");
        }
        return accountDetailService.signupAccount(
                new Account(
                        request.getFirstname(),
                        request.getLastname(),
                        request.getEmail(),
                        request.getPassword(),
                        Arrays.asList(role = new Role("USER"))
                )
        );
    }
}
