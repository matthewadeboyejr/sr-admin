import { SignupProvider } from "@/context/SignupContext";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export const metadata = {
  title: "Signup",
  description: "Create a new account",
};

export default function SignupLayout({ children }) {
  return (
    <div className="">
      <div className="fixed m-8">
        <Link href={"/"}>
          <Image
            src="/Logo.png"
            width={100}
            height={100}
            alt="service rendering logo"
          />
        </Link>
      </div>
      <SignupProvider>{children}</SignupProvider>
    </div>
  );
}
