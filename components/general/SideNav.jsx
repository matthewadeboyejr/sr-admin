"use client";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { NavList } from "./NavList";
import { useAuth } from "@/lib/auth";

function SideNav() {
  const { logout } = useAuth();
  return (
    <nav className="bg-primary h-screen p-5  rounded-r-lg ">
      <div className=" h-full flex flex-col gap-10 ">
        <div className="flex justify-between gap-10 items-center">
          <Image
            src="/Logo-yellow.png"
            width={100}
            height={100}
            alt="service rendering logo"
          />
          <span className="text-secondary md:hidden">
            <IoMdClose />
          </span>
        </div>
        <NavList />
        <button
          onClick={() => {
            logout();
          }}
          className="flex items-center gap-2  text-sm  text-red-600  hover:bg-white/20 rounded-md p-2"
        >
          <span className="">
            <BiLogOut />
          </span>
          <span className="">Log Out</span>
        </button>
      </div>
    </nav>
  );
}

export default SideNav;
