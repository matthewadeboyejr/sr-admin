"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { baseUrl } from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [userRegData, setUserRegData] = useState(null);
  const [registerData, setRegisterData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [checkBox, setCheckBox] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessfull] = useState(false);

  const router = useRouter();

  useEffect(() => setErrMsg(""), [password]);
  useEffect(() => {
    setValidPassword(password.length >= 8);
  }, [password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}/account/api/v1/register/?user_type=admin`;
    const data = {
      email: registerData.email.toLowerCase(),
      first_name: registerData.first_name,
      last_name: registerData.last_name,
      password: password,
      password2: password,
      device_token: "admin",
    };

    try {
      setIsLoading(true);
      const response = await axios.post(url, data);
      const regData = response?.data;
      setUserRegData(regData);

      //navigate("/otp");
      if (response.status === 200) {
        router.push("/signup/otp");
      }

      if (!response.statusText === "Created") {
        {
          setRegisterData({ email: "", first_name: "", last_name: "" });
          setPassword("");
          setPassword2("");
        }
      }

      setIsLoading(false);
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userRegData) {
      setIsSuccessfull(true);
    }
  }, [userRegData]);

  return (
    <SignupContext.Provider
      value={{
        handleChange,
        handleSubmit,
        setPassword,
        setPasswordFocus,
        passwordFocus,
        password,
        errMsg,
        registerData,
        validPassword,
        isLoading,
        isSuccessful,
        userRegData,
        checkBox,
        setCheckBox,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => useContext(SignupContext);
