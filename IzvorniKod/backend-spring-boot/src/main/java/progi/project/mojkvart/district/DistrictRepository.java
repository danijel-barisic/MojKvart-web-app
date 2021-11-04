package progi.project.mojkvart.district;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, Long> {
    Optional<District> findById(Long id);

    boolean existsById(Long id);
}
