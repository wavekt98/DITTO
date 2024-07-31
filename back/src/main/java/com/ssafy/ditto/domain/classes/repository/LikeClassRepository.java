package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.LikeClass;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikeClassRepository extends JpaRepository<LikeClass, Integer> {
    Optional<LikeClass> findByUserIdAndClassId(User user, DClass dClass);

    void deleteByUserIdAndClassId(User user, DClass dClass);

    @Query(value =
            "SELECT c.* " +
                    "FROM Class c " +
                    "JOIN Like_Class lc ON c.class_id = lc.class_id " +
                    "WHERE lc.user_id = :userId " +
                    "AND lc.created_date < :dateTime " +
                    "ORDER BY lc.created_date DESC " +
                    "LIMIT 3",
            nativeQuery = true)
    List<DClass> getLikeClass(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);
}