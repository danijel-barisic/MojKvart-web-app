package progi.project.mojkvart.user;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> listAll();

    User fetch(long userId);

    Optional<User> findById(long userId);

    User createUser(User user);

    User updateUser(User user);

    User deleteUser(long userId);

    boolean existsById(long id);
}
