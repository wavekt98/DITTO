package com.ssafy.ditto.domain.profile.service;

import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.post.service.PostService;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.repository.LikeUserRepository;
import com.ssafy.ditto.domain.profile.repository.ProfileRepository;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.domain.UserTag;
import com.ssafy.ditto.domain.user.repository.UserTagRepository;
import com.ssafy.ditto.global.error.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;
import static com.ssafy.ditto.global.error.ErrorCode.*;

@Component
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    public final ProfileRepository profileRepository;
    public final LikeUserRepository likeUserRepository;
    public final PostService postService;
    public final PostRepository postRepository;
    public final TagRepository tagRepository;
    public final UserTagRepository userTagRepository;
    public final ClassRepository classRepository;
    public final ReviewRepository reviewRepository;
    public final FileService fileService;
    public final FileRepository fileRepository;

    @Transactional
    @Override
    public ProfileList searchUser(Map<String, String> map) {
        int curPage = Integer.parseInt(map.getOrDefault("page", "1"));
        int sizePage = Integer.parseInt(map.getOrDefault("size", "5"));
        int start = (curPage - 1) * sizePage;

        Integer categoryId = map.get("categoryId") != null && !map.get("categoryId").isEmpty() ? Integer.parseInt(map.get("categoryId")) : null;
        Integer tagId = map.get("tagId") != null && !map.get("tagId").isEmpty() ? Integer.parseInt(map.get("tagId")) : null;
        Integer role = map.get("role") != null && !map.get("role").isEmpty() ? Integer.parseInt(map.get("role")) : null;
        String keyword = map.get("keyword");

        List<User> users = profileRepository.findUsers(categoryId, tagId, role, keyword);
        int userCount = users.size();
        int pageCount = (userCount - 1) / sizePage + 1;

        List<User> paginatedUsers;
        if (start >= users.size()) {
            paginatedUsers = Collections.emptyList();
        } else {
            int end = Math.min(start + sizePage, users.size());
            paginatedUsers = users.subList(start, end);
        }

        List<ProfileResponse> profileResponses = paginatedUsers.stream()
                .map(user -> {
                    List<UserTag> userTags = userTagRepository.findByUserId(user);
                    List<String> tagNames = new ArrayList<>();
                    for(UserTag ut : userTags){
                        Tag tag = tagRepository.findByTagName(ut.getTagId().getTagName());
                        tagNames.add(tag.getTagName());
                    }
                    return ProfileResponse.of(user, tagNames);
                })
                .collect(Collectors.toList());

        ProfileList profileList = new ProfileList();
        profileList.setProfiles(profileResponses);
        profileList.setCurrentPage(curPage);
        profileList.setTotalPageCount(pageCount);

        return profileList;
    }

    @Transactional
    @Override
    public ProfileResponse getProfile(int userId) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // UserTag를 기반으로 Tag 리스트를 가져오기
        List<UserTag> userTags = userTagRepository.findByUserId(user);
        List<String> tagNames = userTags.stream()
                .map(userTag -> userTag.getTagId().getTagName())
                .toList();

        int likeCount = likeUserRepository.countLikesByUserId(userId);

        Integer studentSum = profileRepository.getTotalStudentSumByUserId(userId);
        Integer ratingSum = profileRepository.getTotalRatingSumByUserId(userId);
        Integer reviewCount = profileRepository.getTotalReviewCountByUserId(userId);

        float avgRating = 0f;
        if (reviewCount != null && reviewCount > 0) {
            avgRating = ratingSum != null ? (float) ratingSum / reviewCount : 0f;
            avgRating = new BigDecimal(avgRating).setScale(2, RoundingMode.HALF_UP).floatValue();
        }

        return new ProfileResponse(
                user.getUserId(),
                user.getRoleId().getRoleId(),
                user.getNickname(),
                user.getFileId() != null ? user.getFileId().getUploadFileName() : null,
                user.getFileId() != null ? user.getFileId().getFileUrl() : null,
                likeCount,
                studentSum != null ? studentSum : 0,
                avgRating,
                user.getIntro(),
                tagNames
        );
    }

    @Override
    public void modifyImage(int userId, MultipartFile requestFile) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        int fileId = 1;
        try {
            fileId = fileService.saveFile(requestFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        File file = fileRepository.findById(fileId).orElseThrow((() -> new FileException(FILE_NOT_EXIST)));
        user.changeFile(file);
        profileRepository.save(user);
    }

    @Override
    public void deleteImage(int userId) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        File currentFile = user.getFileId();

        // 기본 프로필 이미지로 변경 위한 코드
        File defaultFile = fileRepository.findById(1).orElseThrow((() -> new FileException(FILE_NOT_EXIST)));
        user.changeFile(defaultFile);
        profileRepository.save(user);

        if (user.getFileId() != null) {
            try {
                fileService.deleteFile(currentFile.getFileId());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public String modifyIntro(int userId, Map<String, String> map) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        String intro = map.get("intro");
        user.updateIntro(intro);
        profileRepository.save(user);
        return "소개 한마디 수정";
    }

    @Override
    public String modifyTag(int userId, Map<String, String> map) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        List<String> tags = new ArrayList<>();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            tags.add(entry.getValue());
        }

        List<UserTag> userTags = userTagRepository.findByUserId(user);
        userTagRepository.deleteAll(userTags);

        for (String tagName : tags){
            UserTag userTag = UserTag.builder()
                    .userId(user)
                    .tagId(tagRepository.findByTagName(tagName))
                    .build();
            userTag = userTagRepository.save(userTag);
        }
        return "관심사 수정";
    }

    @Override
    public PostList userPost(int userId, Map<String,String> map) {
        User user = profileRepository.findById(userId)
                .orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        return postService.userPost(userId, map);
    }

    @Override
    public String addLike(int likeGetterId, int likeGiverId) {
        User getter = profileRepository.findById(likeGetterId).orElse(null);
        User giver = profileRepository.findById(likeGetterId).orElse(null);
        profileRepository.addLike(likeGetterId,likeGiverId);
        return likeGetterId+"번 유저 "+likeGiverId+"번 유저가 좋아요 누름";
    }

    @Override
    public String removeLike(int likeGetterId, int likeGiverId) {
        User getter = profileRepository.findById(likeGetterId).orElse(null);
        User giver = profileRepository.findById(likeGetterId).orElse(null);
        profileRepository.removeLike(likeGetterId,likeGiverId);
        return likeGetterId+"번 유저 "+likeGiverId+"번 유저가 좋아요 취소";
    }

    @Override
    public Boolean checkLike(int likeGetterId, int likeGiverId) {
        User getter = profileRepository.findById(likeGetterId).orElse(null);
        User giver = profileRepository.findById(likeGetterId).orElse(null);
        int count = profileRepository.checkLike(likeGetterId,likeGiverId);
        return count==1;
    }
}