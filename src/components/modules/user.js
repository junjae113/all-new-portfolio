import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/SET_USER_STATUS";
const CLEAR_USER = "user/CLEAR_USER";

// 액션 생성 함수
export const setUser = createAction(SET_USER, (user) => user);
export const setUserStatus = createAction(SET_USER_STATUS, (status) => status);
export const clearUser = createAction(CLEAR_USER);

// 초기 상태
const initialState = {
  currentUser: null,
  isLogin: false,
};

// 리듀서
const user = handleActions(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
    [SET_USER_STATUS]: (state, action) => ({
      ...state,
      isLogin: action.payload,
    }),
    [CLEAR_USER]: (state) => ({
      ...state,
      currentUser: null,
      isLogin: false,
    }),
  },
  initialState
);

export default user;
