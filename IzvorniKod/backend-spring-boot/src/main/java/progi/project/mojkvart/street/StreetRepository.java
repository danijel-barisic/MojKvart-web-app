package progi.project.mojkvart.street;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StreetRepository extends JpaRepository<Street, Long> {
    Optional<Street> findById(Long id);

    boolean existsById(Long id);

    Optional<Street> findByName(String name);
}
