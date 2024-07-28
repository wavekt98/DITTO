import { useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

import useFormDataAxios from "../../../hooks/useFormDataAxios";
import RoundButton from "../../common/RoundButton";
import OutlineButton from "../../common/OutlineButton";
import DefaultProfileImage from "../../../assets/img/profile-user.png";

const ModalTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 32px;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 2px solid orange;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  color: var(--SECONDARY);
  margin-bottom: 48px;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

function ModifyProfileImage({ curProfileImageURL, handleProfileImageURL, onClose }) {
  // redux
  const userId = useSelector((state) => state.auth.userId);
  // axios
  const { sendRequest: patchImage } = useFormDataAxios();
  const { sendRequest: deleteImage } = useFormDataAxios(); 

  const [image, setImage] = useState(curProfileImageURL);
  const [imagePreview, setImagePreview] = useState(image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (userId && image !== null) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", image);

      await patchImage(`/profiles/image`, formData, "patch");
      handleProfileImageURL(URL.createObjectURL(image));
      onClose();
    }
  };

  const handleDelete = async() => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", image);

    await deleteImage(`/profiles/image`, formData, "delete");
    setImage(null);
    setImagePreview(null);
    handleProfileImageURL(null);
    onClose();
  }

  return (
    <>
      <ModalTitle>프로필 이미지</ModalTitle>
      <ProfileImage src={imagePreview || DefaultProfileImage} alt="Profile Image" />
      <FileInputLabel htmlFor="file-upload">파일 선택</FileInputLabel>
      <FileInput
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <ButtonsWrapper>
        <RoundButton label="수정" onClick={handleSubmit} />
        <OutlineButton label="삭제" color="default" onClick={handleDelete} />
      </ButtonsWrapper>
    </>
  );
}

export default ModifyProfileImage;
