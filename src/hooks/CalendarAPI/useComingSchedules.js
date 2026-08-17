// src/hooks/useComingSchedules.js
import { useCallback, useEffect, useState } from "react";

export default function useComingSchedules(user_Id, { pollMs = 5000 } = {}) {
  const [data, setData] = useState([]);  // 예정 일정 리스트
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!user_Id) return;
    setError(null);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendar/api/coming-schedules?user_Id=${user_Id}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // 백에서 이미 필터해주더라도 안전하게 한 번 더 현재 이후만 필터
      const list = Array.isArray(json) ? json : json?.schedules || [];
      const now = new Date();
      const futureOnly = list.filter(s => new Date(s.startAt || s.date) > now);

      // 최신순 정렬: 가까운 일정이 위로 (오름차순)
      futureOnly.sort(
        (a, b) => new Date(a.startAt || a.date) - new Date(b.startAt || b.date)
      );

      setData(futureOnly);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [user_Id]);

  useEffect(() => { refetch(); }, [refetch]);

  useEffect(() => {
    if (!pollMs) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") refetch();
    }, pollMs);
    return () => clearInterval(id);
  }, [refetch, pollMs]);

  return { data, loading, error, refetch };
}
