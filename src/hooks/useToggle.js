

import { useState, useCallback } from "react";

// useToggle: true/false 상태를 토글하는 커스텀 훅
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
} 