package progi.project.mojkvart.district;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/districts")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @GetMapping("")
    public List<District> listDistricts() {
        return districtService.listAll();
    }

    @GetMapping("/{id}")
    public District getDistrict(@PathVariable("id") long id) {
        if(!districtService.existsById(id)) {
            throw new IllegalArgumentException("District with id: " + id + " does not exist");
        }
        return districtService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<District> createDistrict(@RequestBody District district) {
        if(district.getId() != null && districtService.existsById(district.getId()) == true) {
            throw new IllegalArgumentException("District with id: " + district.getId() + " already exists");
        }
        else if(!districtService.findByName(district.getName()).isEmpty()) {
            throw new IllegalArgumentException("District with name: " + district.getName() + " already exist");
        }
        else {
            District saved = districtService.createDistrict(district);
            return ResponseEntity.created(URI.create("/districts/" + saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public District updateDistrict(@PathVariable("id") Long id, @RequestBody District district) {
        if(district.getId() != null && districtService.existsById(district.getId()) == false) {
            throw new IllegalArgumentException("District with id: " + district.getId() + " does not exist");
        }
        else if(district.getId() == null) {
            throw new IllegalArgumentException("District id must be given");
        }
        else {
            if(!district.getId().equals(id))
                throw new IllegalArgumentException("District id must be preserved");
            return districtService.updateDistrict(district);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDistrict(@PathVariable("id") long districtId) {
        if(districtService.existsById(districtId) == false)
            throw new IllegalArgumentException("District with id: " + districtId + " does not exist");
        districtService.deleteDistrict(districtId);
    }
}
