import { useModalControl } from "@/context/ModalControl";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

export default function UserBookingDetail() {
  const { openUserBookingDetail, setOpenUserBookingDetail } = useModalControl();
  return (
    <>
      {openUserBookingDetail && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openUserBookingDetail && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <h3 className="text-sm font-medium">Booking Details</h3>
              <button
                onClick={() => setOpenUserBookingDetail(false)}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <div className="space-y-4 mt-5 order-b">
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Booking Date & Time</span>
                <span className="text-xs font-medium">
                  26 August 2024, 22:08:50
                </span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Service Date & Time</span>
                <span className="text-xs font-medium">
                  26 August 2024, 22:08:50
                </span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Artisan</span>
                <span className="text-xs font-medium">John Doe</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Client</span>
                <span className="text-xs font-medium">Matthew Adeboye</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Address</span>
                <span className="text-xs font-medium">Seffield, UK</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Service </span>
                <span className="text-xs font-medium">Plumbing</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Service description </span>
                <span className="text-xs font-medium">view</span>
              </p>

              <p className="grid grid-cols-2 ">
                <span className="text-xs">Status </span>
                <span className="text-xs font-medium p-2 bg-green-200 text-green-700 rounded-sm w-fit">
                  Completed
                </span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Reference </span>
                <span className="text-xs font-medium">32WKJNKX8WJ</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
