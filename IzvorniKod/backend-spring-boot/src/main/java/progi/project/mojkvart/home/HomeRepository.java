package progi.project.mojkvart.home;

import org.springframework.data.jpa.repository.JpaRepository;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

public interface HomeRepository extends JpaRepository<Home, Long> {
    Optional<Home> findById(Long id);

    boolean existsById(Long id);

    Optional<Home> findByNumberAndStreetName(long homeNum, String name);

    List<Home> findByOrderById();


}