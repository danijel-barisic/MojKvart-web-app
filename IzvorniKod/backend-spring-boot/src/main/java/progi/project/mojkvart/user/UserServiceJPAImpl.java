package progi.project.mojkvart.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceJPAImpl implements UserService{

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<User> listAll() {
        return userRepo.findAll();
    }

    @Override
    public User fetch(long userId) {
        return findById(userId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<User> findById(long userId) {
        Assert.notNull(userId, "ID must be given");
        return userRepo.findById(userId);
    }

    @Override
    public User createUser(User user) {
        Assert.isNull(user.getId(),
                "User ID must be null, not: " + user.getId()
        );
        return userRepo.save(user);
    }

    @Override
    public User updateUser(User user) {
        //Long userId = user.getId();
        return userRepo.save(user);
    }

    @Override
    public User deleteUser(long userId) {
        User user = fetch(userId);
        userRepo.delete(user);
        return user;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

}
