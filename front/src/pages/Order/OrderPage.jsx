import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import useAxios from "../../hooks/useAxios";
import RoundButton from "../../components/common/RoundButton";

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const Container = styled.div`
  height: 330px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-style: solid;
  border-color: var(--BORDER_COLOR);
  border-radius: 10px;
  border-width: 1px;
  margin: 30px 10px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const OrderInfo = styled(Container)`
  width: 65%;
  justify-content: space-between;
`;

const OrderPrice = styled(Container)`
  width: 30%;
  min-width: 250px;
  max-width: 300px;
  justify-content: space-between;
  padding: 25px;
`;

const ItemInfo = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 10px;
`;

const Insctructor = styled.div`
  font-size: 16px;
`;

const LectureDate = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const PriceDiv = styled.div`
  font-size: 18px;
`;

const Bold = styled(PriceDiv)`
  font-weight: 600;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const ContainerTitle = styled(Bold)`
  font-size: 20px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-size: 18px;
  margin-right: 5px;
  width: 15%;
`;

const Img = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 10px;
  margin-left: 5px;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 1px solid var(--BACKGROUND_SECONDARY);
`;

function OrderPage() {
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);

  const navigate = useNavigate();

  const handlePageAuth = () => {
    if (userId == null) {
      navigate("/");
      return;
    }
    if (roleId != 1) {
      navigate("/");
      return;
    }
  };

  useEffect(() => {
    handlePageAuth();
  }, []);

  const location = useLocation();

  // 나중에 Info 변수 통합할 예정 현재 test
  const [paymentInfo, setPaymentInfo] = useState({
    classId: "",
    lectureId: "",
  });
  const [classId, setClassId] = useState(null);
  const [lectureId, setLectureId] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [lectureList, setLectureList] = useState(null);
  const [lectureInfo, setLectureInfo] = useState(null);

  const { sendRequest: getClassInfo, sendRequest: getLectureList } = useAxios();

  const handleGetOrderInfo = async () => {
    try {
      const classResponse = await getClassInfo(
        `/classes/${classId}`,
        null,
        "get"
      );
      setClassInfo(classResponse?.data);
      const lectureResponse = await getLectureList(
        `/classes/${classId}/lectures`,
        null,
        "get"
      );
      setLectureList(lectureResponse?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setClassId(searchParams.get("classId"));
    setLectureId(searchParams.get("lectureId"));

    if (classId && lectureId) {
      setPaymentInfo({ classId, lectureId });
    }
  }, [location.search]);

  useEffect(() => {
    if (classId && lectureId) {
      handleGetOrderInfo();
    }
  }, [classId, lectureId, paymentInfo]);

  // lectureList에서 선택한 lectureId와 일치하는 lecture를 반환
  const findLectureById = (lectureList, lectureId) => {
    return (
      lectureList?.find((lecture) => lecture.lectureId == lectureId) || null
    );
  };

  useEffect(() => {
    if (lectureList && lectureId) {
      const lecture = findLectureById(lectureList, lectureId);
      setLectureInfo(lecture);
    }
  }, [lectureList, lectureId]);

  return (
    <OrderPageContainer>
      <Title>Order</Title>
      <LineContainer>
        <OrderInfo>
          <LineContainer>
            <Img
              src={`http://i11a106.p.ssafy.io:8080/files/download/${classInfo?.file?.fileId}`}
              alt="class-thumbnail"
            />
            <ItemInfo>
              <Bold>{classInfo?.className}</Bold>
              <Insctructor>{classInfo?.user?.nickname}</Insctructor>
              <LectureDate>
                {lectureInfo?.year}-
                {String(lectureInfo?.month).padStart(2, "0")}-
                {String(lectureInfo?.day).padStart(2, "0")}&nbsp;&nbsp;
                {String(lectureInfo?.hour).padStart(2, "0")}:
                {String(lectureInfo?.minute).padStart(2, "0")}
              </LectureDate>
            </ItemInfo>
            <Price>{classInfo?.classPrice.toLocaleString()} 원</Price>
          </LineContainer>
          <LineContainer>
            <Img
              src={`http://i11a106.p.ssafy.io:8080/files/download/${classInfo?.kit?.file?.fileId}`}
              alt="kit-img"
            />
            <Bold style={{ width: "50%", margin: "0 10px" }}>
              {classInfo?.kit?.kitName}
            </Bold>
            <Price>0 원</Price>
          </LineContainer>
        </OrderInfo>
        <OrderPrice>
          <ContainerTitle>금액</ContainerTitle>
          <PriceContainer>
            <LineContainer>
              <PriceDiv>총 상품금액</PriceDiv>
              <Bold>{classInfo?.classPrice.toLocaleString()} 원</Bold>
            </LineContainer>
            <LineContainer>
              <PriceDiv>배송비</PriceDiv>
              <Bold>+ 3,000 원</Bold>
            </LineContainer>
            <Hr />
            <LineContainer>
              <PriceDiv>결제 예정 금액</PriceDiv>
              <Bold>{(classInfo?.classPrice + 3000).toLocaleString()} 원</Bold>
            </LineContainer>
          </PriceContainer>
          <RoundButton label={"구매하기"} size="lg" />
        </OrderPrice>
      </LineContainer>
      <OrderInfo>
        <ContainerTitle>배송지 정보</ContainerTitle>
      </OrderInfo>
    </OrderPageContainer>
  );
}

export default OrderPage;
