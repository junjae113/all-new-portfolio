import React from "react";
import S from "./style";
import Text from "../../text/size";

const Footer = () => {
  return (
    <S.FooterWrapper>
      <S.LogoWrapper>
        <img src="/assets/img/logo-w.svg" alt="MungPick 로고" />
      </S.LogoWrapper>

      <S.InfoArea>
        <S.LeftBox>
          <Text.Body1>@MUNG_PICK</Text.Body1>
          <Text.Body3 color={"#FFDECD"}>
            @2025 MUNGPICK.All rights reserved.
          </Text.Body3>
        </S.LeftBox>

        <S.RightBox>
          <Text.Body2>사업자 정보 안내</Text.Body2>
          <S.ListWrap>
            <li>
              <Text.Body3>
                상호 : 멍픽 | 대표자 : 404 | 전화 : 010-1234-2344
              </Text.Body3>
            </li>

            <li>
              <Text.Body3>
                이메일 : mungpick@gmail.com | 개인정보관리책임자 : 404
              </Text.Body3>
            </li>

            <li>
              <Text.Body3>사업자등록번호 : 833-222-44938</Text.Body3>
            </li>

            <li>
              <Text.Body3>
                통신판매업신고 : 20303040-서울마포-22222호[사업자정보확인]
              </Text.Body3>
            </li>

            <li>
              <Text.Body3>
                주소 : 서울특별시 서대문구 남가좌동 1길 55
              </Text.Body3>
            </li>
          </S.ListWrap>
        </S.RightBox>
      </S.InfoArea>
    </S.FooterWrapper>
  );
};

export default Footer;
