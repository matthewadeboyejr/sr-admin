"use client";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { CgSpinnerTwo } from "react-icons/cg";
import { useSignupContext } from "@/context/SignupContext";
import { useEffect, useRef, useState } from "react";
import ConfirmSignup from "../general/ConfirmSignup";
import BackButton from "../general/BackButton";
import axios from "axios";
import { baseUrl } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function OtpForm() {
  const {
    userRegData,
    handleSubmit,
    isLoading: resendingOTP,
  } = useSignupContext();
  const otpRef = useRef();
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verify, setVerify] = useState(false);

  //useEffect(() => otpRef.current.focus());
  const router = useRouter();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}/account/api/v1/verify-email/`;
    const email = userRegData?.data?.email;
    const data = { otp, email };
    let toastId;

    try {
      setIsLoading(true);
      const response = await axios.post(url, data);
      if (response && response.status === 200) {
        toast.success(response?.data?.message);
        setVerify(true);
        await router.push("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Request failed";

      setErrMsg?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      if (toastId) {
        toast.dismiss(toastId);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {!verify && (
        <form className="w-full max-w-md space-y-6" aria-label="Otp Form">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium">One time Password</h1>
            <p className="text-xs">
              Check your email or phone number for the code
            </p>
          </div>

          <p
            className={
              errMsg
                ? "text-xs bg-red-50  p-3 rounded-md text-red-500"
                : "absolute left-[-9999px]"
            }
          >
            {errMsg}
          </p>

          {/*password */}
          <div className="space-y-2">
            <label className="text-xs " htmlFor="password">
              Enter Otp
            </label>
            <div className="flex border border-secondary/20  justify-between p-3 items-center pr-5 rounded-md ">
              <input
                className="bg-transparent w-full outline-none placeholder:text-xs"
                id="password"
                placeholder="one time password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
                //ref={otpRef}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                required
              />
              <div
                className="hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleOtpSubmit}
            className="bg-primary text-secondary font-semibold rounded-md py-3 text-sm w-full hover:opacity-90"
          >
            <div className="flex justify-center items-center">
              {isLoading ? (
                <CgSpinnerTwo className="animate-spin text-2xl" />
              ) : (
                "Verify"
              )}
            </div>
          </button>
          <p className="text-sm space-x-2 font-medium">
            <span>Didnt get the code?</span>
            <button
              onClick={handleSubmit}
              className="   text-secondary    hover:opacity-90"
            >
              <div className="flex justify-center items-center">
                {resendingOTP ? (
                  <CgSpinnerTwo className="animate-spin text-2xl" />
                ) : (
                  "Resend"
                )}
              </div>
            </button>
          </p>
        </form>
      )}
      {verify && <ConfirmSignup />}
    </>
  );
}

export default OtpForm;
