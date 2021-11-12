package progi.project.mojkvart.registration;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class EmailValidator {
    private static final String regex = "^(.+)@(.+)$";
    Pattern pattern = Pattern.compile(regex);

    public boolean validate(String email) throws NullPointerException{
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
