import { useState } from "react";
import { styled } from "styled-components";

import RoundButton from "../../common/RoundButton";

const ModalTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 32px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-bottom: 48px;
  resize: none;

  &:hover {
    outline: none;
  }
`;

function ModifyIntro({ onClose }) {
  const [intro, setIntro] = useState("");

  const handleTextAreaChange = (event) => {
    setIntro(event.target.value);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <>
      <ModalTitle>소개글</ModalTitle>
      <Textarea value={intro} onChange={handleTextAreaChange} />
      <RoundButton label="수정" onClick={handleSubmit} />
    </>
  );
}

export default ModifyIntro;