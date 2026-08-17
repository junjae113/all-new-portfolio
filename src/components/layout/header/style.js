import styled from "styled-components";
import { flexCenter, flexRow, flexSpaceBetween } from "../../../styles/common";
import Text from "../../text/size";
import { Link } from "react-router-dom";

const S = {};

S.HeaderWrapper = styled.header`
  ${flexSpaceBetween};
  background: #fff5ec;
  padding: 20px 240px;
  position: fixed;
  height: 100px;
  top: 0;
  width: 100%;
  z-index: 999;
`;

S.LogoWrapper = styled.div`
  ${flexCenter}

  a {
    width: 183px;
    height: 60px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

S.Menu = styled.nav`
  ${flexCenter};
  gap: 0 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

S.MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
  
  &:hover {
    color: #cf4b05;
  }
`;

S.RightMenu = styled.div`
  ${flexRow};
`;

S.IconWrap = styled.div`
  ${flexRow};
  gap: 0 22px;
`;

S.ButtonWrap = styled.div`
  ${flexRow};
  gap: 0 30px;
`;

S.ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 40px;
  border: 2px solid #cf4b05;
`;

S.Badge = styled.div`
  position: relative;
  display: flex;

  svg {
    width: 30px;
    height: 30px;
  }
`;

S.BadgeCount = styled.span`
  position: absolute;
  width: 25px;
  height: 25px;
  ${flexCenter};
  top: -13px;
  right: -10px;
  background-color: #cf4b05;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50%;
`;

S.ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

S.LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  ${Text.Body3} {
    color: #666;
    font-size: 12px;
  }
`;

export default S;
