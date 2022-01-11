package progi.project.mojkvart.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Optional<Meeting> findById(Long id);

    boolean existsById(Long id);

    List<Meeting> findByOrderByIdDesc();

}
