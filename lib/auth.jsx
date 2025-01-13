import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set("accessToken", token, { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    const toastid = toast.loading("signing out");
    Cookies.remove("accessToken");
    setIsAuthenticated(false);
    toast.success("Logged Out");
    router.push(`/`);
    toast.dismiss(toastid);
  };

  return { isAuthenticated, login, logout };
};
