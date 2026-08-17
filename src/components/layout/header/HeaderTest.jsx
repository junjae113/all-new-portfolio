import React, { useState } from "react";
import Header from "./Header";
import BasicButton from "../../button/BasicButton";

const TestHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dummyUser = {
    profileImage: "/assets/img/sample-profile.jpeg",
  };

  return (
    <div>
      <BasicButton
        variant="filled"
        roundButton="large"
        onClick={() => setIsLoggedIn((prev) => !prev)}
      >
        {isLoggedIn ? "로그아웃" : "로그인"}
      </BasicButton>

      <Header
        isLoggedIn={isLoggedIn}
        notifications={{ bell: 1, send: 2, calendar: 3 }}
        user={dummyUser}
      />
    </div>
  );
};

export default TestHeader;
