import { useModalControl } from "@/context/ModalControl";
import { useUserContext } from "@/context/UsersContext";
import { storage } from "@/utils/storage";
import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function BookingDetail() {
  const { openBookingDetails, setOpenBookingDetails } = useModalControl();
  const { handleBookingById, bookingState } = useUserContext();

  //const bookingId = sessionStorage.getItem("bookingId") || null;

  const bookingId = storage.get("bookingId");

  useEffect(() => {
    if (openBookingDetails && bookingId) {
      handleBookingById(bookingId);
    }
  }, [openBookingDetails, bookingId]);

  const bookingDetail = bookingState?.bookingidData || {};
  const appointmentDate = bookingDetail?.appointment_date;
  const appointmentTime = bookingDetail?.appointment_time;
  const customer = bookingDetail?.customer_name;
  const artisan = bookingDetail?.artisan_name;
  const category = bookingDetail?.service_category?.category;
  const description = bookingDetail?.service_description;
  const address = bookingDetail?.customer_address;
  const status = bookingDetail?.booking_status;
  const id = bookingDetail?.id;

  return (
    <>
      {openBookingDetails && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openBookingDetails && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <div className="flex gap-2 items-center">
                <h3 className="text-sm font-medium">Booking Details</h3>
                {/* <button className="text-secondary text-sm">Edit</button> */}
              </div>
              <button
                onClick={() => {
                  //sessionStorage.removeItem("paymentId");
                  storage.remove("bookingId");
                  setOpenBookingDetails(false);
                }}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <div className="space-y-4 mt-5 order-b">
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Payment Date & Time</span>
                <span className="text-xs font-medium">
                  {appointmentDate + ";" + appointmentTime || "N/A"}
                </span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Customer</span>
                <span className="text-xs font-medium">{customer}</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Artisan</span>
                <span className="text-xs font-medium">{artisan}</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Category</span>
                <span className="text-xs font-medium">{category}</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Description </span>
                <span className="text-xs font-medium">{description}</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs"> Address </span>
                <span className="text-xs font-medium">{address}</span>
              </p>

              <p className="grid grid-cols-2 ">
                <span className="text-xs">Status </span>
                <span
                  className={`${
                    status
                      ? "text-green-700 bg-green-100"
                      : "bg-red-100 text-red-600"
                  }  py-1 px-2 rounded-md w-fit`}
                >
                  {status ? "Active" : "Non Active"}
                </span>
              </p>
              {/*   <p className="grid grid-cols-2 ">
                <span className="text-xs">payment Reference </span>
                <span className="text-xs font-medium">{paymentRef}</span>
              </p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
