package com.ssafy.ditto.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 서버 오류
    INTERNAL_SERVER_ERROR(500, "INTERNAL_SERVER_ERROR", "서버 오류가 발생했습니다."),

    // 인증 관련 오류
    INVALID_TOKEN(401, "INVALID_TOKEN", "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(403, "EXPIRED_TOKEN", "만료된 토큰입니다."),
    UNAUTHORIZED(401, "UNAUTHORIZED", "인증이 필요합니다."),
    FORBIDDEN(403, "FORBIDDEN", "접근 권한이 없습니다."),

    // 요청 관련 오류
    BAD_REQUEST(400, "BAD_REQUEST", "잘못된 요청입니다."),
    VALIDATION_ERROR(400, "VALIDATION_ERROR", "요청 데이터가 유효하지 않습니다."),
    MISSING_REQUIRED_FIELDS(400, "MISSING_REQUIRED_FIELDS", "필수 필드가 누락되었습니다."),

    // 리소스 관련 오류
    RESOURCE_NOT_FOUND(404, "RESOURCE_NOT_FOUND", "요청한 리소스를 찾을 수 없습니다."),
    USER_NOT_FOUND(404, "USER_NOT_FOUND", "사용자를 찾을 수 없습니다."),
    CATEGORY_NOT_FOUND(404, "CATEGORY_NOT_FOUND", "카테고리를 찾을 수 없습니다."),
    TAG_NOT_FOUND(404, "TAG_NOT_FOUND", "태그를 찾을 수 없습니다."),
    CLASS_NOT_FOUND(404, "CLASS_NOT_FOUND", "클래스를 찾을 수 없습니다."),
    LECTURE_NOT_FOUND(404, "LECTURE_NOT_FOUND", "차시를 찾을 수 없습니다."),
    KIT_NOT_FOUND(404, "KIT_NOT_FOUND", "키트를 찾을 수 없습니다."),
    STEP_NOT_FOUND(404, "STEP_NOT_FOUND", "단계를 찾을 수 없습니다."),
    LIKE_USER_NOT_FOUND(404, "LIKE_USER_NOT_FOUND", "사용자 좋아요를 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(404, "REVIEW_NOT_FOUND", "리뷰를 찾을 수 없습니다."),
    QUESTION_NOT_FOUND(404, "QUESITON_NOT_FOUND", "문의를 찾을 수 없습니다."),
    ANSWER_NOT_FOUND(404, "ANSWER_NOT_FOUND", "답변을 찾을 수 없습니다."),
    LIVEROOM_NOT_FOUND(404,"LIVEROOM_NOT_FOUND", "라이브 방을 찾을 수 없습니다."),

    // 중복 관련 오류
    DUPLICATE_RESOURCE(409, "DUPLICATE_RESOURCE", "중복된 리소스가 있습니다."),
    DUPLICATE_USER(409, "DUPLICATE_USER", "중복된 사용자가 있습니다."),

    // 데이터베이스 관련 오류
    DATABASE_ERROR(500, "DATABASE_ERROR", "데이터베이스 오류가 발생했습니다."),

    // 기타 오류
    METHOD_NOT_ALLOWED(405, "METHOD_NOT_ALLOWED", "허용되지 않은 HTTP 메서드입니다."),
    UNSUPPORTED_MEDIA_TYPE(415, "UNSUPPORTED_MEDIA_TYPE", "지원되지 않는 미디어 타입입니다."),
    TOO_MANY_REQUESTS(429, "TOO_MANY_REQUESTS", "요청이 너무 많습니다."),
    SERVICE_UNAVAILABLE(503, "SERVICE_UNAVAILABLE", "서비스를 사용할 수 없습니다."),
    EMAIL_CODE_NOTEXIST(401, "EMAIL_CODE_NOTEXIST", "이메일에 해당하는 인증번호가 존재하지 않습니다.");

    private final int httpStatus;
    private final String code;
    private final String message;
}