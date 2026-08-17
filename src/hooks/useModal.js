import { useState, useCallback } from "react";

// useModal: 모달 열림/닫힘 상태 및 열기/닫기/토글 함수 관리
export function useModal(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle, setIsOpen };
} 