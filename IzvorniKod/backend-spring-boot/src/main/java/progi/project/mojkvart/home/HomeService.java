package progi.project.mojkvart.home;


import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

public interface HomeService {

    Optional<Home> findByNumberAndStreetName(long homeNum, String name);

    List<Home> listAll();

    Home fetch(long homeId);

    Optional<Home> findById(long homeId);

    Home createHome(Home home);

    Home updateHome(Home home);

    Home deleteHome(long homeId);

    boolean existsById(long id);
}
