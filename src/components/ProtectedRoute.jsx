import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 로그인 상태 확인 중이면 아무것도 렌더 안 함
  if (loading) return null;

  // 비로그인 → 로그인 페이지로 이동
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 로그인 상태 → 페이지 보여줌
  return children;
}
