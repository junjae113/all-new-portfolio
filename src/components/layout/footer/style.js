import styled from "styled-components";
import { flexCenter } from "../../../styles/common";

const S = {};

S.FooterWrapper = styled.footer`
  width: 100%;
  background-color: #cf4b05;
  padding: 50px 240px 70px 240px;
  color: #fff;
`;

S.MiniFooterWrapper = styled.footer`
  width: 100%;
  background-color: #cf4b05;
  padding: 20px 0;
  color: #fff;
  text-align: center;
`;

S.LogoWrapper = styled.div`
  padding-bottom: 30px;
  border-bottom: 2px solid #fff;
  img {
    width: 183px;
    height: 60px;
  }
`;

S.InfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
`;

S.LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

S.RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

S.ListWrap = styled.ul`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`;

export default S;
