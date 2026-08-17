import React from "react";
import S from "./style";
import { useToggle } from "../../hooks/useToggle";

const RadioWithLabel = ({ size = "M", label = "", checked, onChange, ...props }) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, toggleChecked, setInternalChecked] = useToggle(false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (!isControlled) {
      toggleChecked(); // 내부 상태 토글
    }
    onChange?.(!isChecked); // 외부 onChange 호출
  };

  return (
    <S.RadioWrapper onClick={handleClick} {...props}>
      <img
        src={isChecked ? "/assets/icons/radio-on.png" : "/assets/icons/radio-off.png"}
        width={getSize(size)}
        height={getSize(size)}
        alt={isChecked ? "선택됨" : "선택안됨"}
      />
      <S.RadioLabel size={size}>{label}</S.RadioLabel>
    </S.RadioWrapper>
  );
};

// 크기별 사이즈 설정 함수
const getSize = (size) => {
  switch (size) {
    case "L":
      return 48;
    case "M":
      return 32;
    case "S":
      return 16;
    default:
      return 24;
  }
};

export default RadioWithLabel;
