package progi.project.mojkvart.thread;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostThreadRepository extends JpaRepository<PostThread, Long> {
    Optional<PostThread> findById(Long id);

    List<PostThread> findByOrderById();
}
