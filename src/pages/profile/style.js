import styled from "styled-components";
import { flexColumn } from "../../styles/common";
import { spacingProps } from "../../styles/spacingProps";

const S = {};


S.InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    ${spacingProps}
`

S.TitleWrap = styled.div`
    width: 100%;
    height: 100%;
`

S.highlight = styled.div`
    display: inline;
    box-shadow: inset 0 -20px 0 #ffe9e9;
`

S.inputinline = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin-top: 50px;
    justify-content: space-between;
`

S.inputinlineImg = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin-top: 30px;
    justify-content: space-between;
    gap: 40px;
`

S.inputinlinehealth = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    gap: 40px;
`

S.CaptionTitlewrap = styled.div`
    width: 100%;
    height: 25px;
    /* border: solid 5px pink; */
    font-weight: bold;
`

S.NamekgWrap = styled.div`
    width: 100%;
    ${flexColumn};
    align-items: center;
`

S.healthprofile = styled.div`
    margin-top: auto;
    height: min-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 20px/ 2);
    box-sizing: border-box;
`

S.InputReguler = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 23px;
    width: 100%;
    position: relative;
    ${spacingProps}
    img{
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        }
`       

/* border: solid 5px pink; */

S.InputButtonWrapper = styled.div`
    position: relative;
    width: 100%;
    ${spacingProps}
    
    button {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
    p {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
    img {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
`
S.Label = styled.label`
        display: block; //이미지를 클릭하는 크기 and label 은 크기가 없는 인라인태그라서 block으로 바꿔줘야 widt, height가 들어감
    `;


S.ProfileWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    background-color:#fff5ec;
    overflow: hidden; //사진이 넘치지 못하게
    border-radius: 50%; //둥굴게
    margin-top: 60px;
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`


S.Profile = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;



S.Content = styled.div`
    width: 300px;
    height: 40px;
`

S.RadioWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    ${spacingProps}
`;

S.radioselect = styled.img`
    display: flex;
    width: 100%;
    border-radius: 11%; //둥굴게
`;

S.spantext = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export default S;
