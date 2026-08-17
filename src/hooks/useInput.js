
import { useState } from "react";

// useInput: input value와 onChange를 한 번에 관리하는 커스텀 훅
export function useInput(initial = "") {
  const [value, setValue] = useState(initial);
  const onChange = (e) => setValue(e.target.value);
  return [value, onChange, setValue];
} 