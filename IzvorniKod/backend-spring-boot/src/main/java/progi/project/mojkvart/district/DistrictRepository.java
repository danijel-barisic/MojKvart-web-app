package progi.project.mojkvart.district;

import org.springframework.data.jpa.repository.JpaRepository;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, Long> {
    Optional<District> findById(Long id);

    boolean existsById(Long id);

    Optional<District> findByName(String name);

    List<District> findByOrderById();

}
