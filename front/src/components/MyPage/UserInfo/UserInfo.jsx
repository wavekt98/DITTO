import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { isPasswordMatch, isPasswordValid } from '../../../utils/passwordValidation'; // 비밀번호 확인 및 유효성 검사 함수 임포트
import { checkNicknameAvailability } from '../../../utils/checkNicknameAvailability'; // 닉네임 중복 확인 함수 임포트
import { useSelector, useDispatch } from 'react-redux';
import { changeNickname } from "../../../features/auth/authSlice";
import axios from "axios";
import useAxios from '../../../hooks/useAxios';
import useAuthAxios from "../../../hooks/useAuthAxios";
import useFormDataAxios from '../../../hooks/useFormDataAxios';
import axiosIntercepter from '../../../features/axiosIntercepter';
import defaultProfile from '../../../assets/img/profile-user.png';
import RoundButton from "../../../components/common/RoundButton";
import OutlineButton from "../../../components/common/OutlineButton";
import WriteIcon from "../../../assets/icon/profile/write-white.png";
import ModifyProfileImage from './ModifyProfileImage';
import Modal from '../../common/Modal';

const UserInfoContainer = styled.div`
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 32px;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 100%;
  border: 1px solid var(--BORDER_COLOR);
`;

const ProfileEditButton = styled.button`
  position: absolute;
  background-color: var(--SECONDARY);
  border: none;
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.position &&
    `top: ${props.position.top}; left: ${props.position.left};`}
`;

const ProfileIconImage = styled.img`
  width: 16px;
  height: 16px;
`;


const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  font-weight: 600;
  color: var(--TEXT_SECONDARY);
  margin-bottom: 8px;
`;

const ProfileInput = styled.input`
  padding: 12px 16px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 16px;
  width: 100%;
  font-size: 14px;
  &[readonly] {
    pointer-events: none;
    background-color: var(--BACKGROUND_COLOR); /* Gray background color */
    color: var(--TEXT_SECONDARY); /* Adjust text color if needed */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;
  gap: 12px;
`;

const ErrorMessage = styled.p`
  color: var(--RED);
  margin: 4px 0 0 0;
  font-size: 14px;
`;

const UserInfo = ({ userData }) => {
  // redux
  const dispatch = useDispatch();
  const domain = useSelector((state) => state.auth.domain);
  // axios
  const { sendRequest: patchImage } = useFormDataAxios();
  const { sendRequest } = useAxios();
  const { sendAuthRequest } = useAuthAxios();
  const { email, nickname, userId } = useSelector((state) => state.auth);
  const [curProfileImage, setCurProfileImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordValidState, setIsPasswordValidState] = useState(true);
  const [isPasswordMatchState, setIsPasswordMatchState] = useState(false);
  const [isNicknameAvailableState, setIsNicknameAvailableState] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [error, setError] = useState('');
  // modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // 초기 form 구성
  useEffect(()=>{
    if(userData){
      const fileId = userData?.data?.fileId;
      if(fileId){
        handleGetProfileImage(fileId);
      }
    }
  },[userData]);

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleGetProfileImage = async(fileId) => {    
    const baseURL = import.meta.env.VITE_BASE_URL;

    const response = await axios.get(`${baseURL}/files/download/${fileId}`, {
      responseType: 'blob'
    });
    const fileBlob = response.data;
    const base64 = await toBase64(fileBlob);

    setCurProfileImage(base64);
  }

  // 마이페이지 수정
  const handlePasswordChange = (event) => {
    const curPassword = event.target.value;
    setIsPasswordValidState(isPasswordValid(curPassword));
    setPassword(curPassword);
  }

  const handleConfirmPasswordChange = (event) => {
    const curConfirmPassword = event.target.value;
    setIsPasswordMatchState(isPasswordMatch(password, curConfirmPassword));
    setConfirmPassword(curConfirmPassword);
  }

  const handleNicknameChange = async(event) => {
    const curNickname = event.target.value;
    setName(curNickname);
    if(curNickname){
      try {
        const isAvailable = await checkNicknameAvailability(nickname);
        setIsNicknameAvailableState(isAvailable);
        setNicknameMessage(isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.");
      } catch (error) {
        console.error(error.message);
        setIsNicknameAvailableState(false);
        setNicknameMessage(error.message);
      }
    }
  }

  const checkError = () => {
    if (!isPasswordMatchState) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isPasswordValidState) {
      setError('비밀번호가 유효하지 않습니다.');
      return;
    }

    if (!isNicknameAvailableState) {
      setError('사용할 수 없는 닉네임입니다.');
      return;
    }

    setError(false);
  }

  const handleCancel = () => {
    //setPassword('');
    setError('');
    setConfirmPassword('');
    setName(nickname);
    setNicknameMessage('');
    setIsNicknameAvailableState(true);
    checkError();
  };

  const handleSave = async () => {
    if(error) {
      alert("회원 정보를 수정할 수 없습니다.");
      return;
    }

    try {
      const patchData = {
        password: password,
        nickname: name,
      };

      const response = await sendAuthRequest(`/mypage/${userId}`, patchData, "patch");
      if (response.code == 200) {
        console.log('수정 성공:', patchData);
        dispatch(changeNickname({ nickname: name }));
      } else {
        setError('수정 실패. 다시 시도해주세요.');
      }
      alert('수정 성공:', patchData);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('이미 사용중인 닉네임입니다.');
      } else {
        console.error('저장 에러:', error);
        setError('저장 실패. 다시 시도해주세요.');
      }
    }
  };

  useEffect(()=>{
    checkError();
  },[isPasswordMatchState, isPasswordValidState, isNicknameAvailableState]);

  useEffect(()=>{
    if(nickname){
      setName(nickname);
    }
  },[nickname]);

  return (
    <UserInfoContainer>
      <ProfileImageContainer>
        <ProfileImageWrapper>
          <ProfileImage src={curProfileImage || defaultProfile} alt="Profile" />
          <ProfileEditButton
            position={{ top: "10px", left: "120px"}}
            onClick={handleOpenProfileModal}
          >
            <ProfileIconImage src={WriteIcon} alt="Edit Icon" />
          </ProfileEditButton>
        </ProfileImageWrapper>
      </ProfileImageContainer>
      <ProfileInfo>
        <ProfileField>
          <InputLabel>Email</InputLabel>
          <ProfileInput type="text" value={email || ''} readOnly />
        </ProfileField>
        {(domain==="local") && <>
          <ProfileField>
          <InputLabel>PW</InputLabel>
          <ProfileInput
            type="password"
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isPasswordValidState && <ErrorMessage>영어, 숫자, 특수문자 포함 8~32자로 설정해주세요.</ErrorMessage>}
        </ProfileField>
        <ProfileField>
          <InputLabel>PW 확인</InputLabel>
          <ProfileInput
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!isPasswordMatchState && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </ProfileField>
        </>}
        <ProfileField>
          <InputLabel>닉네임</InputLabel>
          <ProfileInput
            type="text"
            placeholder={name || "닉네임"}
            name="nickname"
            value={name || ''}
            onChange={handleNicknameChange}
          />
          {!isNicknameAvailableState && <ErrorMessage>{nicknameMessage}</ErrorMessage>}
        </ProfileField>
      </ProfileInfo>
      <ButtonGroup>
        <OutlineButton label="취소" $cancel onClick={handleCancel} />
        <RoundButton label="수정" onClick={handleSave} />
      </ButtonGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {isProfileModalOpen && (
        <Modal onClose={handleCloseProfileModal}>
          <ModifyProfileImage
            curProfileImage={curProfileImage}
            handleProfileImage={setCurProfileImage}
            onClose={handleCloseProfileModal} />
        </Modal>
      )}


    </UserInfoContainer>
  );
};

export default UserInfo;