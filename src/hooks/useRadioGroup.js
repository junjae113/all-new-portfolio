
// 사용 예시:
  // const [selected, handleChange] = useRadioGroup();
  // <RadioWithLabel checked={selected === "a"} onChange={() => handleChange("a")} label="A" />
  // <RadioWithLabel checked={selected === "b"} onChange={() => handleChange("b")} label="B" />

import { useState } from "react";

export function useRadioGroup(initial = "") {
  const [selected, setSelected] = useState(initial);
  const handleChange = (value) => setSelected(value);
  return [selected, handleChange, setSelected];
} 