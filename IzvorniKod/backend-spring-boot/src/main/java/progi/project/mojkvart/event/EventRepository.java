package progi.project.mojkvart.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findById(Long id);

    boolean existsById(Long id);

    @Query(value = "SELECT * FROM event", nativeQuery = true)
    List<Event> getAllEvents();
}
