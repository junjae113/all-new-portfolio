import styled from "styled-components";

const S = {}

 S.MyFriend = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE["body1"]};
  height: 76px;
 `

 S.FriendsList = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  width: 825px;
  height: 494px;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
  display: none;
  }
 `

 S.FriendCard = styled.div`
  width: 278px;
  height: 434px;
  border-radius: 24px;
  background-color: gray;
  flex: 0 0 auto; /* 중요: 크기 고정 */
 `

export default S;