import React, { useState } from "react";
import PopupCard from "../../components/popUp/PopupCard";
import BasicButton from "../../components/button/BasicButton";
import PopupCardLarge from "./PopupCardLarge";

const PopUpTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  return (
    <section>
      <BasicButton
        onClick={() => setIsOpen(true)}
        variant="filled"
        roundButton="small"
      >
        팝업 열기
      </BasicButton>

      <BasicButton
        onClick={() => setIsLargeOpen(true)}
        variant="filled"
        roundButton="small"
      >
        네모팝업 열기
      </BasicButton>

      {isOpen && (
        <PopupCard
          title="친구가 추천을 보냈어요!"
          description="“뽀삐” 님도 추천을 눌러서 나의 존재감을 어필해봐요! "
          subText="회원님의 아이디 , 비밀번호 확인 후 다시 입력해 주시기 바랍니다. 회원정보가 기억나지 않으신다면, 아래 아이디 / 비밀번호 찾기로 확인해 주세요."
          onClose={() => setIsOpen(false)}
          actions={[
            {
              label: "추천하기",
              onClick: () => {
                setIsOpen(false);
              },
              type: "filled",
            },
            {
              label: "나중에 하기",
              onClick: () => setIsOpen(false),
              type: "gray",
            },
          ]}
        />
      )}

      {isLargeOpen && (
        <PopupCardLarge
          title="로그인 실패"
          description="입력하신 아이디 또는 비밀번호가 일치하지 않습니다."
          subText="회원님의 아이디 , 비밀번호 확인 후 다시 입력해 주시기 바랍니다. 회원정보가 기억나지 않으신다면, 아래 아이디 / 비밀번호 찾기로 확인해 주세요."
          onClose={() => setIsLargeOpen(false)}
          actions={[
            {
              label: "아이디/비밀번호 찾기",
              onClick: () => {
                console.log("추천 완료!");
                setIsOpen(false);
              },
              type: "filled",
            },
            {
              label: "닫기",
              onClick: () => setIsOpen(false),
              type: "gray",
            },
          ]}
        />
      )}
    </section>
  );
};

export default PopUpTest;
