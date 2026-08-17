import React from "react";
import S from "./style";
import { useToggle } from "../../hooks/useToggle";

const Radio = ({ checked, onChange, size = "M", ...props }) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, toggleChecked, setInternalChecked] = useToggle(false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (!isControlled) {
      toggleChecked(); // 내부 상태 토글
    }
    onChange?.(!isChecked); // 외부 onChange 호출
  };

  const iconSize = getSize(size);

  return (
    <S.RadioWrapper onClick={handleClick} {...props}>
      <img
        src={isChecked ? "/assets/icons/radio-on.png" : "/assets/icons/radio-off.png"}
        width={iconSize}
        height={iconSize}
        alt={isChecked ? "선택됨" : "선택안됨"}
      />
    </S.RadioWrapper>
  );
};

// 크기별 아이콘 사이즈 반환
const getSize = (size) => {
  switch (size) {
    case "L":
      return 50;
    case "M":
      return 30;
    case "S":
      return 15;
    default:
      return 30;
  }
};

export default Radio;
