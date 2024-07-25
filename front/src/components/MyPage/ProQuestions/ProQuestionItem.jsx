import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
  background-color: var(--WHITE);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 18px;
  color: var(--TEXT_PRIMARY);
  margin-bottom: 5px;
`;

const Content = styled.p`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
  margin-bottom: 10px;
`;

const MetaData = styled.div`
  font-size: 14px;
  color: var(--TEXT_TERTIARY);
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: var(--PRIMARY);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    filter: brightness(0.9);
  }
`;

const EditButton = styled(Button)`
  background-color: var(--SECONDARY);
`;

const DeleteButton = styled(Button)`
  background-color: var(--LIGHT);
  color: var(--RED);
  border: 1px solid var(--RED);
`;

const AnswerToggle = styled.button`
  background-color: transparent;
  color: var(--SECONDARY);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AnswerContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: var(--BACKGROUND_SECONDARY);
  border-radius: 5px;
`;

const AnswerText = styled.p`
  font-size: 16px;
  color: var(--TEXT_PRIMARY);
`;

const AnswerMetaData = styled.div`
  font-size: 14px;
  color: var(--TEXT_TERTIARY);
  display: flex;
  justify-content: space-between;
`;

const ProQuestionItem = ({ question, onAnswer, onEdit, onDelete }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  return (
    <Container>
      <QuestionHeader>
        <Title>{question.title}</Title>
        <div style={{ color: question.isAnswered ? 'var(--GREEN)' : 'var(--RED)' }}>
          {question.isAnswered ? '답변 완료' : '미답변'}
        </div>
      </QuestionHeader>
      <Content>{question.content}</Content>
      <MetaData>
        <div>{question.nickname} · {new Date(question.createdDate).toLocaleDateString()}</div>
      </MetaData>
      {question.isAnswered && (
        <AnswerToggle onClick={() => setIsAnswerVisible(!isAnswerVisible)}>
          {isAnswerVisible ? '답변 접기' : '답변 보기'}
        </AnswerToggle>
      )}
      {isAnswerVisible && question.isAnswered && (
        <AnswerContainer>
          <AnswerText>{question.answer.content}</AnswerText>
          <AnswerMetaData>
            <div>{new Date(question.answer.createdDate).toLocaleDateString()}</div>
            <div>
              <EditButton onClick={() => onEdit(question)}>수정</EditButton>
              <DeleteButton onClick={() => onDelete(question.questionId)}>삭제</DeleteButton>
            </div>
          </AnswerMetaData>
        </AnswerContainer>
      )}
      {!question.isAnswered && (
        <ButtonGroup>
          <Button onClick={() => onAnswer(question)}>답변하기</Button>
        </ButtonGroup>
      )}
    </Container>
  );
};

export default ProQuestionItem;
