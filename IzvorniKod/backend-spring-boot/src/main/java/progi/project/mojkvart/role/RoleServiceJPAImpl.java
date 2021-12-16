package progi.project.mojkvart.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceJPAImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepo;

    @Override
    public List<Role> listAll() {
        return roleRepo.findAll();
    }

    @Override
    public Role fetch(long roleId) {
        return findById(roleId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<Role> findById(long roleId) {
        Assert.notNull(roleId, "ID must be given");
        return roleRepo.findById(roleId);
    }

    @Override
    public Role createRole(Role role) {
        Assert.isNull(role.getId(),
                "Role ID must be null, not: " + role.getId()
        );
        return roleRepo.save(role);
    }

    @Override
    public Role updateRole(Role role) {
        //Long roleId = role.getId();
        return roleRepo.save(role);
    }

    @Override
    public Role deleteRole(long roleId) {
        Role role = fetch(roleId);
        roleRepo.delete(role);
        return role;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

    @Override
    public Optional<Role> findByName(String name){
        return roleRepo.findByName(name);
    }
}
