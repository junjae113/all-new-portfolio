import styled from "styled-components";
import { flexColumnCenter } from "../../styles/common";


const S = {};


S.MatchingWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff5ec;
    padding-top: 100px;
`;

S.MatchingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    padding: 40px 240px;
    padding-top: 60px;
`;

S.MatchingTitle = styled.div`
    ${flexColumnCenter};
    gap: 10px;

    img {
        width: 60px;
        display: block;
    }

    p {
        color: ${({ theme }) => theme.PALLETE.primary.main};
    }
`;

S.MatchingTitleTextSub = styled.p`
    font-size: 45px;
    color: #000;

    span {
        font-weight: 600;
    }
`;

S.MatchingTitleTextMain = styled.p`
    font-size: 90px;
    font-weight: 600;
    color: #000;
`;



export default S;
