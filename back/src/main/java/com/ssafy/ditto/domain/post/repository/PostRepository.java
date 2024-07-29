package com.ssafy.ditto.domain.post.repository;

import com.ssafy.ditto.domain.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer>{

    @Query(value = "SELECT * FROM Post p WHERE "
            + "(COALESCE(:boardId, p.board_id) = p.board_id) AND "
            + "(COALESCE(:categoryId, p.category_id) = p.category_id) AND "
            + "(COALESCE(:tagId, p.tag_id) = p.tag_id) ",
            nativeQuery = true)
    List<Post> getPostLists(@Param("boardId") Integer boardId,
                            @Param("categoryId") Integer categoryId,
                            @Param("tagId") Integer tagId);

    @Query(value = "SELECT COUNT(*) FROM Post p WHERE "
            + "(COALESCE(:boardId, p.board_id) = p.board_id) AND "
            + "(COALESCE(:categoryId, p.category_id) = p.category_id) AND "
            + "(COALESCE(:tagId, p.tag_id) = p.tag_id)",
            nativeQuery = true)
    int getPostCount(@Param("boardId") Integer boardId,
                     @Param("categoryId") Integer categoryId,
                     @Param("tagId") Integer tagId);

    // 최근 1주일간 받은 좋아요수
    @Query(value = "SELECT p.* FROM Post p " +
            "LEFT JOIN Like_Post l ON p.post_id = l.post_id " +
            "WHERE l.created_date > :oneWeekAgo " +
            "GROUP BY p.post_id " +
            "ORDER BY COUNT(l.post_id) DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Post> getBestPosts(@Param("oneWeekAgo") LocalDateTime oneWeekAgo);

    // 커뮤니티 게시글 상세 조회
    @Query("SELECT p FROM Post p WHERE p.postId = :postId")
    Post getPost(@Param("postId") int postId);

    @Query("SELECT p FROM Post p WHERE p.user.userId = :userId AND p.isDeleted = false")
    List<Post> getUserPosts(@Param("userId") int userId);

    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.viewCount = p.viewCount + 1 WHERE p.id = :postId")
    void addView(@Param("postId") int postId);

    // 좋아요 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Like_Post (post_id, user_id, created_date) VALUES (:postId, :userId, now())", nativeQuery = true)
    void addLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 삭제
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    void removeLike(@Param("postId") int postId, @Param("userId") int userId);

    @Query(value = "SELECT COUNT(*) FROM Like_Post WHERE post_id = :postId", nativeQuery = true)
    int countLikes(@Param("postId") int postId);

    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.likeCount = :likeCount WHERE p.id = :postId")
    void likeCountUpdate(@Param("postId") int postId, @Param("likeCount") int likeCount);

    // 좋아요 상태 확인
    @Query(value = "SELECT COUNT(*) FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    int checkLike(@Param("postId") int postId, @Param("userId") int userId);

}