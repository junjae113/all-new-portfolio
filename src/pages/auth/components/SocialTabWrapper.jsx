import React from 'react'
import S from '../style'
import KakaoTab from './KakaoTab'
import NaverTab from './NaverTab'

const SocialTabWrapper = () => {
  return (
    <S.SocialTabWrapper>
        <KakaoTab/>
        <NaverTab/>
    </S.SocialTabWrapper>
  )
}

export default SocialTabWrapper;