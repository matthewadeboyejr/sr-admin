import { FiEyeOff, FiEye } from "react-icons/fi";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import OtpFOrm from "./OtpForm";

function EditUserDetailsForm() {
  return (
    <form className="w-full max-w-md space-y-6 py-5 " aria-label="Login Form">
      <div className="flex justify-between items-center">
        {/*  firstName */}
        <div className="space-y-2">
          <label className="text-xs " htmlFor="firstName">
            First Name
          </label>
          <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
            <input
              className="bg-transparent w-full outline-none placeholder:text-xs"
              id="firstName"
              placeholder="e.g john"
              type="text"
              name="firstName"
              required
              aria-required="true"
            />
          </div>
        </div>
        {/*     lastName */}

        <div className="space-y-2">
          <label className="text-xs " htmlFor="lastName">
            Last Name
          </label>
          <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
            <input
              className="bg-transparent w-full outline-none placeholder:text-xs"
              id="lastName"
              placeholder="e.g doe"
              type="text"
              name="lastName"
              autoComplete="email"
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
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>
      </div>
      {/*phone Number */}
      <div className="space-y-2">
        <label className="text-xs " htmlFor="email">
          Phone Number
        </label>
        <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
          <input
            className="bg-transparent w-full outline-none placeholder:text-xs"
            id="contact"
            placeholder="Phone Number"
            type="number"
            name="contact"
            autoComplete="On"
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
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
          <button className="hover:cursor-pointer">
            <FiEye />
          </button>
        </div>
      </div>
      <button className="bg-primary text-secondary font-semibold rounded-md py-3 text-sm w-full hover:opacity-90">
        Save
      </button>
    </form>
  );
}

export default EditUserDetailsForm;
