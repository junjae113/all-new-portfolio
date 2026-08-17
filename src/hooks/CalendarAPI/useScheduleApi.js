// src/hooks/useScheduleApi.js
import { useCallback, useState } from "react";

const BASE =
  (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");

// 날짜/시간을 서버가 먹기 좋은 ISO 문자열로 변환
const toISO = (v) => (v instanceof Date ? v.toISOString() : v ?? null);

export default function useScheduleApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  // 일정 POST
  const postSchedule = useCallback(async (payload) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/calendar/api/post-schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  // 일정 PUT
  const putSchedule = useCallback(async (payload) => {
    // payload: { user_id, schedule_id, ...fields }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/calendar/api/put-schedules`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  // 일정 DELETE
  const deleteSchedule = useCallback(async ({ user_id, schedule_id }) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/calendar/api/delete-schedules`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, schedule_id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  // 편의용: 프론트에서 Date/시간 들어와도 안전하게 변환해서 호출
  const createScheduleSafe = useCallback(async ({ title, date, time, location, user_id, chat_id }) => {
    const body = {
      title,
      date: toISO(date),
      time: toISO(time), // time만 보내면 서버에서 시/분만 쓰게 할 수도 있음
      location,
      user_id,
      // chat_id,
    };
    return postSchedule(body);
  }, [postSchedule]);

  return {
    loading,
    error,
    postSchedule,
    putSchedule,
    deleteSchedule,
    createScheduleSafe,
  };
}
