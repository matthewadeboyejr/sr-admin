import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { axiosInstance } from "./api";

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

  const logout = async () => {
    const toastid = toast.loading("signing out");
    const url = "/account/api/v1/logout/";

    try {
      const response = await axiosInstance.post(url);
      if (response.status === 200) {
        toast.success(response?.data?.message || "Logged Out");
        Cookies.remove("accessToken");
        setIsAuthenticated(false);
        await router.push(`/`);
      } else {
        const errorMessage = response?.data?.message || "Unexpected response.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      toast.dismiss(toastid);
    }
  };

  return { isAuthenticated, login, logout };
};
