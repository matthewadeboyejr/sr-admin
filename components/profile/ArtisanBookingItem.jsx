import React from "react";
import { LuClock } from "react-icons/lu";
import { useModalControl } from "@/context/ModalControl";

export default function ArtisanBookingItem() {
  const { setOpenUserBookingDetail } = useModalControl();
  return (
    <>
      <ul className="flex gap-3 flex-wrap ">
        <li
          onClick={() => setOpenUserBookingDetail(true)}
          className="text-sm flex flex-col gap-4 p-3 bg-secondary/10 rounded-md w-full md:w-fit cursor-pointer"
        >
          <div className="flex items-center justify-between gap-10">
            <p className="font-semibold flex gap-2 items-center">
              <span>
                <LuClock />
              </span>
              <span>March, 08 2024</span>
            </p>
            <p className="text-xs p-2 rounded-md bg-green-200 text-green-800 font-medium w-fit">
              Completed
            </p>
          </div>
          <div className="flex items-center justify-between gap-10">
            <p className="text-sm flex flex-col gap-">
              <span className="">Service</span>
              <span className="font-semibold">Plumbering</span>
            </p>
            <p className="text-sm flex flex-col gap-">
              <span className="">Service user</span>
              <span className="font-semibold">Matthew Adeboye</span>
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}
