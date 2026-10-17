// 서버에 저장된 이미지 주소를 "지금 실행 중인 환경"에 맞는 주소로 바꿔주는 함수
// - "http://localhost:8000/uploads/..." 처럼 로컬에서 저장된 주소 → 배포된 백엔드 주소로 교체
// - "/uploads/..." 처럼 앞부분이 없는 주소 → 백엔드 주소를 앞에 붙임
// - "/assets/..."(프론트 기본 이미지), data:/blob:(미리보기), 그 밖의 외부 주소 → 그대로 사용
const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");

export const resolveImageUrl = (src, fallback = "") => {
  if (!src || typeof src !== "string") return fallback;

  if (src.startsWith("data:") || src.startsWith("blob:")) return src;

  const local = src.match(/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(\/uploads\/.*)$/);
  if (local) return `${BACKEND_URL}${local[1]}`;

  if (src.startsWith("/uploads/")) return `${BACKEND_URL}${src}`;
  if (src.startsWith("uploads/")) return `${BACKEND_URL}/${src}`;

  return src;
};

export default resolveImageUrl;
