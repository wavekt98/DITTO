package com.ssafy.ditto.domain.payment.dto;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChargingHistoryDto {
    private Long paymentHistoryId;
    @NonNull
    private Long amount;
    @NonNull
    private String orderName;
    private boolean isPaySuccessYN;
    private LocalDateTime createdAt;
}
