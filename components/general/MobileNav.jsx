"use client";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

import { NavList } from "./NavList";
import { useModalControl } from "@/context/ModalControl";
import { useAuth } from "@/lib/auth";

export function MobileNav() {
  const { openMobileNav, setOpenMobileNav } = useModalControl();
  const { logout } = useAuth();
  return (
    <>
      {openMobileNav && (
        <nav className="bg-primary h-screen p-5 rounded-r-lg fixed inset-0 z-50">
          <div className=" h-full flex flex-col gap-10 ">
            <div className="flex justify-between gap-10 items-center">
              <Image
                src="/Logo-yellow.png"
                width={100}
                height={100}
                alt="service rendering logo"
              />
              <button
                className="text-secondary text-2xl "
                onClick={() => setOpenMobileNav(false)}
              >
                <IoMdClose />
              </button>
            </div>
            <NavList />
            <button
              onClick={() => {
                logout();
              }}
              className="flex items-center gap-2  text-lg text-red-600  hover:bg-white/20 rounded-md p-2"
            >
              <span className="">
                <BiLogOut />
              </span>
              <span className="">Log Out</span>
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
