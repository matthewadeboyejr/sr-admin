"use client";

import { FiEyeOff, FiEye } from "react-icons/fi";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useSignupContext } from "@/context/SignupContext";
import { useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import BackButton from "../general/BackButton";

function SignupForm() {
  const {
    handleChange,
    handleSubmit,
    setPassword,
    passwordFocus,
    setPasswordFocus,
    password,
    errMsg,
    registerData,
    validPassword,
    isLoading,
    isSuccessful,
    checkBox,
    setCheckBox,
  } = useSignupContext();

  const errRef = useRef();
  const firstNameRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => firstNameRef.current.focus(), []);

  return (
    <>
      <form
        className="w-full max-w-md space-y-6"
        aria-label="Login Form"
        onSubmit={handleSubmit}
      >
        <BackButton />
        <div>
          <h1 className="text-2xl font-medium">Signup</h1>
          <p className="text-xs">Sign up as a new Admin</p>
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
        <div className="flex justify-between items-center gap-3">
          {/*  firstName */}
          <div className="space-y-2">
            <label className="text-xs " htmlFor="first_name">
              First Name
            </label>
            <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
              <input
                className="bg-transparent w-full outline-none placeholder:text-xs"
                id="first_name"
                placeholder="e.g john"
                type="text"
                name="first_name"
                value={registerData.first_name}
                onChange={handleChange}
                ref={firstNameRef}
                required
                aria-required="true"
              />
            </div>
          </div>
          {/*     lastName */}

          <div className="space-y-2">
            <label className="text-xs " htmlFor="last_name">
              Last Name
            </label>
            <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
              <input
                className="bg-transparent w-full outline-none placeholder:text-xs"
                id="last_name"
                placeholder="e.g doe"
                type="text"
                name="last_name"
                value={registerData.last_name}
                onChange={handleChange}
                autoComplete="on"
                required
                aria-required="true"
              />
            </div>
          </div>
        </div>
        {/*Email */}
        <div className="space-y-2">
          <label className="text-xs " htmlFor="email">
            Email Address
          </label>
          <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
            <input
              className="bg-transparent w-full outline-none placeholder:text-xs"
              id="email"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              autoComplete="on"
              required
              aria-required="true"
            />
          </div>
        </div>
        {/*password */}
        <div className="space-y-2">
          <label className="text-xs " htmlFor="password">
            password
          </label>
          <div className="flex border border-secondary/20  justify-between p-3 items-center pr-5 rounded-md ">
            <input
              className="bg-transparent w-full outline-none laceholder:text-xs"
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
              aria-describedby="passwordNote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <p
            id="passwordNote"
            className={
              passwordFocus && !validPassword
                ? "text-xs bg-red-50  p-3 rounded-md text-red-500"
                : "absolute  left-[-9999px]"
            }
          >
            8 to 24 character
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary text-secondary font-semibold rounded-md py-3 text-sm w-full hover:opacity-90"
        >
          <div className="flex justify-center items-center">
            {isLoading ? (
              <CgSpinnerTwo className="animate-spin text-2xl" />
            ) : (
              "Sign up"
            )}
          </div>
        </button>
        <p className="text-sm space-x-2 font-medium">
          <span>Have an Account?</span>
          <Link className="   text-secondary    hover:opacity-90" href={"/"}>
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignupForm;
