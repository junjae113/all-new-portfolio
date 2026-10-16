import styled from "styled-components";

const S = {}

 S.MyFriend = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE["body1"]};
  height: px;
  margin: 0 0 40px 0;
 `

 S.FriendsList = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  width: 825px;
  height: 500px;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
  display: none;
  }
 `

 S.FriendCard = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 40px;
  background-color: gray;
  flex: 0 0 auto; /* 중요: 크기 고정 */
 `

export default S;