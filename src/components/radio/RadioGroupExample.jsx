

import React from "react";
import RadioWithLabel from "./RadioWithLabel";
import { useRadioGroup } from "../../hooks/useRadioGroup";

const options = [
  { value: "a", label: "선택지 A" },
  { value: "b", label: "선택지 B" },
  { value: "c", label: "선택지 C" },
  { value: "d", label: "선택지 D" },
];

function RadioGroupExample() {
  // useRadioGroup 훅으로 그룹의 선택 상태를 관리
  const [selected, handleChange] = useRadioGroup();

  return (
    <div>
      <h3>라디오 그룹 예시</h3>
      {options.map(opt => (
        <RadioWithLabel
          key={opt.value}
          label={opt.label}
          checked={selected === opt.value}
          onChange={() => handleChange(opt.value)}
          style={{ display: "block", marginBottom: 8 }}
        />
      ))}
      <div style={{ marginTop: 16 }}>
        <strong>선택된 값:</strong> {selected || "없음"}
      </div>
    </div>
  );
}

export default RadioGroupExample; 