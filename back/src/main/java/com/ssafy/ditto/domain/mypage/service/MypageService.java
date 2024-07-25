package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.mypage.dto.AddressRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageResponse;

public interface MypageService {
    MypageResponse getUserMypage(int userId);

    String modifyUser(int userId, MypageRequest mypageRequest);

    void insertAddress(int userId, AddressRequest addressRequest);

    void modifyAddress(int userId, int addressId, AddressRequest addressRequest);

    void deleteAddress(int userId, int addressId);
}
