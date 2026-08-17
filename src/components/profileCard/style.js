import styled from "styled-components";
import {flexCenter, flexColumn, flexColumnCenter} from "../../styles/common";
import {spacingProps} from "../../styles/spacingProps";
import {animations, commonAnimations} from "../../styles/animations";

const S = {};

S.ProfileCardWrapper = styled.div`
  padding: 40px 24px;
  ${flexColumnCenter};
  ${spacingProps}
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  box-shadow: 4px 4px 14px 0 rgba(0, 0, 0, 0.25);
  border-radius: 34px;
  max-width: 500px;
`;

S.ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

S.ProfileInfo = styled.div`
  ${flexColumnCenter};
`;



S.TooltipContainer = styled.div`
  position: relative;
  ${commonAnimations.tooltipFloat}

  p {
    position: absolute;
    top: 11px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
  }
`;

S.ProfileInfoHeader = styled.div`
  ${flexCenter};
  gap: 0 8px;
  position: relative;
  margin-top: 24px;

  div {
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    img {
      width: 30px;
    }
  }

  h6 {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
  }
`;

S.HeartIcon = styled.div`
  cursor: pointer;
`;

S.ProfileInfoItem = styled.div`
  ${flexCenter};
  gap: 0 20px;
  margin-top: 18px;

  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
    color:rgb(108, 108, 108);
    position: relative;
  }

  p::after {
    content: "";
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    right: -10px;
    width: 1px;
    height: 80%;
    background-color:rgb(184, 184, 184);
  }

  p:last-child::after {
    display: none;
  }
`;


S.ProfileInfoButton = styled.div`
  ${flexCenter};
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;


S.ProfileInfoList = styled.div`
  ${flexColumn};
  gap: 10px 0;
  margin-top: 30px;
  align-items: flex-start;
`;

S.ProfileInfoListItem = styled.div`
  ${flexCenter};
  gap: 0 20px;
`;

S.ProfileInfoListItemLabel = styled.div`
  ${flexCenter};
  gap: 0 5px;

  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
  }
`;

S.ProfileInfoListItemValue = styled.div`
  p {
    color:${({ theme }) => theme.PALLETE.text.sub};
  }
  
`;

S.ProfileInfoStatistics = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 30px;
  padding: 16px 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.PALLETE.background.gray100};
`;

S.ProfileInfoStatisticsItem = styled.div`
  ${flexColumn};
  gap: 10px 0;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["semiBold"]};
  color: ${({ theme }) => theme.PALLETE.text.sub};
`;





export default S;
