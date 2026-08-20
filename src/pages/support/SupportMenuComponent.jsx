import React from 'react';
import S from './style';
import { Link, useNavigate } from 'react-router-dom';


const SupportMenuComponent = ({activeMenu}) => {

  const link = useNavigate("")

  const token = localStorage.getItem("jwt_token");

  const onClickLink = (e) => {
    if (token) {
      link(e)
    } else {
      window.alert("로그인 후 이용하실 수 있습니다.");
      link("/sign-in");
    }
  }

  return (
      <S.MenuWrapper>
        <Link to ="/support/faq">
          <S.FAQButton isActive={activeMenu === 'faq'} >FAQ</S.FAQButton>
        </Link>
        <S.BetweenButton  >ㆍ</S.BetweenButton>
          <S.InquiryButton isActive={activeMenu === 'inquiry'} onClick={() => onClickLink("/support/inquiry-list")} >1:1문의</S.InquiryButton>
      </S.MenuWrapper>
  );
};

export default SupportMenuComponent;