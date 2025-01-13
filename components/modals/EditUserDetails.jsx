import { useModalControl } from "@/context/ModalControl";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import EditUserDetailsForm from "../forms/EditUserDetailsForm";

export default function EditUserDetails() {
  const { openEditUserDetails, setOpenEditUserDetails } = useModalControl();
  return (
    <>
      {openEditUserDetails && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openEditUserDetails && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <h3 className="text-sm font-medium">Edit Service Details</h3>
              <button
                onClick={() => setOpenEditUserDetails(false)}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <EditUserDetailsForm />
          </div>
        </div>
      )}
    </>
  );
}
