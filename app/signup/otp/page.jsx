"use client";

import OtpForm from "@/components/forms/OtpForm";
import SignupForm from "@/components/forms/SignupForm";
import { useSignupContext } from "@/context/SignupContext";

const Signup = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center px-8">
      <OtpForm />
    </div>
  );
};

export default Signup;
