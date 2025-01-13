"use client";
import { FiEyeOff, FiEye } from "react-icons/fi";
import Link from "next/link";
import { useLoginContext } from "@/context/LoginContext";
import { useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { Toaster } from "react-hot-toast";

function LoginForm() {
  const { errMsg, loginData, handleChange, isLoading, handleSubmit } =
    useLoginContext();

  const errRef = useRef();
  const userRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => errRef.current.focus(), []);
  useEffect(() => userRef.current.focus(), []);

  return (
    <form
      className="w-full max-w-md space-y-6"
      aria-label="Login Form"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="text-2xl font-medium">Welcome Back</h1>
        <p className="text-xs">Login to your account</p>
      </div>
      <div>
        <Toaster />
      </div>
      <p
        ref={errRef}
        className={
          errMsg
            ? "text-xs bg-red-50  p-3 rounded-md text-red-500"
            : "absolute left-[-9999px]"
        }
      >
        {errMsg}
      </p>

      <div className="space-y-2">
        <label className="text-xs " htmlFor="email">
          Email Address
        </label>
        <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
          <input
            className="bg-transparent w-full outline-none placeholder:text-xs"
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            ref={userRef}
            value={loginData?.email}
            onChange={handleChange}
            autoComplete="on"
            required
          />
        </div>
      </div>
      {/*password */}
      <div className="space-y-2">
        <label className="text-xs" htmlFor="password">
          password
        </label>
        <div className="flex border border-secondary/20  justify-between p-3 items-center pr-5 rounded-md ">
          <input
            className="bg-transparent w-full outline-none laceholder:text-xs"
            id="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData?.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <div
            className="hover:cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>
        <Link
          className=" flex justify-end  text-secondary font-medium text-sm  hover:opacity-90"
          href={""}
        >
          Help with Password
        </Link>
      </div>
      <button
        disabled={isLoading ? true : false}
        type="submit"
        className="bg-primary text-secondary font-semibold rounded-3xl py-3 text-sm w-full hover:opacity-90"
      >
        <div className="flex justify-center items-center">
          {isLoading ? (
            <CgSpinnerTwo className="animate-spin text-2xl" />
          ) : (
            "Log in"
          )}
        </div>
      </button>
      <p className="text-sm space-x-2 font-medium">
        <span>New Admin?</span>
        <Link
          className="   text-secondary    hover:opacity-90"
          href={"/signup"}
        >
          Get An account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
