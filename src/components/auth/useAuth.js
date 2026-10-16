import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

// JWT 토큰의 payload에서 user_id 꺼내기 (만료됐거나 형식이 잘못됐으면 null)
const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) return null;

  try {
    const { user_id, exp } = jwtDecode(token);
    if (exp && exp * 1000 < Date.now()) return null; // 만료된 토큰
    return user_id ?? null;
  } catch {
    return null;
  }
};

/**
 * 현재 로그인한 사용자 정보를 꺼내 쓰는 훅
 *
 * 사용법:
 *   const { userId } = useAuth();
 *   const { userId, currentUser, isLogin } = useAuth();
 *
 * userId를 찾는 순서
 *   1. Redux의 currentUser.user_id (로그인 / AuthProvider가 저장)
 *   2. localStorage의 jwt_token 안에 들어 있는 user_id
 *   3. localStorage의 user_id (소셜 로그인 시 저장)
 */
const useAuth = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLogin = useSelector((state) => state.user.isLogin);

  const userId =
    currentUser?.user_id ??
    getUserIdFromToken() ??
    localStorage.getItem("user_id") ??
    null;

  return { userId, currentUser, isLogin };
};

export default useAuth;
