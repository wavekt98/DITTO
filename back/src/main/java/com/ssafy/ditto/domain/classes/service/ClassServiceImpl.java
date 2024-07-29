package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.category.exception.CategoryNotFoundException;
import com.ssafy.ditto.domain.category.repository.CategoryRepository;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Kit;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.dto.*;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.KitRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.tag.exception.TagNotFoundException;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;

@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;
    private final LectureRepository lectureRepository;
    private final StepRepository stepRepository;
    private final KitRepository kitRepository;
    private final FileRepository fileRepository;
    private final TagRepository tagRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Integer createClass(ClassRequest classRequest, Integer classFileId, Integer kitFileId) {
        User user = userRepository.findById(classRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        Kit kit = Kit.builder()
                .kitName(classRequest.getKit().getKitName())
                .kitExplanation(classRequest.getKit().getKitExplanation())
                .fileId(kitFileId != null ? fileRepository.findById(kitFileId).orElse(null) : null)
                .build();
        kit = kitRepository.save(kit);

        File classFile = null;
        if (classFileId != null) {
            classFile = fileRepository.findById(classFileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
        }

        DClass dClass = DClass.builder()
                .className(classRequest.getClassName())
                .userId(user)
                .categoryId(categoryRepository.findById(classRequest.getCategoryId()).orElseThrow(CategoryNotFoundException::new))
                .tagId(tagRepository.findById(classRequest.getTagId()).orElseThrow(TagNotFoundException::new))
                .classPrice(classRequest.getClassPrice())
                .classHour(classRequest.getClassHour().byteValue())
                .classMinute(classRequest.getClassMinute().byteValue())
                .classMin(classRequest.getClassMin().byteValue())
                .classMax(classRequest.getClassMax().byteValue())
                .classExplanation(classRequest.getClassExplanation())
                .kitId(kit)
                .fileId(classFile)
                .isDeleted(false)
                .studentSum(0)
                .likeCount(0)
                .reviewCount(0)
                .ratingSum(0)
                .build();
        dClass = classRepository.save(dClass);
        return dClass.getClassId();
    }

    @Override
    @Transactional
    public void updateClass(Integer classId, ClassRequest classRequest, Integer classFileId, Integer kitFileId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(classRequest.getUserId()).orElseThrow(UserNotFoundException::new);

        Kit kit = dClass.getKitId();
        kit.setKitName(classRequest.getKit().getKitName());
        kit.setKitExplanation(classRequest.getKit().getKitExplanation());
        if (kitFileId != null) {
            kit.setFileId(fileRepository.findById(kitFileId).orElse(null));
        }
        kitRepository.save(kit);

        dClass.setClassName(classRequest.getClassName());
        dClass.setUserId(user);
        dClass.setCategoryId(categoryRepository.findById(classRequest.getCategoryId()).orElseThrow(CategoryNotFoundException::new));
        dClass.setTagId(tagRepository.findById(classRequest.getTagId()).orElseThrow(TagNotFoundException::new));
        dClass.setClassPrice(classRequest.getClassPrice());
        dClass.setClassHour(classRequest.getClassHour().byteValue());
        dClass.setClassMinute(classRequest.getClassMinute().byteValue());
        dClass.setClassMin(classRequest.getClassMin().byteValue());
        dClass.setClassMax(classRequest.getClassMax().byteValue());
        dClass.setClassExplanation(classRequest.getClassExplanation());
        if (classFileId != null) {
            dClass.setFileId(fileRepository.findById(classFileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST)));
        }
        classRepository.save(dClass);
    }

    @Override
    public void deleteClass(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        dClass.setIsDeleted(true);
        classRepository.save(dClass);
    }

    @Override
    @Transactional
    public ClassDetailResponse getClassDetail(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        List<Step> steps = stepRepository.findAllByClassId(dClass);
        List<Lecture> lectures = lectureRepository.findAllByClassIdAndIsDeletedFalse(dClass);
        UserResponse userResponse = UserResponse.of(dClass.getUserId());
        TagResponse tagResponse = TagResponse.builder()
                .tagId(dClass.getTagId().getTagId())
                .tagName(dClass.getTagId().getTagName())
                .categoryId(dClass.getTagId().getCategoryId().getCategoryId())
                .build();

        return ClassDetailResponse.builder()
                .classId(dClass.getClassId())
                .className(dClass.getClassName())
                .classPrice(dClass.getClassPrice())
                .classHour(dClass.getClassHour())
                .classMinute(dClass.getClassMinute())
                .classExplanation(dClass.getClassExplanation())
                .classMin(dClass.getClassMin())
                .classMax(dClass.getClassMax())
                .studentSum(dClass.getStudentSum())
                .createdDate(dClass.getCreatedDate())
                .modifiedDate(dClass.getModifiedDate())
                .isDeleted(dClass.getIsDeleted())
                .likeCount(dClass.getLikeCount())
                .reviewCount(dClass.getReviewCount())
                .averageRating((float) (dClass.getRatingSum() / (dClass.getReviewCount() == 0 ? 1 : dClass.getReviewCount())))
                .file(dClass.getFileId() != null ? FileResponse.builder()
                        .fileId(dClass.getFileId().getFileId())
                        .uploadFileName(dClass.getFileId().getUploadFileName())
                        .fileUrl(dClass.getFileId().getFileUrl())
                        .build() : null)
                .kit(KitDetailResponse.builder()
                        .kitId(dClass.getKitId().getKitId())
                        .kitName(dClass.getKitId().getKitName())
                        .kitExplanation(dClass.getKitId().getKitExplanation())
                        .file(dClass.getKitId().getFileId() != null ? FileResponse.builder()
                                .fileId(dClass.getKitId().getFileId().getFileId())
                                .uploadFileName(dClass.getKitId().getFileId().getUploadFileName())
                                .fileUrl(dClass.getKitId().getFileId().getFileUrl())
                                .build() : null)
                        .build())
                .steps(steps.stream().map(step -> StepDetailResponse.builder()
                        .stepId(step.getStepId())
                        .stepNo(step.getStepNo())
                        .stepName(step.getStepName())
                        .stepDetail(step.getStepDetail())
                        .file(step.getFileId() != null ? FileResponse.builder()
                                .fileId(step.getFileId().getFileId())
                                .uploadFileName(step.getFileId().getUploadFileName())
                                .fileUrl(step.getFileId().getFileUrl())
                                .build() : null)
                        .build()).collect(Collectors.toList()))
                .lectures(lectures.stream().map(lecture -> LectureResponse.builder()
                        .lectureId(lecture.getLectureId())
                        .year(lecture.getYear())
                        .month(lecture.getMonth())
                        .day(lecture.getDay())
                        .hour(lecture.getHour())
                        .minute(lecture.getMinute())
                        .userCount(lecture.getUserCount())
                        .build()).collect(Collectors.toList()))
                .user(userResponse)
                .tag(tagResponse)
                .build();
    }

    @Override
    @Transactional
    public ClassListResponse getClassList(ClassListRequest request) {
        Sort sort = Sort.by(Sort.Order.desc(request.getSortBy() != null ? request.getSortBy() : "createdDate"));
        Pageable pageable = PageRequest.of(request.getPage(), 10, sort);

        List<DClass> classList = classRepository.findAll((root, query, criteriaBuilder) -> {
            List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();
            if (request.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("categoryId"), request.getCategoryId()));
            }
            if (request.getTagId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("tagId"), request.getTagId()));
            }
            if (request.getSearchBy() != null && request.getKeyword() != null) {
                predicates.add(criteriaBuilder.like(root.get(request.getSearchBy()), "%" + request.getKeyword() + "%"));
            }
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }, pageable).getContent();

        List<ClassResponse> classResponses = classList.stream().map(dClass -> {
            TagResponse tagResponse = TagResponse.builder()
                    .tagId(dClass.getTagId().getTagId())
                    .tagName(dClass.getTagId().getTagName())
                    .categoryId(dClass.getTagId().getCategoryId().getCategoryId())
                    .build();
            return ClassResponse.builder()
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .classPrice(dClass.getClassPrice())
                    .classHour(dClass.getClassHour())
                    .classMinute(dClass.getClassMinute())
                    .classExplanation(dClass.getClassExplanation())
                    .classMin(dClass.getClassMin())
                    .classMax(dClass.getClassMax())
                    .studentSum(dClass.getStudentSum())
                    .createdDate(dClass.getCreatedDate())
                    .modifiedDate(dClass.getModifiedDate())
                    .isDeleted(dClass.getIsDeleted())
                    .likeCount(dClass.getLikeCount())
                    .reviewCount(dClass.getReviewCount())
                    .averageRating((float) (dClass.getRatingSum() / (dClass.getReviewCount() == 0 ? 1 : dClass.getReviewCount())))
                    .userNickname(dClass.getUserId().getNickname())
                    .file(dClass.getFileId() != null ? FileResponse.builder()
                            .fileId(dClass.getFileId().getFileId())
                            .uploadFileName(dClass.getFileId().getUploadFileName())
                            .fileUrl(dClass.getFileId().getFileUrl())
                            .build() : null)
                    .user(UserResponse.of(dClass.getUserId()))
                    .tag(tagResponse)
                    .build();
        }).collect(Collectors.toList());

        return ClassListResponse.builder()
                .classList(classResponses)
                .build();
    }

    @Override
    @Transactional
    public List<ClassResponse> getPopularClasses() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Order.desc("likeCount")));
        List<DClass> popularClasses = classRepository.findPopularClasses(oneWeekAgo, pageable);

        return popularClasses.stream().map(dClass -> {
            TagResponse tagResponse = TagResponse.builder()
                    .tagId(dClass.getTagId().getTagId())
                    .tagName(dClass.getTagId().getTagName())
                    .categoryId(dClass.getTagId().getCategoryId().getCategoryId())
                    .build();
            return ClassResponse.builder()
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .classPrice(dClass.getClassPrice())
                    .classHour(dClass.getClassHour())
                    .classMinute(dClass.getClassMinute())
                    .classExplanation(dClass.getClassExplanation())
                    .classMin(dClass.getClassMin())
                    .classMax(dClass.getClassMax())
                    .studentSum(dClass.getStudentSum())
                    .createdDate(dClass.getCreatedDate())
                    .modifiedDate(dClass.getModifiedDate())
                    .isDeleted(dClass.getIsDeleted())
                    .likeCount(dClass.getLikeCount())
                    .reviewCount(dClass.getReviewCount())
                    .averageRating((float) (dClass.getRatingSum() / (dClass.getReviewCount() == 0 ? 1 : dClass.getReviewCount())))
                    .userNickname(dClass.getUserId().getNickname())
                    .file(dClass.getFileId() != null ? FileResponse.builder()
                            .fileId(dClass.getFileId().getFileId())
                            .uploadFileName(dClass.getFileId().getUploadFileName())
                            .fileUrl(dClass.getFileId().getFileUrl())
                            .build() : null)
                    .user(UserResponse.of(dClass.getUserId()))
                    .tag(tagResponse)
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ClassResponse> getLatestClasses() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Order.desc("createdDate")));
        List<DClass> recentClasses = classRepository.findRecentClasses(oneWeekAgo, pageable);

        return recentClasses.stream().map(dClass -> {
            TagResponse tagResponse = TagResponse.builder()
                    .tagId(dClass.getTagId().getTagId())
                    .tagName(dClass.getTagId().getTagName())
                    .categoryId(dClass.getTagId().getCategoryId().getCategoryId())
                    .build();
            return ClassResponse.builder()
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .classPrice(dClass.getClassPrice())
                    .classHour(dClass.getClassHour())
                    .classMinute(dClass.getClassMinute())
                    .classExplanation(dClass.getClassExplanation())
                    .classMin(dClass.getClassMin())
                    .classMax(dClass.getClassMax())
                    .studentSum(dClass.getStudentSum())
                    .createdDate(dClass.getCreatedDate())
                    .modifiedDate(dClass.getModifiedDate())
                    .isDeleted(dClass.getIsDeleted())
                    .likeCount(dClass.getLikeCount())
                    .reviewCount(dClass.getReviewCount())
                    .averageRating((float) (dClass.getRatingSum() / (dClass.getReviewCount() == 0 ? 1 : dClass.getReviewCount())))
                    .userNickname(dClass.getUserId().getNickname())
                    .file(dClass.getFileId() != null ? FileResponse.builder()
                            .fileId(dClass.getFileId().getFileId())
                            .uploadFileName(dClass.getFileId().getUploadFileName())
                            .fileUrl(dClass.getFileId().getFileUrl())
                            .build() : null)
                    .user(UserResponse.of(dClass.getUserId()))
                    .tag(tagResponse)
                    .build();
        }).collect(Collectors.toList());
    }
}