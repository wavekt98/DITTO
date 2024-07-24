// src/pages/Login/LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { login } from '../../../features/auth/authSlice';
import KakaoLogin from './KaKaoLogin';
import { jwtDecode } from 'jwt-decode';  // jwt-decode 패키지 가져오기

// 스타일링 컴포넌트 정의
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  text-align: center;
`;

const FormTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  color: var(--TEXT_SECONDARY);
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  width: 300px;
`;

const FormLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
  min-width: 80px; /* 라벨의 최소 너비 설정 */
  text-align: right;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  font-size: 16px;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: var(--LIGHT);
  border: none;
  border-radius: 4px;
  color: var(--PRIMARY);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
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

const LoginDivider = styled.div`
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
`;

const LoginGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const SignUpLink = styled.a`
  margin-left: 5px; /* 링크와 텍스트 사이의 간격 조정 */
  color: var(--PRIMARY);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: row;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    if (!email || !password) {
      setError('이메일, 비밀번호을 입력해 주세요.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
      });

      const { accessToken, refreshToken, nickname } = response.data;
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.userId;
      const emailFromToken = decodedToken.email;

      dispatch(login({ accessToken, refreshToken, userId, nickname: nickname, email: emailFromToken })); // Redux 상태 업데이트
      alert("로그인 성공!");
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("로그인 에러:", error);
      setError('로그인 실패. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleLogin}>
        <FormTitle>로그인</FormTitle>
        <LoginDivider />
        <LoginGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>PW</FormLabel>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </LoginGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </SubmitButton>
        <Divider>간편 로그인</Divider>
        <SocialGroup>       
          <KakaoLogin />
        </SocialGroup>
        <SignUpGroup>
          <div>회원이 아니신가요? </div>
          <SignUpLink href="/signup">회원가입</SignUpLink>
        </SignUpGroup>
      </StyledForm>
    </FormContainer>
  );
};

export default LoginForm;
