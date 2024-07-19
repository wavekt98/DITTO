import { useEffect, useState, useMemo } from "react";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import TabBar from "../../components/Board/TabBar";
import Filter from "../../components/Board/BoardList/Filter";
import SelectBox from "../../components/Board/BoardList/SelectBox";
import PostList from "../../components/Board/BoardList/PostList";
import PaginationBar from "../../components/Board/BoardList/PaginationBar";
import Button from "../../components/common/Button";
import SelectTag from "../../components/Board/BoardList/SelectTag";

const FilterWrapper = styled.div`
  display: flex;
  gap: 48px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 480px;
  padding: 6px 8px;
  border-radius: 10px;
  background-color: var(--LIGHT);
  border: 1px solid var(--BORDER_COLOR);

  &:focus {
    outline: none;
  }
`;

const CustomSearchIcon = styled(BsSearch)`
  color: var(--LIGHT);
  font-size: 16px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: var(--TEXT-PRIMARY);
  margin-top: 48px;
`;

const SearchOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

// 상수화된 옵션들
const CATEGORY_OPTIONS = [
  { value: "전체", label: "전체" },
  { value: "리빙", label: "리빙" },
  { value: "패브릭", label: "패브릭" },
  { value: "아트", label: "아트" },
  { value: "푸드", label: "푸드" },
];

const SEARCH_OPTIONS = [
  { value: "전체", label: "전체" },
  { value: "제목", label: "제목" },
  { value: "작성자", label: "작성자" },
];

const SORT_OPTIONS = [
  { value: "최신순", label: "최신순" },
  { value: "오래된순", label: "오래된순" },
];

function BoardListPage() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log(path);

  // 검색 옵션 시작 ///////////////////////////////////////
  const [category, setCategory] = useState("전체");
  const [tag, setTag] = useState(null);
  const [searchOption, setSearchOption] = useState("제목");
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleCategory = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleTag = (tagValue) => {
    console.log(tagValue);
    setKeyword(tagValue);
    setTag(tagValue);
  };

  const handleSearchOption = (event) => {
    console.log(event.target.value);
    setSearchOption(event.target.value);
  };

  const handleKeyword = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };

  const handleSortOption = (event) => {
    console.log(event.target.value);
    setSortOption(event.target.value);
  };

  // 검색 옵션 끝 ///////////////////////////////////////

  //tags
  const [tags, setTags] = useState([
    { value: "향수", label: "향수" },
    { value: "향수2", label: "향수2" },
  ]);

  // posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts([
      {
        postId: 1,
        title: "제목입니다.",
        userName: "작성자",
        createdDate: "2000-09-27",
        likeCount: 2,
        viewCount: 33,
      },
      {
        postId: 2,
        title: "제목입니다.",
        userName: "작성자",
        createdDate: "2000-09-27",
        likeCount: 2,
        viewCount: 33,
      },
      {
        postId: 3,
        title: "제목입니다.",
        userName: "작성자",
        createdDate: "2000-09-27",
        likeCount: 2,
        viewCount: 33,
      },
      {
        postId: 4,
        title: "제목입니다.",
        userName: "작성자",
        createdDate: "2000-09-27",
        likeCount: 2,
        viewCount: 33,
      },
      {
        postId: 5,
        title: "제목입니다.",
        userName: "작성자",
        createdDate: "2000-09-27",
        likeCount: 2,
        viewCount: 33,
      },
      // 추가 게시물 데이터
    ]);
  }, []);

  // pagination 시작 ///////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const postsPerPage = 3;

  // 페이지 번호 계산을 useMemo로 최적화
  const pageNumbers = useMemo(() => {
    const size = Math.ceil(
      (posts.length - (currentSection - 1) * postsPerPage) / postsPerPage,
    );
    const ret = [];
    for (let i = 1; i <= size; i++) {
      ret.push(i);
    }
    return ret;
  }, [currentSection, posts.length]);

  // 현재 posts 계산을 useMemo로 최적화
  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, posts, postsPerPage]);

  const handlePage = (number) => {
    setCurrentPage(number);
    setCurrentSection(Math.ceil(number / 10));
  };
  // pagination 끝 ////////////////////////////////////////

  return (
    <div>
      <TabBar />

      {/* 필터 목록 시작 */}
      <FilterWrapper>
        <Filter title="카테고리">
          <SelectBox options={CATEGORY_OPTIONS} onChange={handleCategory} />
        </Filter>

        <Filter title="태그">
          <SelectTag tags={tags} curTag={tag} handleTag={handleTag} />
        </Filter>
      </FilterWrapper>
      <FilterWrapper>
        <Filter title="검색">
          <SelectBox options={SEARCH_OPTIONS} onChange={handleSearchOption} />
          <Input onChange={handleKeyword} />
          <Button label={<CustomSearchIcon />} size="md" />
        </Filter>
      </FilterWrapper>
      {/* 필터 목록 끝 */}

      <PageTitle>페이지 타이틀</PageTitle>

      {/* 검색 옵션 시작 */}
      <SearchOptionWrapper>
        <SelectBox options={SORT_OPTIONS} onChange={handleSortOption} />
        <Button label="글쓰기" size="md" />
      </SearchOptionWrapper>
      {/* 검색 옵션 끝 */}

      <PostList posts={currentPosts} />

      <PaginationBar
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        handleClick={handlePage}
      />
    </div>
  );
}

export default BoardListPage;
