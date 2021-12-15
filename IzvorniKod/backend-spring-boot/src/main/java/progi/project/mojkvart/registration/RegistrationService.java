package progi.project.mojkvart.registration;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountDetailService;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.home.HomeService;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.street.Street;
import progi.project.mojkvart.street.StreetService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RegistrationService {
    @Autowired
    private Role role; //?

    @Autowired
    private final AccountDetailService accountDetailService;

    @Autowired
    private final EmailValidator emailValidator;

    @Autowired
    private final StreetService streetService;

    @Autowired
    private final HomeService homeService;

    public Account register(RegistrationRequest request) {
        if (!emailValidator.validate(request.getEmail())) {
            throw new IllegalStateException("email not valid");
        }

//        Street street = streetService.findByName(request.getStreet().getName()).orElseThrow(
//                () -> new IllegalArgumentException("No such street")
//        );
        Street street = streetService.findById(request.getStreet().getId()).orElseThrow(
                () -> new IllegalArgumentException("No such street")
        );

        //home num validation.
        long homeNum = request.getStreetnumber();
        if (homeNum < street.getMinStreetNo() ||
                homeNum > street.getMaxStreetNo()) {
            System.out.println("min: " + street.getMinStreetNo() + " max: " + street.getMaxStreetNo()
                    + " actual home num: " + homeNum);
            throw new IllegalArgumentException("Home number is outside permitted range");
        }

        //handle pre-existing homes or make new.
        // Prevent piling of id's when merely adding new home every time, I guess.
        // Add new home to database
        //TODO When are new homes even created, perhaps during registration of user with this new home?
        //Also, home num validation has to be done, i.e. whether it fits minHomeNum n maxHomeNum of street.
        //TODO should I add account to home, or only home to account?

        Home home;
        Optional<Home> optHome = homeService.findByNumberAndStreetName(homeNum, street.getName());
        home = optHome.orElseGet(() -> {
            Home tmpHome = new Home(homeNum, street);
            homeService.createHome(tmpHome);
            return tmpHome;
        });

        Account account = new Account(
                request.getFirstname(),
                request.getLastname(),
                request.getEmail(),
                request.getPassword(),
                home,
                Arrays.asList(role = new Role("USER"))
        );

        if (home.getAccounts() == null || home.getAccounts().isEmpty()) {
            List<Account> accounts = new ArrayList<>();
            accounts.add(account);
            home.setAccounts(accounts);
        } else {
            home.getAccounts().add(account);
        }

        // FIXME: 15.12.2021. multiple id's same role. Try check .findByName for role
        return accountDetailService.signupAccount(
                account
        );
    }
}
