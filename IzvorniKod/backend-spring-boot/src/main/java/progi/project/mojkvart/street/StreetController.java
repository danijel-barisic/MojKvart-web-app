package progi.project.mojkvart.street;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/streets")
public class StreetController {

    @Autowired
    private StreetService streetService;

    @GetMapping("")
    public List<Street> listStreets() {
        return streetService.listAll();
    }

    @GetMapping("/{id}")
    public Street getStreet(@PathVariable("id") long id) {
        if(streetService.existsById(id) == false)
            throw new IllegalArgumentException("Street with id: " + id + " does not exist");
        return streetService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<Street> createStreet(@RequestBody Street street) {
        if(street.getId() != null && streetService.existsById(street.getId()) == true) {
            throw new IllegalArgumentException("Street with id: " + street.getId() + " already exist");
        }
        else {
            Street saved = streetService.createStreet(street);
            return ResponseEntity.created(URI.create("/streets/"+ saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public Street updateStreet(@PathVariable("id") Long id, @RequestBody Street street) {
        if(street.getId() != null && streetService.existsById(street.getId()) == false) {
            throw new IllegalArgumentException("Street with id: " + street.getId() + " does not exist");
        }
        else if(street.getId() == null){
            throw new IllegalArgumentException("Street id must be given");
        } else {
            if (!street.getId().equals(id))
                throw new IllegalArgumentException("Street id must be preserved");
            return streetService.updateStreet(street);
        }
    }

    @DeleteMapping("/{id}")
    public Street deleteStreet(@PathVariable("id") long streetId) {
        if(streetService.existsById(streetId) == false)
            throw new IllegalArgumentException("Street with id: " + streetId + " does not exist");
        return streetService.deleteStreet(streetId);
    }
}
