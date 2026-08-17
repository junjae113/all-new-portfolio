import { useState } from 'react';
import BasicInput from '../../components/input/BasicInput';
import SelectBox from '../../components/selectBox/SelectBox';
import S from './style';

const CommunitySelect = ({activeFilter,onChange}) => {

  const handleFilterClick = (filterName) => {
    onChange(filterName)
  }

  return (
    <>
      <S.Search>
        <SelectBox 
        options={["전체","내용","제목","작성자"]} placeholder='전체'/>
        <S.SearchInput>
          <BasicInput type="text" placeholder="검색어를 입력하세요" />
          <img src="/assets/icons/search.svg" width={30} height={30} alt="검색" />
        </S.SearchInput>
        </S.Search>
        <S.Filter>
          <S.FilterNew 
            $active={activeFilter === "최신순"}
            onClick={() => handleFilterClick("최신순")}
          >최신순</S.FilterNew>
          <S.FilterHot
            $active={activeFilter === "인기순"}
            onClick={() => handleFilterClick("인기순")}
          >인기순</S.FilterHot>
          <S.FilterMy
            $active={activeFilter === "내가 쓴 게시글"}
            onClick={() => handleFilterClick("내가 쓴 게시글")}
          >내가 쓴 게시글</S.FilterMy>
          <S.FilterFriend
            $active={activeFilter === "내 친구가 쓴 게시글"}
            onClick={() => handleFilterClick("내 친구가 쓴 게시글")}
          >내 친구가 쓴 게시글</S.FilterFriend>
        </S.Filter>
    </>
  );
};

export default CommunitySelect;