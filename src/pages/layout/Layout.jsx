

import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import Wrapper from "../../components/layout/Wrapper";
import ScrollToTop from "../../components/ScrollToTop";

const Layout = () => {
  const location = useLocation();
  
  // Redux에서 로그인 상태와 사용자 정보 가져오기
  const isLoggedIn = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.currentUser);

  const noFooterPaths = ['/chatting', '/calendar'];

  return (
    <div>
      <ScrollToTop />
      <Header isLoggedIn={isLoggedIn} user={user} />
      <Wrapper>
        <Outlet />
      </Wrapper>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
