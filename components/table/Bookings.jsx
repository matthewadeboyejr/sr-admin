"use client";

import { useModalControl } from "@/context/ModalControl";
import { useUserContext } from "@/context/UsersContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import PaymentDetail from "../modals/PaymentDetails";
import BookingDetail from "../modals/BookingDetails";
import EditBooking from "../modals/EditBooking";

export default function Bookings() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { handleGetBooking, bookingState } = useUserContext();
  const {
    setOpenBookingDetails,
    setOpenEditBooking,
    openBookingDetails,
    openEditBooking,
  } = useModalControl();

  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetBooking(page);
  }, [page, openEditBooking]);

  const bookingsList = bookingState?.data?.results || [];
  const prevPage = bookingState?.data?.previous || "";
  const nextPage = bookingState?.data?.next || "";

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setPage((prev) => prev - 1);
    }
  };

  const toggleDropdown = (bookingId) => {
    setIsDropdownOpen((prev) => (prev === bookingId ? null : bookingId));
  };

  const handleDropdownActions = (action, id) => {
    sessionStorage.setItem("bookingId", id);

    switch (action) {
      case "view":
        setOpenBookingDetails(true);
        break;
      case "edit":
        setOpenEditBooking(true);
        break;
      default:
        break;
    }

    setIsDropdownOpen(null);
  };

  const DropdownMenu = ({ toggleDropdown, id }) => {
    return (
      <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="text-xs">
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button
              className="w-full text-left"
              onClick={() => {
                handleDropdownActions("edit", id);
              }}
            >
              Edit
            </button>
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button
              className="w-full text-left"
              onClick={() => {
                handleDropdownActions("view", id);
              }}
            >
              View Details
            </button>
          </li>
        </ul>
        <span
          className="pt-2 cursor-pointer hover:opacity-70 text-lg flex justify-center"
          onClick={toggleDropdown}
        >
          <IoMdClose />
        </span>
      </div>
    );
  };

  const TableHeader = () => {
    return (
      <tr>
        <th scope="col" className="py-3 px-6 ">
          Appointment Date/time
        </th>
        <th scope="col" className="py-3 px-6 ">
          Customer
        </th>
        <th scope="col" className="py-3 px-6 ">
          Artisan
        </th>
        <th scope="col" className="py-3 px-6 ">
          Category
        </th>
        <th scope="col" className="py-3 px-6 ">
          Description
        </th>
        <th scope="col" className="py-3 px-6 ">
          Address
        </th>
        <th scope="col" className="py-3 px-6 ">
          Status
        </th>
        <th scope="col" className=" py-3 pr-4 ">
          Action
        </th>
      </tr>
    );
  };

  const TableRow = ({ booking, toggleDropdown, isDropdownOpen }) => {
    const appointmentDate = booking?.appointment_date;
    const appointmentTime = booking?.appointment_time;
    const customer = booking?.customer_name;
    const artisan = booking?.artisan_name;
    const category = booking?.service_category?.category;
    const description = booking?.service_description;
    const address = booking?.customer_address;
    const status = booking?.booking_status;
    const id = booking?.id;

    return (
      <tr>
        <td className="px-6 py-4">
          {appointmentDate + ";" + appointmentTime || "N/A"}
        </td>
        <td className="px-6 py-4">{customer || "N/A"}</td>
        <td className="px-6 py-4">{artisan || "N/A"}</td>
        <td className="px-6 py-4">{category || "N/A"}</td>
        <td className="px-6 py-4">{description || "N/A"}</td>
        <td className="px-6 py-4">{address || "N/A"}</td>
        <td className="px-6 py-4 ">
          <p
            className={`${
              status ? "text-green-700 bg-green-100" : "bg-red-100 text-red-600"
            }  py-1 px-2 rounded-md w-fit`}
          >
            {status ? "Active" : "Non Active"}
          </p>
        </td>

        <td>
          <div className="relative">
            <button
              onClick={() => toggleDropdown(id)}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <CiCircleMore />
            </button>
            {isDropdownOpen === id && (
              <DropdownMenu
                id={id}
                toggleDropdown={() => toggleDropdown(null)}
              />
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <section className="gap-5 ">
      <div className="border p-3 rounded-md shadow-sm space-y-5 ">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Bookings</h2>
          <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div>
        </div>
        {bookingsList.length === 0 ? (
          <p className="text-center opacity-60 text-sm ">
            No booking data available
          </p>
        ) : (
          <div className="min-h-96 overflow-y-auto space-y-4 relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="bg-primary/10  rounded-md space sticky top-0 whitespace-nowrap">
                <TableHeader />
              </thead>
              <tbody className="whitespace-nowrap">
                {bookingsList.map((booking) => (
                  <TableRow
                    key={booking.id}
                    booking={booking}
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={toggleDropdown}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="text-right">
          <p className="space-x-2">
            <button
              onClick={() => {
                handlePageChange("prev");
              }}
              disabled={!prevPage}
              className={`${
                !prevPage
                  ? "opacity-50 hover:bg-none "
                  : "hover:bg-secondary hover:border-none"
              } " w-12 h-12 rounded-full border text-sm transition-colors duration-500 "`}
            >
              Prev
            </button>

            <button
              onClick={() => {
                handlePageChange("next");
              }}
              disabled={!nextPage}
              className={`${
                !nextPage
                  ? "opacity-50 hover:bg-none "
                  : "hover:bg-secondary hover:border-none"
              } " w-12 h-12 rounded-full border text-sm transition-colors duration-500 "`}
            >
              Next
            </button>
          </p>
        </div>
      </div>
      {openBookingDetails && <BookingDetail />}
      {openEditBooking && <EditBooking />}
    </section>
  );
}
