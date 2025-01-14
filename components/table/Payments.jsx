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
import { storage } from "@/utils/storage";

export default function Payments() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { handleGetPayment, paymentState } = useUserContext();
  const { setOpenPaymentDetails } = useModalControl();

  const [page, setPage] = useState(1);

  const params = useParams();
  const { serviceid } = params || {};

  useEffect(() => {
    handleGetPayment(page, serviceid);
  }, []);

  const paymentsList = paymentState?.data?.results || [];
  const prevPage = paymentState?.data?.previous || "";
  const nextPage = paymentState?.data?.next || "";

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setPage((prev) => prev - 1);
    }
  };

  const toggleDropdown = (userId) => {
    setIsDropdownOpen((prev) => (prev === userId ? null : userId));
  };

  const handleDropdownActions = async (action, id) => {
    storage.set("paymentId", id);

    switch (action) {
      case "view":
        setOpenPaymentDetails(true);
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
              onClick={() => {
                //sessionStorage.setItem("paymentId", id);
                //setOpenPaymentDetails(true);

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
          Payment Date
        </th>
        <th scope="col" className="py-3 px-6 ">
          Amount
        </th>
        <th scope="col" className="py-3 px-6 ">
          Method
        </th>
        <th scope="col" className="py-3 px-6 ">
          Payment Id
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

  const TableRow = ({ payment, toggleDropdown, isDropdownOpen }) => {
    const paymentDate = formatTimestamp(payment?.payment_date);
    const amount = payment?.amount;
    const method = payment?.method;
    const paymentId = payment?.gocardless_payment_id;
    const status = payment?.status;
    const id = payment?.id;

    return (
      <tr>
        <td className="px-6 py-4">{paymentDate || "N/A"}</td>
        <td className="px-6 py-4">{amount || "N/A"}</td>
        <td className="px-6 py-4">{method || "N/A"}</td>
        <td className="px-6 py-4">{paymentId || "N/A"}</td>
        <td className="px-6 py-4 ">
          <p
            className={`${
              status === "successful"
                ? "text-green-700 bg-green-100"
                : "bg-red-100 text-red-600"
            }  py-1 px-2 rounded-md w-fit`}
          >
            {status}
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
          <h2 className="font-medium">Payments</h2>
          <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div>
        </div>
        {paymentsList.length === 0 ? (
          <p className="text-center opacity-60 text-sm ">
            No artisans data available
          </p>
        ) : (
          <div className="min-h-96 overflow-y-auto space-y-4 relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="bg-primary/10  rounded-md space sticky top-0 whitespace-nowrap">
                <TableHeader />
              </thead>
              <tbody className="whitespace-nowrap">
                {paymentsList.map((payment) => (
                  <TableRow
                    key={payment.id}
                    payment={payment}
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

      {setOpenPaymentDetails && <PaymentDetail />}
    </section>
  );
}
