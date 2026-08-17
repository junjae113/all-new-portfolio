import React, { useRef, useEffect } from "react";

export default function HorizontalScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const onWheel = (e) => {
      if (e.deltaY === 0) return; // 세로 스크롤 값이 없으면 무시
      e.preventDefault(); // 세로 스크롤 방지
      el.scrollLeft += e.deltaY; // 세로 스크롤을 가로 스크롤로 변환
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, []);
 }