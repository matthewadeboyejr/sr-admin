"use client";

import { useUserContext } from "@/context/UsersContext";
import { axiosInstance } from "@/lib/api";
import { formatTimestamp } from "@/utils/formatTimestamp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";

export default function Artisans() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { userState, handleUserStatus, handleGetUsers } = useUserContext();

  const router = useRouter();
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetUsers("artisan-user", page);
  }, [page]);

  const artisansList = userState?.artisans?.getData?.results || [];
  const prevPage = userState?.artisans?.getData?.previous || "";
  const nextPage = userState?.artisans?.getData?.next || "";

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setPage((prev) => prev - 1);
    }
  };

  const handleViewProfile = (id) => {
    router.push(`/dashboard/users/${id}/artisan`);
  };

  const toggleDropdown = (userId) => {
    setIsDropdownOpen((prev) => (prev === userId ? null : userId));
  };

  const DropdownMenu = ({ toggleDropdown, id, status }) => {
    const action = () => (status ? "deactivate" : "activate");
    return (
      <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="text-xs">
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button onClick={() => handleViewProfile(id)}>View profile</button>
          </li>
          {/*   <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            Services
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            Message
          </li> */}
          <li
            onClick={() => {
              handleUserStatus(action(), "artisan-users", id);
              handleGetUsers("artisan-users");
              toggleDropdown(null);
            }}
            className={`${
              status ? "text-red-600" : "text-green-600"
            } " hover:bg-secondary/20 p-2 rounded-md cursor-pointer"`}
          >
            {status ? "Deactivate" : "Activate"}
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
          Business Name
        </th>
        <th scope="col" className="py-3 px-6 ">
          Business details
        </th>
        <th scope="col" className="py-3 px-6 ">
          Email
        </th>

        <th scope="col" className="py-3 px-6 ">
          Address
        </th>
        <th scope="col" className="py-3 px-6 ">
          Status
        </th>
        <th scope="col" className="py-3 px-6 ">
          Reg. Date
        </th>

        <th scope="col" className=" py-3 pr-4 ">
          Action
        </th>
      </tr>
    );
  };

  const TableRow = ({ user, toggleDropdown, isDropdownOpen }) => {
    const createdAt = formatTimestamp(user.created_at);
    const users = user.user;
    const firstName = users.first_name;
    const lastName = users.last_name;
    const fullName = firstName + " " + lastName;
    return (
      <tr>
        <td className="px-6 py-4">{user.business_name || "N/A"}</td>
        <td className="px-6 py-4">{user.business_detail || "N/A"}</td>
        <td className="px-6 py-4">{users.email || "N/A"}</td>
        <td className="px-6 py-4">{user.address || "N/A"}</td>
        <td className="px-6 py-4 ">
          <p
            className={`${
              users?.is_active
                ? "text-green-700 bg-green-100"
                : "bg-red-100 text-red-600"
            }  py-1 px-2 rounded-md w-fit`}
          >
            {users?.is_active ? "Active" : "Not Active"}
          </p>
        </td>
        <td className="px-6 py-4">{createdAt || "N/A"}</td>

        <td>
          <div className="relative">
            <button
              onClick={() => toggleDropdown(user.id)}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <CiCircleMore />
            </button>
            {isDropdownOpen === user.id && (
              <DropdownMenu
                id={user?.id}
                status={users?.is_active}
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
          <h2 className="font-medium">Artisans</h2>
          <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div>
        </div>
        {artisansList.length === 0 ? (
          <p className="text-center opacity-60 text-sm ">
            No artisans data available
          </p>
        ) : (
          <div className="min-h-96  space-y-4 relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="bg-primary/10  rounded-md whitespace-nowrap">
                <TableHeader />
              </thead>
              <tbody className="whitespace-nowrap">
                {artisansList.map((user) => (
                  <TableRow
                    key={user.id}
                    user={user}
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
    </section>
  );
}
