"use client";

import { useUserContext } from "@/context/UsersContext";
import { axiosInstance } from "@/lib/api";
import { formatTimestamp } from "@/utils/formatTimestamp";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import Buttons from "../general/Buttons";
import Button from "../general/Buttons";

export default function Security() {
  return (
    <section className="gap-5 space-y-6">
      <div className="border p-3 rounded-md shadow-sm space-y-5 ">
        <div className="pb-6">
          <h2 className="font-semibold">Two Factor Authentication</h2>
          <p className="text-sm">
            Help protect your account from unauthorised access by requiring a
            second authentication method in addition to your Admin password.
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="space-y-3 border p-4 rounded-md ">
            <p className="flex flex-col pb-3 space-y-1">
              <span className="font-semibold  text-sm">TEXT MESSAGE</span>
              <span className="text-sm">
                Use your mobile phone to receive a text message with an
                authentication code to enter when you log in to your Admin
                account
              </span>
            </p>

            <Button name="Activate" />
          </div>
          <div className="space-y-3 border p-4 rounded-md ">
            <p className="flex flex-col pb-3  space-y-1">
              <span className="font-semibold  text-sm">AUTHENTICATOR APP</span>
              <span className="text-sm">
                Use a mobile authentication app to get a verification code to
                enter every time you log in to your Admin account
              </span>
            </p>

            <Button name="Activate" />
          </div>
        </div>
      </div>
      <div className="border p-3 rounded-md shadow-sm ">
        <div className="pb-6">
          <h2 className="font-medium">Change password</h2>
          <p className="text-sm">Change your password at any time</p>
        </div>

        <Button name="Change Password" />
      </div>
    </section>
  );
}
