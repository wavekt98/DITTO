import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

const Sidebar = styled.div`
  min-width: 240px;
  border-right: 1px solid var(--BORDER_COLOR);
  padding-top: 16px;
`;

const NavItem = styled(NavLink)`
  display: block;
  color: var(--TEXT_PRIMARY);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  padding: 16px 16px;
  cursor: pointer;

  &.active {
    font-weight: bold;
    color: var(--PRIMARY);
  }

  &:hover {
    color: var(--PRIMARY);
  }
`;

{/* <NavItem to="prouserinfo">계정 정보</NavItem>
<NavItem to="mileage">마일리지 출금</NavItem>
<NavItem to="proquestion">문의 내역</NavItem>
<NavItem to="userinfo">계정 정보</NavItem>
<NavItem to="payments">결제 내역</NavItem>
<NavItem to="questions">작성한 문의</NavItem>
<NavItem to="reviews">작성한 리뷰</NavItem>
<NavItem to="liked">관심 목록</NavItem> */}

const SidebarNav = () => {
  const roleId = useSelector(state => state.auth.roleId);
  
  return (
    <Sidebar>
      {roleId === "1" && (
        <>
          <NavItem to="/mypage/userinfo">계정 정보</NavItem>
          <NavItem to="/mypage/payments">결제 내역</NavItem>
          <NavItem to="/mypage/questions">작성한 문의</NavItem>
          <NavItem to="/mypage/reviews">작성한 리뷰</NavItem>
          <NavItem to="/mypage/liked">관심 목록</NavItem>
        </>
      )}
      {roleId === "2" && (
        <>
          <NavItem to="prouserinfo">계정 정보</NavItem>
          <NavItem to="mileage">마일리지 출금</NavItem>
          <NavItem to="proquestion">문의 내역</NavItem>
        </>
      )}
    </Sidebar>
  );
};

export default SidebarNav;