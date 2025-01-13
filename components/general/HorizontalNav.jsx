"use client";

import { useModalControl } from "@/context/ModalControl";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

import {
  RiArrowDropDownLine,
  RiNotification3Line,
  RiSearch2Line,
} from "react-icons/ri";

export default function HorizontalNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setOpenMobileNav } = useModalControl();
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-between mb-5 gap-6">
      <button
        className="text-secondary text-lg  md:hidden"
        onClick={() => setOpenMobileNav(true)}
      >
        <IoMenuOutline />
      </button>
      <form>
        <div className="border p-2 flex items-center gap-4 w-full rounded-3xl ">
          <span className="w-3 h-3 rounded-full opacity-30">
            <RiSearch2Line />
          </span>
          <input
            className=" w-full placeholder:text-xs outline-none bg-transparent"
            placeholder="Search user, artisan etc"
          />
        </div>
      </form>
      <div className="flex items-center gap-3">
        <span>
          <BiMessageSquareDetail />
        </span>
        <span>
          <RiNotification3Line />
        </span>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`${
              isDropdownOpen
                ? "border-2 rounded-3xl transition-all duration-1000 "
                : ""
            } inline-flex items-center gap-2 py-1 `}
          >
            <p>
              <MdAccountCircle />
            </p>

            <p className="flex items-center ">
              <span className="text-xs font-semibold text-secondary hidden md:block">
                Oluwaseyi Adedeji
              </span>
              <span
                className={`${
                  isDropdownOpen
                    ? "rotate-180 transition-all duration-1000"
                    : ""
                } text-xl`}
              >
                <RiArrowDropDownLine />
              </span>
            </p>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <div className="text-xs space-y-2 p-2 md:space-y-1 flex flex-col">
                <Link
                  href={""}
                  className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer font-medium"
                >
                  Profile
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer font-medium w-full"
                >
                  Setting
                </Link>

                <Link
                  href={""}
                  className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer font-medium"
                >
                  Change Password
                </Link>

                <button
                  onClick={() => {
                    logout();
                  }}
                  className="text-red-600 hover:bg-secondary/20 p-2 rounded-md cursor-pointer font-medium w-full text-left"
                >
                  Sign Out
                </button>
              </div>
              <span
                className="pt-2 cursor-pointer hover:opacity-70 text-lg flex justify-center"
                onClick={toggleDropdown}
              >
                <IoMdClose />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
