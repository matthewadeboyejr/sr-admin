import { useModalControl } from "@/context/ModalControl";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import EditBookingForm from "../forms/EditBookingForm";
import { storage } from "@/utils/storage";

export default function EditBooking() {
  const { openEditBooking, setOpenEditBooking } = useModalControl();

  return (
    <>
      {openEditBooking && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openEditBooking && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <div className="flex gap-2 items-center">
                <h3 className="text-sm font-medium"> Edit Booking </h3>
              </div>
              <button
                onClick={() => {
                  storage.remove("BookingId");
                  setOpenEditBooking(false);
                }}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <EditBookingForm />
          </div>
        </div>
      )}
    </>
  );
}
