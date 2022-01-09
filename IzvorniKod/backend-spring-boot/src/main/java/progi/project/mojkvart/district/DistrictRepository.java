package progi.project.mojkvart.district;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, Long> {
    Optional<District> findById(Long id);

    boolean existsById(Long id);

    Optional<District> findByName(String name);

    List<District> findByOrderById();

    @Query("SELECT coalesce(max(d.id), 0) FROM District d")
    Long getMaxId();
}
