import { useState, useEffect } from "react";
import { styled } from "styled-components";

import useAxios from "../../hooks/useAxios";
import Modal from "../common/Modal";
import AddressList from "./AddressList";
import OutlineButton from "../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 40px;
  width: 100%;
  max-height: 320px;
  overflow: auto;
`;

function AddressListModal({ show, onClose, userId }) {
  if (!show) return null;

  const [addresses, setAddresses] = useState();
  const { sendRequest } = useAxios();

  const handleGetAddresses = async () => {
    try {
      const response = await sendRequest(
        `/mypage/${userId}/address`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
        "get"
      );
      setAddresses(response?.data?.addresses);
    } catch {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAddresses();
  }, []);

  return (
    <Modal onClose={onClose}>
      <Title>배송지 목록</Title>
      <ContentContainer>
        <AddressList addresses={addresses} isPayment={true} userId={userId} />
      </ContentContainer>
      <OutlineButton label={"선택"} />
    </Modal>
  );
}

export default AddressListModal;
