package com.ssafy.ditto.domain.comment.domain;

import com.ssafy.ditto.domain.post.domain.Post;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(name = "user_id")
    private Integer userId;
    //    @ManyToOne
//    @JoinColumn(name = "user_id", insertable = false, updatable = false)
//    private User user;

    @Column(name = "content", length = 1000)
    private String content;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "level")
    private Byte level;

    @ManyToOne
    @JoinColumn(name = "parent_id", insertable = false, updatable = false)
    private Comment parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<Comment> children = new ArrayList<>();

    public Comment(String content, int userId, Post post) {
        this.content = content;
        this.userId = userId;
        this.post = post;
        this.level = 0;
        this.isDeleted = false;

//        //==연관관계 편의 메서드==//
//        post.getComments().add(this);
//        member.getComments().add(this);
    }

    public void addParent(Comment parent) {
        this.parent = parent;
        parent.getChildren().add(this);
        this.level = (byte)(parent.getLevel() + 1);
    }
}
