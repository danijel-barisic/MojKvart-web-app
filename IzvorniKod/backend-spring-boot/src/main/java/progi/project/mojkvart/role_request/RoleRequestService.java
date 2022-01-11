package progi.project.mojkvart.role_request;

import java.util.List;
import java.util.Optional;

public interface RoleRequestService {

    List<RoleRequest> listAll();

    RoleRequest fetch(long roleRequestId);

    Optional<RoleRequest> findById(long roleRequestId);

    RoleRequest createRoleRequest(RoleRequest roleRequest);

    RoleRequest updateRoleRequest(RoleRequest roleRequest);

    RoleRequest deleteRoleRequest(long roleRequestId);

    boolean existsById(long id);

    Optional<RoleRequest> findByAccountIdAndRoleName(long accountId, String roleName);
}
