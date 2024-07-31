import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";
import ClassThumbnail from "../../components/Class/ClasDetail/ClassThumbnail";
import ClassInfo from "../../components/Class/ClasDetail/ClassInfo";
import ClassSideBar from "../../components/Class/ClasDetail/ClassSideBar";
import TabBar from "../../components/Class/ClasDetail/TabBar";

const ClassDetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClassBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 1% 5%;
`;

function ClassDetailPage() {
  const titleIds = ["1", "2", "3"];

  // redux
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);

  // axios
  const { sendRequest: getClassInfo, sendRequest: getLectureList } = useAxios();

  // router
  const { classId } = useParams();

  const [classInfo, setClassInfo] = useState(null);
  const [lectureList, setLectureList] = useState([]);

  const handleGetClass = async () => {
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
      console.error("Error fetching class info:", error);
    }
  };

  const updateLectureList = async () => {
    try {
      const lectureResponse = await getLectureList(
        `/classes/${classId}/lectures`,
        null,
        "get"
      );
      setLectureList(lectureResponse?.data);
    } catch (error) {
      console.error("Error updating lecture list:", error);
    }
  };

  useEffect(() => {
    handleGetClass();
  }, [classId]); // classId가 변경될 때마다 handleGetClass 호출

  return (
    <ClassDetailPageContainer>
      {classInfo && (
        <>
          <ClassThumbnail
            classInfo={classInfo}
            file={classInfo?.file}
            instructor={classInfo?.user}
            tag={classInfo?.tag}
          />
          <TabBar titleIds={titleIds} />
          <ClassBody>
            <ClassInfo
              classInfo={classInfo}
              titleIds={titleIds}
              userId={userId}
              roleId={roleId}
            />
            <ClassSideBar
              classInfo={classInfo}
              lectureList={lectureList}
              userId={userId}
              roleId={roleId}
              updateLectureList={updateLectureList}
            />
          </ClassBody>
        </>
      )}
    </ClassDetailPageContainer>
  );
}

export default ClassDetailPage;