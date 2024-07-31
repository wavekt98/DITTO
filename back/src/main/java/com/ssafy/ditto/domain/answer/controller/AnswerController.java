package com.ssafy.ditto.domain.answer.controller;

import com.ssafy.ditto.domain.answer.dto.AnswerRequest;
import com.ssafy.ditto.domain.answer.dto.AnswerResponse;
import com.ssafy.ditto.domain.answer.service.AnswerService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions/{questionId}/answers")
@RequiredArgsConstructor
@Tag(name = "Answer", description = "Answer API")
public class AnswerController {
    private final AnswerService answerService;

    @Operation(summary = "클래스 문의 답변 작성", description = "질문 ID에 따라 답변을 작성합니다.")
    @ApiResponse(responseCode = "200", description = "답변이 성공적으로 작성되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    @PostMapping
    public ResponseDto<Void> createAnswer(@PathVariable Integer questionId, @RequestBody AnswerRequest answerRequest) {
        answerService.createAnswer(questionId, answerRequest);
        return ResponseDto.of(200, "답변이 성공적으로 작성되었습니다.");
    }

    @Operation(summary = "클래스 문의 답변 수정", description = "질문 ID와 답변 ID에 따라 답변을 수정합니다.")
    @ApiResponse(responseCode = "200", description = "답변이 성공적으로 수정되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    @PatchMapping("/{answerId}")
    public ResponseDto<Void> updateAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId, @RequestBody AnswerRequest answerRequest) {
        answerService.updateAnswer(answerId, answerRequest);
        return ResponseDto.of(200, "답변이 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "클래스 문의 답변 삭제", description = "질문 ID와 답변 ID에 따라 답변을 삭제합니다.")
    @ApiResponse(responseCode = "200", description = "답변이 성공적으로 삭제되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    @DeleteMapping("/{answerId}")
    public ResponseDto<Void> deleteAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId) {
        answerService.deleteAnswer(answerId);
        return ResponseDto.of(200, "답변이 성공적으로 삭제되었습니다.");
    }

    @Operation(summary = "클래스 문의 답변 조회", description = "질문 ID에 따라 답변을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "답변이 성공적으로 조회되었습니다.", content = @Content(schema = @Schema(implementation = AnswerResponse.class)))
    @GetMapping
    public ResponseDto<AnswerResponse> getAnswer(@PathVariable Integer questionId) {
        AnswerResponse answerResponse = answerService.getAnswer(questionId);
        return ResponseDto.of(200, "답변이 성공적으로 조회되었습니다.", answerResponse);
    }
}
