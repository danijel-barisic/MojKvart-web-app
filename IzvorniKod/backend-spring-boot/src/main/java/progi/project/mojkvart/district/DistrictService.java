package progi.project.mojkvart.district;

import java.util.List;
import java.util.Optional;

public interface DistrictService {

    /**
     * Lists all districts in a database
     * @return List of districts
     */
    List<District> listAll();

    /**
     *Gets district with a given id
     * @param districtId given id
     * @return district with given id
     */
    District fetch(long districtId);

    /**
     * finds a district with a given id
     * @param districtId given id
     * @return district if exists, else nothing
     */
    Optional<District> findById(long districtId);

    /**
     * creates a new district in the database
     * @param district to create
     * @return created district
     */
    District createDistrict(District district);

    /**
     * Updates the district with the same id
     * @param district new object
     * @return updated district
     */
    District updateDistrict(District district);

    /**
     * Deletes the district with the same id
     * @param district new object
     * @return updated district
     */
    District deleteDistrict(long district);

    /**
     * checks if district exists with a given id
     * @param id of the district
     * @return true if present, else false
     */
    boolean existsById(long id);
}
