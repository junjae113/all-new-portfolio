import { createAction, handleActions } from "redux-actions";

// 액션 타입
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/SET_USER_STATUS";
const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";

// 액션 생성자
export const setUser = createAction(SET_USER, (user) => user);
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin);
export const setPreviousUrl = createAction(SET_PREVIOUS_URL, (url) => url);

// 초기 상태
const initialState = {
  currentUser: {},
  isLogin: false,
  previousUrl: "",
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
    [SET_PREVIOUS_URL]: (state, action) => ({
      ...state,
      previousUrl: action.payload,
    }),
  },
  initialState
);

export default user; 