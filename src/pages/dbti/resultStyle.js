import styled from 'styled-components';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import { spacingProps } from '../../styles/spacingProps';
import { flexCenter } from '../../styles/common';

const S = {};

S.HeaderSpacer = styled.div`
  height: ${({ theme }) => theme.SPACING['70']};
`;

S.Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.SPACING['20']};
`;

S.Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.SPACING['40']};
  align-items: start;
`;

S.Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.SPACING['24']};
`;

S.Right = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: ${({ theme }) => theme.SPACING['32']};
`;

S.Title = styled(Text.H5)`
  ${spacingProps};
  text-align: center;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.Code = styled(Text.H6)`
  ${spacingProps};
  text-align: center;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.Image = styled.img`
  display: block;
  width: 100%;
  max-width: 400px;
`;

S.Hashtags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.SPACING['8']};

  li {
    background: ${({ theme }) => theme.PALLETE.primary.light};
    padding: ${({ theme }) => `${theme.SPACING['4']} ${theme.SPACING['8']}`};
    border-radius: 16px;
    font-size: ${({ theme }) => theme.FONT_SIZE['body3']};
  }
`;

S.Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: ${({ theme }) => theme.SPACING['40']};
  column-gap: ${({ theme }) => theme.SPACING['60']};
  justify-items: center;
  align-items: center;

  .feature {
    ${flexCenter};
    flex-direction: column;
    gap: ${({ theme }) => theme.SPACING['12']};
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE['body2']};
    color: ${({ theme }) => theme.PALLETE.text.primary};
  }
`;

S.Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.background.gray200};
  margin: ${({ theme }) => theme.SPACING['32']} 0;
`;

S.Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.SPACING['40']};
`;

S.Share = styled.div`
  display: flex;
  flex-direction: column;

  .share-title {
    ${spacingProps};
    font-size: ${({ theme }) => theme.FONT_SIZE['body2']};
    color: ${({ theme }) => theme.PALLETE.primary.main};
    margin-top: 0;
    margin-bottom: 16px;
    margin-left: 20px; /* 요청: 문구를 오른쪽으로 20px */
  }

  .share-icons {
    display: flex;
    gap: ${({ theme }) => theme.SPACING['16']};
  }

  .share-btn {
    border: 1px solid ${({ theme }) => theme.PALLETE.background.gray200};
    border-radius: 12px;
    background: #fff;
    padding: ${({ theme }) => theme.SPACING['8']};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform .06s ease, box-shadow .2s ease;
  }
  .share-btn:hover { box-shadow: 0 4px 12px rgba(0,0,0,.06); }
  .share-btn:active { transform: translateY(1px); }
  .share-btn img {
    width: 28px;
    height: 28px;
    display: block;
  }
`;

S.Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING['12']};
`;

S.Footer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.SPACING['24']} 0;
  font-size: ${({ theme }) => theme.FONT_SIZE['caption']};
  color: ${({ theme }) => theme.PALLETE.text.disabled.strong};
`;

export default S;
