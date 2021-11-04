package progi.project.mojkvart.role_request;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class RoleRequestServiceJPAImpl implements RoleRequestService{

    @Autowired
    private RoleRequestRepository roleRequestRepo;

    @Override
    public List<RoleRequest> listAll() {
        return roleRequestRepo.findAll();
    }

    @Override
    public RoleRequest fetch(long roleRequestId) {
        return findById(roleRequestId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<RoleRequest> findById(long roleRequestId) {
        Assert.notNull(roleRequestId, "ID must be given");
        return roleRequestRepo.findById(roleRequestId);
    }

    @Override
    public RoleRequest createRoleRequest(RoleRequest roleRequest) {
        Assert.isNull(roleRequest.getId(),
                "RoleRequest ID must be null, not: " + roleRequest.getId()
        );
        return roleRequestRepo.save(roleRequest);
    }

    @Override
    public RoleRequest updateRoleRequest(RoleRequest roleRequest) {
        //Long roleRequestId = roleRequest.getId();
        return roleRequestRepo.save(roleRequest);
    }

    @Override
    public RoleRequest deleteRoleRequest(long roleRequestId) {
        RoleRequest roleRequest = fetch(roleRequestId);
        roleRequestRepo.delete(roleRequest);
        return roleRequest;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }
}
