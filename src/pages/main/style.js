import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import BasicButton from "../../components/button/BasicButton";

const S = {};

S.Input = styled.input`
  color: ${({ color }) => {
    return color;
  }};
  background-color: ${({ backgroundColor }) => {
    return backgroundColor;
  }};
  ${spacingProps}
`;

S.HeroBanner = styled.div`
  background-color: #FFF5EF;
  height: 620px;
  margin: 200px 240px 100px 240px;
  border-left: solid #CF4B05 24px;
  border-radius: 24px;
  padding: 36px;
  min-width: 1440px;
`
S.ExceptButtonWrapper = styled.div`
  display: flex;
`

S.CircleWrapper = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  margin-left: 180px;
`

S.FirstCircle = styled.div`
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background-color: rgba(255, 186, 44, 0.22);  /* opacity 대신 rgba */
`

S.SecondCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  height: 330px;
  border-radius: 50%;
  background-color: rgba(255, 186, 44, 0.38);
`

S.ImgWrapper = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
`

S.Logo = styled.img`
  height: 240px;
  object-position: -260px center;
`

S.TextWrapper = styled.div`
  p{
    color: #CF4B05;
  };
  margin-top: -36px;
`

S.ButtonWrapper = styled.div`
  display: flex;
  height: 100px;
  margin-top: 88px;
  gap: 60px;
`

S.SignInButton = styled(BasicButton)`
  border-radius: 24px;
  background-color: white;
  border: solid 3px #CF4B05;
  color: #CF4B05;
`

S.ExploreButton = styled(BasicButton)`
  border-radius: 24px;
  background-color: #CF4B05;
`

export default S;
