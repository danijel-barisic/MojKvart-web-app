package progi.project.mojkvart.role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findById(Long id);

    boolean existsById(Long id);
}
