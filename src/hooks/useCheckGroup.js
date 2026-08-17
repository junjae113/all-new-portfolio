import { useState } from "react";

// useCheckGroup: 여러 체크박스/라디오 그룹의 전체 동의 및 개별 동의 상태를 한 번에 관리하는 커스텀 훅
// keys: 관리할 항목의 key 배열(예: ["sms", "email", "push"])
export function useCheckGroup(keys) {
  // checks: 각 항목의 상태를 담는 객체 (예: { sms: false, email: false, push: false })
  const [checks, setChecks] = useState(
    keys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  // allChecked: 모든 항목이 true일 때만 true (전체 동의 체크박스에 연결)
  const allChecked = Object.values(checks).every(Boolean);

  // setAll: 모든 항목을 value(true/false)로 한 번에 변경 (전체 동의/해제)
  const setAll = (value) => {
    setChecks(keys.reduce((acc, key) => ({ ...acc, [key]: value }), {}));
  };

  // setOne: 특정 항목만 value(true/false)로 변경 (개별 동의/해제)
  const setOne = (key, value) => {
    setChecks((prev) => ({ ...prev, [key]: value }));
  };

  // 반환값: checks(각 항목 상태), allChecked(전체 동의 상태), setAll(전체 변경), setOne(개별 변경)
  return {
    checks,
    allChecked,
    setAll,
    setOne,
  };
} 