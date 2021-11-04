package progi.project.mojkvart.role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    List<Role> listAll();

    Role fetch(long roleId);

    Optional<Role> findById(long roleId);

    Role createRole(Role role);

    Role updateRole(Role role);

    Role deleteRole(long roleId);

    boolean existsById(long id);
}
