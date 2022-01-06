package progi.project.mojkvart.home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.meeting.Meeting;

import java.util.List;
import java.util.Optional;

@Service
public class HomeServiceJPA implements HomeService{
    @Autowired
    private HomeRepository homeRepository;

    @Override
    public Optional<Home> findByNumberAndStreetName(long homeNum, String name){
        return homeRepository.findByNumberAndStreetName(homeNum,name);
    }

    @Override
    public List<Home> listAll() {
        return homeRepository.findByOrderById();
    }

    @Override
    public Home fetch(long homeId) {
        return findById(homeId).orElseThrow(
                IllegalArgumentException::new
        );
    }

    @Override
    public Optional<Home> findById(long homeId) {
        Assert.notNull(homeId, "Id must be given");
        return homeRepository.findById(homeId);
    }

    @Override
    public Home createHome(Home home) {
        Assert.isNull(home.getId(), "Home Id must be null, not: " + home.getId());
        long maxId = homeRepository.getMaxId();
        home.setId(maxId == -1 ? 1 : maxId + 1);
        return homeRepository.save(home);
    }

    @Override
    public Home updateHome(Home home) {
        return homeRepository.save(home);
    }

    @Override
    public Home deleteHome(long homeId) {
        Home home = fetch(homeId);
        homeRepository.delete(home);
        return home;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

}
