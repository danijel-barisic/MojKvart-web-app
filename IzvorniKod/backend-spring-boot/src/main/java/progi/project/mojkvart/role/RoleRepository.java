package progi.project.mojkvart.role;

import org.springframework.data.jpa.repository.JpaRepository;
import progi.project.mojkvart.street.Street;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findById(Long id);

    boolean existsById(Long id);

    Optional<Role> findByName(String name);

    List<Role> findByOrderById();

}
