import { useModalControl } from "@/context/ModalControl";
import { useUserContext } from "@/context/UsersContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import EditBookingForm from "../forms/EditBookingForm";
import AddCategoryForm from "../forms/AddCategoryForm";
import { storage } from "@/utils/storage";

export default function AddCategory() {
  const { openAddCategory, setOpenAddCategory } = useModalControl();

  return (
    <>
      {openAddCategory && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openAddCategory && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <div className="flex gap-2 items-center">
                <h3 className="text-sm font-medium"> Add Service Category</h3>
              </div>
              <button
                onClick={() => {
                  //sessionStorage.removeItem("BookingId");

                  setOpenAddCategory(false);
                }}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <AddCategoryForm />
          </div>
        </div>
      )}
    </>
  );
}
