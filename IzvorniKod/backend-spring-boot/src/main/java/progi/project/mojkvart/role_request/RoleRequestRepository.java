package progi.project.mojkvart.role_request;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRequestRepository extends JpaRepository<RoleRequest, Long> {

    Optional<RoleRequest> findById(Long id);

    boolean existsById(Long id);

    Optional<RoleRequest> findByAccountIdAndRoleName(long accountId, String roleName);
}
