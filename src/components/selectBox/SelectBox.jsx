import React, { useState, useEffect } from "react";
import BasicInput from "../input/BasicInput";
import S from "./style";

const SelectBox = ({ options = [], placeholder = "선택하세요", onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // defaultValue가 있으면 초기값 설정
  useEffect(() => {
    if (defaultValue && options.includes(defaultValue)) {
      setSelected(defaultValue);
    } else if (defaultValue === '') {
      setSelected('');
    }
  }, [defaultValue]);

  const handleSelect = (val) => {
    setSelected(val);
    setIsOpen(false);
    onSelect?.(val);
  };

  return (
    <S.SelectWrapper>
      <S.InputButtonWrapper onClick={() => setIsOpen((prev) => !prev)}>
        <BasicInput
          type="text"
          value={selected}
          placeholder={placeholder}
          readOnly
        />
        {isOpen ? (
          <img src="/assets/icons/arrow-up.svg" width={30} height={30} alt="열림" style={{ zIndex: 11 }} />
        ) : (
          <img src="/assets/icons/arrow-down.svg" width={30} height={30} alt="닫힘" style={{ zIndex: 11 }} />
        )}
      </S.InputButtonWrapper>

      {isOpen && (
        <S.OptionList>
          {options.map((opt, idx) => (
            <S.OptionItem
              key={idx}
              onClick={() => handleSelect(opt)}
              className={opt === selected ? "selected" : ""}
            >
              {opt}
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.SelectWrapper>
  );
};

export default SelectBox;
