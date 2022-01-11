package progi.project.mojkvart.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.district.District;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("")
    public List<Role> listRoles() {
        return roleService.listAll();
    }

    @GetMapping("/{id}")
    public Role getRole(@PathVariable("id") long id) {
        if(!roleService.existsById(id)) {
            throw new IllegalArgumentException("Role with id: " + id + " does not exist");
        }
        return roleService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        if(role.getId() != null && roleService.existsById(role.getId())) {
            throw new IllegalArgumentException("Role with id: " + role.getId() + " already exists");
        }
        else {
            Role saved = roleService.createRole(role);
            return ResponseEntity.created(URI.create("/roles/" + saved.getId())).body(saved);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable("id") long roleId) {
        if(roleService.existsById(roleId))
            throw new IllegalArgumentException("Role with id: " + roleId + " does not exist");
        roleService.deleteRole(roleId);
    }
}
