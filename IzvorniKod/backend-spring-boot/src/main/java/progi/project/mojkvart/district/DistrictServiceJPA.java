package progi.project.mojkvart.district;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class DistrictServiceJPA implements DistrictService{

    @Autowired
    private DistrictRepository districtrepo;

    @Override
    public List<District> listAll() {
        return districtrepo.findAll();
    }

    @Override
    public District fetch(long districtId) {
        return findById(districtId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<District> findById(long districtId) {
        Assert.notNull(districtId, "ID must be given");
        return districtrepo.findById(districtId);
    }

    @Override
    public District createDistrict(District district) {
        Assert.isNull(district.getId(), "District ID must be null, not: " + district.getId());
        return districtrepo.save(district);
    }

    @Override
    public District updateDistrict(District district) {
        return districtrepo.save(district);
    }

    @Override
    public District deleteDistrict(long districtid) {
        District district = fetch(districtid);
        districtrepo.delete(district);
        return district;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

    @Override
    public Optional<District> findByName(String name) {
        Assert.notNull(name, "Name must be given");
        return districtrepo.findByName(name);
    }

}
