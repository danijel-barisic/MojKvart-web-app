package progi.project.mojkvart.role_request;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.meeting.Meeting;
import progi.project.mojkvart.role.Role;
import progi.project.mojkvart.role.RoleService;
import progi.project.mojkvart.street.Street;
import progi.project.mojkvart.street.StreetService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/role-requests")
public class RoleRequestController {

    @Autowired
    private RoleRequestService roleRequestService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private RoleService roleService;

    @GetMapping("")
    public List<RoleRequest> listRoleRequests() {
        return roleRequestService.listAll();
    }

    @GetMapping("/{id}")
    public RoleRequest getRoleRequest(@PathVariable("id") long id) {
        if (!roleRequestService.existsById(id))
            throw new IllegalArgumentException("Role request with id: " + id + " does not exist");
        return roleRequestService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<RoleRequest> createRoleRequest(@RequestBody RoleRequest roleRequest) {
        if (roleRequest.getId() != null && roleRequestService.existsById(roleRequest.getId())) {
            throw new IllegalArgumentException("Role request with id: " + roleRequest.getId() + " already exists");
        } else if (roleRequestService.findByAccountIdAndRoleName(roleRequest.getAccount().getId(),
                roleRequest.getRole().getName()).isPresent()) {
            throw new IllegalArgumentException("Request for role: " + roleRequest.getRole().getName() + " already exists " +
                    "for user: " + roleRequest.getAccount().getUsername());
        } else {
            Long accountId = roleRequest.getAccount().getId();
            Long roleId = roleRequest.getRole().getId();
            Account account = accountService.fetch(accountId);
            Role role = roleService.fetch(roleId);
            RoleRequest saved = roleRequestService.createRoleRequest(roleRequest);
            saved.setAccount(account);
            saved.setRole(role);
            return ResponseEntity.created(URI.create("/role-requests/" + saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public RoleRequest updateRoleRequest(@PathVariable("id") Long id, @RequestBody RoleRequest roleRequest) {
        if (roleRequest.getId() != null && !roleRequestService.existsById(roleRequest.getId())) {
            throw new IllegalArgumentException("Role request with id: " + roleRequest.getId() + " does not exist");
        } else if (roleRequest.getId() == null) {
            throw new IllegalArgumentException("Role request id must be given");
        } else {
            if (!roleRequest.getId().equals(id))
                throw new IllegalArgumentException("Role request id must be preserved");
            return roleRequestService.updateRoleRequest(roleRequest);
        }
    }

    @DeleteMapping("/{id}")
    public RoleRequest deleteRoleRequest(@PathVariable("id") long roleRequestId) {
        if (!roleRequestService.existsById(roleRequestId))
            throw new IllegalArgumentException("Role request with id: " + roleRequestId + " does not exist");
        return roleRequestService.deleteRoleRequest(roleRequestId);
    }
}
