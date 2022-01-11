package progi.project.mojkvart.street;

import org.springframework.data.jpa.repository.JpaRepository;
import progi.project.mojkvart.thread.PostThread;

import java.util.List;
import java.util.Optional;

public interface StreetRepository extends JpaRepository<Street, Long> {
    Optional<Street> findById(Long id);

    boolean existsById(Long id);

    Optional<Street> findByName(String name);

    List<Street> findByOrderById();

}
