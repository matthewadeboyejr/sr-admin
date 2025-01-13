"use client";

import { useModalControl } from "@/context/ModalControl";
import { useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";

export default function Subscriptions() {
  const { setOpenSubscriptionDetails } = useModalControl();

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <section className="gap-5 ">
      <div className="min-h-96 overflow-y-auto space-y-4 relative overflow-x-auto border p-3 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Subscriptions</h2>
          <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-primary/10  rounded-md space sticky top-0 whitespace-nowrap">
            <tr>
              <th scope="col" className="py-3 px-6 ">
                Artisan Name
              </th>
              <th scope="col" className="py-3 px-6 ">
                Service
              </th>
              <th scope="col" className="py-3 px-6 ">
                Status
              </th>
              <th scope="col" className="py-3 px-6 ">
                Date of subscriptions
              </th>
              <th scope="col" className="py-3 px-6 ">
                Next subscriptions
              </th>
              <th scope="col" className="py-3  ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            <tr>
              <td className="px-6 py-4">Matthew Adeboye</td>
              <td className="px-6 py-4">Service User</td>
              <td className="px-6 py-4">
                {" "}
                <p className="text-xs p-2 rounded-md bg-green-200 text-green-800 font-medium w-fit">
                  Active
                </p>
              </td>
              <td className="px-6 py-4">1/2/24</td>
              <td className="px-6 py-4">1/2/24</td>
              <td>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <CiCircleMore />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="text-xs">
                        <li
                          onClick={() => {
                            setOpenSubscriptionDetails(true);
                            toggleDropdown();
                          }}
                          className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer"
                        >
                          View Details
                        </li>

                        <li className="text-red-600 hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
                          Stop next Subscription
                        </li>
                      </ul>
                      <span
                        className="pt-2 cursor-pointer hover:opacity-70 text-lg flex justify-center"
                        onClick={toggleDropdown}
                      >
                        <IoMdClose />
                      </span>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
