import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import KakaoLogin from '../login/KaKaoLogin';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md"; // 아이콘 import
import ProSignupForm from "../signup/ProSignupForm";

// 스타일링 컴포넌트 정의
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px;
  text-align: center;
`;

const FormTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  color: var(--TEXT_SECONDARY);
`;

const RoleToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const RoleButton = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ $active }) => ($active === 'true' ? 'var(--PRIMARY)' : 'var(--BORDER_COLOR)')};
  background-color: ${({ $active }) => ($active === 'true' ? 'var(--PRIMARY)' : 'transparent')};
  color: ${({ $active }) => ($active === 'true' ? '#fff' : 'var(--TEXT_SECONDARY)')};
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
`;

const EmailFormGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  font-size: 16px;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const VerifyButton = styled.button`
  padding: 8px 15px;
  background-color: var(--PRIMARY);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;
  white-space: nowrap;
  &:hover {
    background-color: var(--PRIMARY_DARK);
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: var(--PRIMARY);
  border: none;
  border-radius: 15px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: var(--PRIMARY_DARK);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--BORDER_COLOR);
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
`;

const SignDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px 0px;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--BORDER_COLOR);
  }
`;

const SocialGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  & > * {
    margin: 0 5px;
  }
`;

const SignUpGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SignUpLink = styled.a`
  margin-left: 5px;
  color: var(--PRIMARY);
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
`;

const TermsLink = styled.span`
  margin-left: 5px;
  color: var(--PRIMARY);
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const PasswordMatchMessage = styled.div`
  color: ${({ $isMatch }) => ($isMatch ? 'green' : 'red')};
  font-size: 14px;
  margin-top: 5px;
`;

const PasswordValidMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const NicknameCheckMessage = styled.div`
  color: ${({ $isAvailable }) => ($isAvailable ? 'green' : 'red')};
  font-size: 14px;
  margin-top: 5px;
`;

// 오버레이 스타일 정의
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

// 모달 컨테이너 스타일 정의
const ModalContainer = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;

  // 모달 애니메이션 (옵션)
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  opacity: 1;
`;

// 커스텀 아이콘 스타일 정의
const CustomCloseIcon = styled(MdClose)`
  position: absolute; // 절대 위치 설정
  top: 16px; // 상단에서 16px 떨어진 위치
  right: 16px; // 오른쪽에서 16px 떨어진 위치
  cursor: pointer;
  font-size: 32px; // 아이콘 크기
  color: var(--SECONDARY); // 아이콘 색상

  &:hover {
    color: var(--SECONDARY_DARK); // 호버시 색상
  }
`;

const Modal = ({ onClose, children }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CustomCloseIcon onClick={onClose} />
        {children}
      </ModalContainer>
    </Overlay>
  );
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    role: 1, // 1 관리자, 2 일반, 3 강사
    agreeTOS: false,
    agreePICU: false,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isVerificationCodeInputVisible, setIsVerificationCodeInputVisible] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [termsContent, setTermsContent] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');
  const [isInstructorStep, setIsInstructorStep] = useState(false); // 강사 추가 정보 입력 단계 여부
  const navigate = useNavigate();

  useEffect(() => {
    setIsPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    setIsPasswordValid(passwordRegex.test(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleEmailVerification = async () => {
    try {
      await axios.post('https://localhost:8080/users/signup/email', { email: formData.email });
      alert("인증 코드가 이메일로 전송되었습니다.");
      setIsVerificationCodeInputVisible(true);
    } catch (error) {
      console.error("인증 코드 전송 에러:", error);
      alert("인증 코드 전송 실패. 다시 시도해주세요.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('https://localhost:8080/users/signup/auth', {
        code: formData.verificationCode,
      });
      if (response.status === 200) {
        setIsVerified(true);
        alert("인증 성공!");
      } else if (response.status === 400) {
        alert("인증 코드가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증 코드 확인 에러:", error);
      alert("인증 코드 확인 중 오류가 발생했습니다.");
    }
  };

  const handleNicknameChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value) {
      try {
        const response = await axios.get(`https://localhost:8080/users/signup/nickname/${value}`);
        if (response.status === 200) {
          setIsNicknameAvailable(true);
          setNicknameMessage("사용 가능한 닉네임입니다.");
        } else if (response.status === 409) {
          setIsNicknameAvailable(false);
          setNicknameMessage("이미 사용 중인 닉네임입니다.");
        }
      } catch (error) {
        console.error("닉네임 중복 확인 에러:", error);
        setIsNicknameAvailable(false);
        setNicknameMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isPasswordValid) {
      alert("비밀번호가 유효하지 않습니다.");
      return;
    }
    if (!isNicknameAvailable) {
      alert("사용할 수 없는 닉네임입니다.");
      return;
    }
    if (!formData.agreeTOS || !formData.agreePICU) {
      alert("모든 약관에 동의해주세요.");
      return;
    }

    if (formData.role === 3) {
      // 강사일 경우, 강사 추가 정보 입력 단계로 이동
      setIsInstructorStep(true);
    } else if (formData.role ===2) {
      // 일반 사용자일 경우, 서버에 데이터 전송
      try {
        const response = await axios.post('https://localhost:8080/users/signup', {
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
          role: formData.role,
          agreeTOS: formData.agreeTOS,
          agreePICU: formData.agreePICU,
        });
        console.log(response.data);
        alert("회원가입 성공!");
        navigate('/'); // 홈화면으로 이동
      } catch (error) {
        console.error(error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  const openTermsModal = async () => {
    try {
      const response = await axios.get('https://localhost:8080/users/signup/0');
      setTermsContent(response.data.agree);
      setIsTermsModalOpen(true);
    } catch (error) {
      console.error("이용약관 불러오기 에러:", error);
      alert("이용약관 불러오기 실패. 다시 시도해주세요.");
    }
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const openPrivacyModal = async () => {
    try {
      const response = await axios.get('https://localhost:8080/users/signup/1');
      setPrivacyContent(response.data.agree);
      setIsPrivacyModalOpen(true);
    } catch (error) {
      console.error("개인정보 처리방침 불러오기 에러:", error);
      alert("개인정보 처리방침 불러오기 실패. 다시 시도해주세요.");
    }
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const handleAgreeTOSClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      agreeTOS: !prevFormData.agreeTOS,
    }));
  };

  const handleAgreePICUClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      agreePICU: !prevFormData.agreePICU,
    }));
  };

  return (
    <FormContainer>
      {!isInstructorStep ? ( // isInstructorStep에 !를 붙이면 일반 회원가입 페이지 안붙이면 강사 회원가입 페이지 확인가능
        <StyledForm onSubmit={handleSubmit}>
          <FormTitle>회원가입</FormTitle>
          <SignDivider />
          <RoleToggle>
            <RoleButton
              type="button"
              $active={formData.role === 2 ? 'true' : 'false'}
              onClick={() => handleRoleChange(2)}
            >
              일반
            </RoleButton>
            <RoleButton
              type="button"
              $active={formData.role === 3 ? 'true' : 'false'}
              onClick={() => handleRoleChange(3)}
            >
              강사
            </RoleButton>
          </RoleToggle>
          <FormGroup>
            <FormLabel>닉네임</FormLabel>
            <FormInput
              type="text"
              name="nickname"
              placeholder="특수문자 제외 2~15자"
              value={formData.nickname}
              onChange={handleNicknameChange}
              required
            />
            <MessageWrapper>
              <NicknameCheckMessage $isAvailable={isNicknameAvailable}>
                {nicknameMessage}
              </NicknameCheckMessage>
            </MessageWrapper>
          </FormGroup>
          <FormGroup>
            <FormLabel>EMAIL</FormLabel>
            <EmailFormGroup>
              <FormInput
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <VerifyButton type="button" onClick={handleEmailVerification}>인증</VerifyButton>
            </EmailFormGroup>
          </FormGroup>
          {isVerificationCodeInputVisible && (
            <FormGroup>          
              <FormLabel>인증번호</FormLabel>
              <EmailFormGroup>
                <FormInput
                  type="text"
                  name="verificationCode"
                  placeholder="인증번호 입력"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  required
                />
                <VerifyButton type="button" onClick={handleVerifyCode}>확인</VerifyButton>
              </EmailFormGroup>
            </FormGroup>
          )}
          <FormGroup>
            <FormLabel>PW</FormLabel>
            <FormInput
              type="password"
              name="password"
              placeholder="영어, 숫자, 특수문자 포함 8~32자"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <MessageWrapper>
              {!isPasswordValid && (
                <PasswordValidMessage>
                  영어, 숫자, 특수문자 포함 8~32자로 설정해주세요.
                </PasswordValidMessage>
              )}
            </MessageWrapper>
          </FormGroup>
          <FormGroup>
            <FormLabel>PW 확인</FormLabel>
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="영어, 숫자, 특수문자 포함 8~32자"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <MessageWrapper>
              <PasswordMatchMessage $isMatch={isPasswordMatch}>
                {isPasswordMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
              </PasswordMatchMessage>
            </MessageWrapper>
          </FormGroup>
          <CheckboxGroup onClick={handleAgreeTOSClick}>
            <input
              type="checkbox"
              name="agreeTOS"
              checked={formData.agreeTOS}
              onChange={handleChange}
              required
            />
            <CheckboxLabel>이용약관에 동의합니다</CheckboxLabel>
            <TermsLink onClick={(e) => { e.stopPropagation(); openTermsModal(); }}>약관 보기</TermsLink>
          </CheckboxGroup>
          <CheckboxGroup onClick={handleAgreePICUClick}>
            <input
              type="checkbox"
              name="agreePICU"
              checked={formData.agreePICU}
              onChange={handleChange}
              required
            />
            <CheckboxLabel>개인정보 처리방침에 동의합니다</CheckboxLabel>
            <TermsLink onClick={(e) => { e.stopPropagation(); openPrivacyModal(); }}>약관 보기</TermsLink>
          </CheckboxGroup>
          <SubmitButton type="submit" disabled={!isPasswordMatch || !isNicknameAvailable || !isPasswordValid || !formData.agreeTOS || !formData.agreePICU}>Next</SubmitButton>
          <Divider>간편 가입</Divider>
          <SocialGroup>
            <KakaoLogin />
          </SocialGroup>
          <SignUpGroup>
            <div>이미 회원이신가요?</div>
            <SignUpLink href="/login">로그인</SignUpLink>
          </SignUpGroup>
        </StyledForm>
      ) : (
        <ProSignupForm formData={formData} setFormData={setFormData} />
      )}
      {isTermsModalOpen && (
        <Modal onClose={closeTermsModal}>
          <h2>이용약관</h2>
          <p>{termsContent}</p>
        </Modal>
      )}
      {isPrivacyModalOpen && (
        <Modal onClose={closePrivacyModal}>
          <h2>개인정보 처리방침</h2>
          <p>{privacyContent}</p>
        </Modal>
      )}
    </FormContainer>
  );
};

export default SignupForm;