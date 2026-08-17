import React from "react";
import S from "./style";
import Text from "../text/size";
import BasicButton from "../button/BasicButton";

const PopupCard = ({ title, description, actions = [], onClose }) => {
  return (
    <S.Dimmed onClick={onClose}>
      <S.Wrapper onClick={(e) => e.stopPropagation()}>
        <Text.Body1 color={"#CF4B05"} fontWeight={700}>
          {title}
        </Text.Body1>

        {description && (
          <Text.Caption3
            color="#707070"
            mt="24"
            style={{ whiteSpace: "pre-line", maxWidth: "220px" }}
          >
            {description}
          </Text.Caption3>
        )}

        <S.ButtonGroup $count={actions.length} mt="30">
          {actions.map(({ label, onClick, type = "primary" }, idx) => (
            <BasicButton
              roundButton="superSmall"
              variant={type}
              key={idx}
              onClick={onClick}
            >
              {label}
            </BasicButton>
          ))}
        </S.ButtonGroup>
      </S.Wrapper>
    </S.Dimmed>
  );
};

export default PopupCard;
