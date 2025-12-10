import { createContext, useContext, useEffect, useState } from "react";
// import authApi from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 새로고침 시 localStorage 복원
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 로그인
  const login = async (email, password) => {
    // 임시 로그인 (나중에 API로 교체)
    /*
    const res = await authApi.post("/auth/login", {
      email,
      password,
    });
    const { user, token } = res.data;
    */

    // 지금은 mock (추후 API로 교체)
    const user = { email };
    const token = "fake-jwt-token";

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
