package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StepRequest {
    private Integer stepNo;
    private String stepName;
    private String stepDetail;

    private Integer fileId;
    private String uploadFileName;
    private String storeFileName;
    private String fileUrl;
    private Long fileSize;

}