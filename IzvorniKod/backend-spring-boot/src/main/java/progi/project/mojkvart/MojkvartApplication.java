package progi.project.mojkvart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.security.KeyStore;

@SpringBootApplication
public class MojkvartApplication {

	@Bean
	public PasswordEncoder pswdEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CharacterEncodingFilter characterEncodingFilter() {
		CharacterEncodingFilter filter = new CharacterEncodingFilter();
		filter.setEncoding("UTF-8");
		filter.setForceEncoding(true);
		return filter;
	}

	public static void main(String[] args) {
		SpringApplication.run(MojkvartApplication.class, args);
	}
}
