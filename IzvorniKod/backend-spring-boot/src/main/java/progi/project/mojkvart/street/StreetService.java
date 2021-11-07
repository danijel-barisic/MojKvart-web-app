package progi.project.mojkvart.street;

import java.util.List;
import java.util.Optional;

public interface StreetService {

    /**
     * Lists all streets in the database
     * @return List of students
     */
    List<Street> listAll();

    /**
     * Gets street with a given id
     * @param streetId given streetId
     * @return street with a given id
     */
    Street fetch(long streetId);

    /**
     * Finds a street with a given id
     * @param streetId given streetId
     * @return student if exists or nothing if it doesn't
     */
    Optional<Street> findById(long streetId);

    /**
     * Creates a new street in the database
     * @param street to create
     * @return created street
     */
    Street createStreet(Street street);

    /**
     * Updates the street with the same id
     * @param street new object
     * @return updated street
     */
    Street updateStreet(Street street);

    /**
     * Deletes a street with a given Id
     * @param streetId of street to delete from database
     * @return deleted street
     */
    Street deleteStreet(long streetId);

    /**
     * checks if street exists with a given id
     * @param id of the street
     * @return true if present, else false
     */
    boolean existsById(long id);

    boolean districtExistsById(long id);
}
