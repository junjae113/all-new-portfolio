

import { useEffect } from "react";

// useOnClickOutside: 특정 ref 영역 바깥 클릭 시 콜백 실행
export function useOnClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(e);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
} 