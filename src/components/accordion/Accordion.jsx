import React, { useState } from "react";
import S from "./style";
import Text from "../text/size";

const Accordion = ({ question, answer, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.AccordionWrapper {...props}>
      <S.QuestionBox onClick={() => setIsOpen((prev) => !prev)}>
        <Text.Body2>{question}</Text.Body2>
        {isOpen ? (
          <img src="/assets/icons/arrow-up-red.svg" alt="열림" width={24} height={24} />
        ) : (
          <img src="/assets/icons/arrow-down-red.svg" alt="닫힘" width={24} height={24} />
        )}
      </S.QuestionBox>

      {isOpen && <S.AnswerBox>{answer}</S.AnswerBox>}
    </S.AccordionWrapper>
  );
};

export default Accordion;
