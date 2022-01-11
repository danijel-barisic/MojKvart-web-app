package progi.project.mojkvart.street;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import progi.project.mojkvart.thread.PostThread;

import java.util.List;
import java.util.Optional;

public interface StreetRepository extends JpaRepository<Street, Long> {
    Optional<Street> findById(Long id);

    boolean existsById(Long id);

    Optional<Street> findByName(String name);

    List<Street> findByOrderById();

    @Query("SELECT coalesce(max(s.id), 0) FROM Street s")
    Long getMaxId();

}
