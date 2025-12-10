import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 로그인 필요한 페이지 */}
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
