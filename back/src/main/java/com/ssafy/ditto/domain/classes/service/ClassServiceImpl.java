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
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;

@Component
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
                .categoryId(categoryRepository.findById(classRequest.getCategoryId())
                        .orElseThrow(CategoryNotFoundException::new))
                .tagId(tagRepository.findById(classRequest.getTagId())
                        .orElseThrow(TagNotFoundException::new))
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
        TagResponse tagResponse = TagResponse.of(dClass.getTagId());

        return ClassDetailResponse.of(dClass, dClass.getFileId() != null ? FileResponse.of(dClass.getFileId()) : null, KitDetailResponse.of(dClass.getKitId(), dClass.getKitId().getFileId() != null ? FileResponse.of(dClass.getKitId().getFileId()) : null), steps.stream().map(step -> StepDetailResponse.of(step, step.getFileId() != null ? FileResponse.of(step.getFileId()) : null)).collect(Collectors.toList()), lectures.stream().map(LectureResponse::of).collect(Collectors.toList()), userResponse, tagResponse);
    }

    @Override
    @Transactional
    public ClassListResponse getClassList(ClassListRequest request) {
        List<DClass> classList = classRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (request.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("categoryId").get("categoryId"), request.getCategoryId()));
            }
            if (request.getTagId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("tagId").get("tagId"), request.getTagId()));
            }
            if (request.getSearchBy() != null && request.getKeyword() != null) {
                if (request.getSearchBy().equals("nickname")) {
                    Join<DClass, User> userJoin = root.join("userId", JoinType.INNER);
                    predicates.add(criteriaBuilder.like(userJoin.get("nickname"), "%" + request.getKeyword() + "%"));
                } else if (request.getSearchBy().equals("className")) {
                    predicates.add(criteriaBuilder.like(root.get("className"), "%" + request.getKeyword() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        // Sort
        switch (request.getSortBy() != null ? request.getSortBy() : "createdDate") {
            case "likeCount":
                classList.sort(Comparator.comparing(DClass::getLikeCount).reversed());
                break;
            case "averageRating":
                classList.sort(Comparator.comparing(d -> (float) d.getRatingSum() / (d.getReviewCount() == 0 ? 1 : d.getReviewCount()), Comparator.reverseOrder()));
                break;
            case "reviewCount":
                classList.sort(Comparator.comparing(DClass::getReviewCount).reversed());
                break;
            case "priceLow":
                classList.sort(Comparator.comparing(DClass::getClassPrice));
                break;
            case "createdDate":
            default:
                classList.sort(Comparator.comparing(DClass::getCreatedDate).reversed());
                break;
        }

        // Pagination
        int start = request.getPage() * (request.getSize() != null ? request.getSize() : 12);
        int end = Math.min(start + (request.getSize() != null ? request.getSize() : 12), classList.size());
        List<DClass> paginatedList = classList.subList(start, end);

        List<ClassResponse> classResponses = paginatedList.stream().map(ClassResponse::of).collect(Collectors.toList());

        return ClassListResponse.of(classResponses);
    }

    @Override
    @Transactional
    public List<ClassResponse> getPopularClasses() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Order.desc("likeCount")));
        List<DClass> popularClasses = classRepository.findPopularClasses(oneWeekAgo, pageable);

        return popularClasses.stream().map(ClassResponse::of).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ClassResponse> getLatestClasses() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Order.desc("createdDate")));
        List<DClass> recentClasses = classRepository.findRecentClasses(oneWeekAgo, pageable);

        return recentClasses.stream().map(ClassResponse::of).collect(Collectors.toList());
    }
}
