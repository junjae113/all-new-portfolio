import React from "react";
import S from "./style";
import Text from "../text/size";
import BasicButton from "../button/BasicButton";

const PopupCardLarge = ({
  title,
  description,
  actions,
  subText = [],
  onClose,
}) => {
  return (
    <S.Dimmed onClick={onClose}>
      <S.WrapperLarge onClick={(e) => e.stopPropagation()}>
        <Text.H5 color={"#CF4B05"} fontWeight={700}>
          {title}
        </Text.H5>

        {description && (
          <Text.Body3
            color="#333333"
            mt="44"
            style={{
              whiteSpace: "pre-line",
              wordBreak: "keep-all",
              maxWidth: "500px",
            }}
          >
            {description}
          </Text.Body3>
        )}

        {subText && (
          <Text.Caption2
            color="#585858"
            mt="20"
            style={{
              whiteSpace: "pre-line",
              wordBreak: "keep-all",
              maxWidth: "400px",
            }}
          >
            {subText}
          </Text.Caption2>
        )}

        <S.ButtonGroup $count={actions.length} mt="50">
          {actions.map(({ label, onClick, type = "primary" }, idx) => (
            <BasicButton
              basicButton="small"
              variant={type}
              key={idx}
              onClick={onClick}
            >
              {label}
            </BasicButton>
          ))}
        </S.ButtonGroup>
      </S.WrapperLarge>
    </S.Dimmed>
  );
};

export default PopupCardLarge;
