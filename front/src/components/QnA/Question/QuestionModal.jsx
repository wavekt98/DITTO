import { useState, useEffect } from "react";
import styled from "styled-components";

import useAxios from "../../../hooks/useAxios";
import Modal from "../../common/Modal";
import OutlineButton from "../../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 150px;
  margin-top: 25px;
  margin-bottom: 40px;
  justify-content: space-between;
`;

const TitleInput = styled.input`
  font-family: inherit;
  width: 100%;
  height: 35px;
  padding: 0 10px;
  font-size: 16px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: var(--BORDER_COLOR);
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  font-family: inherit;
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  resize: none;
  border-color: var(--BORDER_COLOR);
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

function QuestionModal({
  show,
  classId,
  userId,
  onClose,
  onSubmit,
  isEdit = false,
  question,
}) {
  if (!show) {
    return null;
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && question) {
      setTitle(question.title);
      setContent(question.content);
    }
  }, [isEdit, question]);

  const { sendRequest } = useAxios();

  const handleAddQuestion = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newQuestion = {
      title: title,
      content: content,
      userId: userId,
    };

    try {
      await sendRequest(`/classes/${classId}/questions`, newQuestion, "post");
      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditQuestion = async () => {
    try {
      await sendRequest(
        `/classes/${classId}/questions/${question?.questionId}`,
        {
          title: title,
          content: content,
        },
        "patch"
      );
      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = isEdit ? handleEditQuestion : handleAddQuestion;

  return (
    <Modal onClose={onClose}>
      <Title>{isEdit ? "문의 수정" : "문의하기"}</Title>
      <ContentContainer>
        <TitleInput
          type="text"
          value={title}
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <ContentInput
          value={content}
          placeholder="내용을 입력해주세요."
          onChange={(e) => setContent(e.target.value)}
        />
      </ContentContainer>
      <OutlineButton label={isEdit ? "수정" : "작성"} onClick={handleSubmit} />
    </Modal>
  );
}

export default QuestionModal;