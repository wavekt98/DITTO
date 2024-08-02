// src/components/MyPage/LikedUsers.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
`;

const UserCard = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
  font-size: 40px;
  object-fit: cover;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserName = styled.h3`
  color: var(--TEXT_PRIMARY);
  margin-bottom: 5px;
  font-size: 16px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.div`
  color: var(--SECONDARY);
  border: 1px solid var(--SECONDARY);
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
  font-size: 13px;
`;

const HeartIcon = styled.span`
  color: var(--RED);
  font-size: 17px;
  cursor: pointer;
`;

const LikedUsers = ({ users, onLikeCancel }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Container>
      <UserContainer>
        {users.map((user) => (
          <UserCard key={user.userId}>
            <UserImage src={user.fileUrl} alt={user.nickname} onClick={() => handleUserClick(user.userId)} />
            <UserInfo>
              <UserName>{user.nickname} <HeartIcon onClick={() => onLikeCancel(user.userId)}>❤</HeartIcon></UserName>
              <TagContainer>
                {user.tags.map((tag) => (
                  <Tag key={tag.tagId}>{tag.tagName}</Tag>
                ))}
              </TagContainer>
            </UserInfo>
          </UserCard>
        ))}
      </UserContainer>
    </Container>
  );
};

export default LikedUsers;