"use client";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { baseUrl } from "@/lib/api";

const LoginContext = createContext({});
export default LoginContext;

export const LoginProvider = ({ children }) => {
  const router = useRouter();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}/account/api/v1/login/?login_type=admin`;
    const data = {
      username: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    try {
      setIsLoading(true);

      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const response = await axios.post(url, data);
            const token = response?.data?.data?.token;
            const userID = response?.data?.data?.user_id;

            if (token && userID) {
              //localStorage.setItem("accessToken", token);
              //localStorage.setItem("userId", userID);
              await login(token);
              setLoginData({ email: "", password: "" });
              resolve(response);
              router.push("/dashboard");
            } else {
              reject(new Error("Invalid login credentials"));
            }
          } catch (error) {
            let errorMessage = "Login failed";
            if (error.response?.data?.non_field_errors) {
              errorMessage = error.response.data.non_field_errors;
            } else if (error.response?.data?.message) {
              errorMessage = error.response.data.message;
            }
            setErrMsg(errorMessage);
            reject(new Error(errorMessage));
          }
        }),
        {
          loading: "Logging in...",
          success: "Successfully logged in!",
          error: (err) => `${err.message}`,
        },
        {
          success: {
            duration: 2000,
            icon: "🎉",
          },
          error: {
            duration: 3000,
            icon: "❌",
          },
          style: {
            background: "#FFE86E",
            color: "#012332",
            fontSize: "12px",
          },
        }
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        errMsg,
        loginData,
        handleChange,
        isLoading,
        handleSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
