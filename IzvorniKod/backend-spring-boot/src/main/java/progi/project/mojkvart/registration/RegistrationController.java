package progi.project.mojkvart.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import progi.project.mojkvart.account.Account;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/registration")
    public Account register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @PostMapping("/user")
    public Map<String, Object> home(@AuthenticationPrincipal Account account) {

    }

}
