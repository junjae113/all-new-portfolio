import React from "react";
import S from "./style";
import Text from "../text/size";
import { useToggle } from "../../hooks/useToggle";

const CheckboxWithLabel = ({ label, checked, onChange, ...props }) => {
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
    <S.CheckboxWithLabelWrapper onClick={handleClick} {...props}>
      <img
        src={isChecked ? "/assets/icons/check-on.png" : "/assets/icons/check-off.png"}
        width={20}
        height={20}
        alt={isChecked ? "체크됨" : "체크안됨"}
      />
      <Text.Body3 ml="10" fontWeight="600">
        {label}
      </Text.Body3>
    </S.CheckboxWithLabelWrapper>
  );
};

export default CheckboxWithLabel;
