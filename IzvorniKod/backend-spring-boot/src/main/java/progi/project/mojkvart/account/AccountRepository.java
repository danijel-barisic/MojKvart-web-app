package progi.project.mojkvart.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Long> {

    Optional<Account> findById(Long id);

    boolean existsById(Long id);

    @Query(value = "select email from account", nativeQuery = true)
    List<String> getEmailsFromAccounts();

    Optional<Account> findByEmail(String email);

    String findPasswordByEmail(String email);

    List<Account> findByOrderById();

}