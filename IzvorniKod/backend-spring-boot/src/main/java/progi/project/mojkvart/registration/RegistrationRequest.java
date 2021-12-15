package progi.project.mojkvart.registration;

import progi.project.mojkvart.street.Street;

public class RegistrationRequest {
    private final String firstname;
    private final String lastname;
    private final String email;
    private final String password;
    private final long streetnumber;
    private final Street street;

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Street getStreet() {
        return street;
    }

    public long getStreetnumber() {
        return streetnumber;
    }

    public RegistrationRequest(String firstname, String lastname, String email, String password,
                               long streetnumber, Street street) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.streetnumber = streetnumber;
        this.street = street;
    }
}
