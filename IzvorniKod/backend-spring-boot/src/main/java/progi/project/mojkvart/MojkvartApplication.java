package progi.project.mojkvart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.KeyStore;

@SpringBootApplication
public class MojkvartApplication {

	@Bean
	public PasswordEncoder pswdEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(MojkvartApplication.class, args);
	}
}
