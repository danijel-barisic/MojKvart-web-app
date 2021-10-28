package progi.project.mojkvart.thread;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostThreadRepository extends JpaRepository<PostThread, Long> {

}
