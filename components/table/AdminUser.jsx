"use client";

import { useUserContext } from "@/context/UsersContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import Table from "../skeleton/Table";

export default function AdminUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { userState, handleUserStatus, handleGetUsers } = useUserContext();

  useEffect(() => {
    handleGetUsers("users");
  }, [useState]);

  const adminUsersList = userState?.users?.getData?.results || [];
  const isLoading = userState?.users?.getLoading;

  const toggleDropdown = (userId) => {
    setIsDropdownOpen((prev) => (prev === userId ? null : userId));
  };

  const DropdownMenu = ({ toggleDropdown, id, status }) => {
    const action = () => (status ? "deactivate" : "activate");
    return (
      <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="text-xs">
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <Link href="/dashboard/users/artisan-profile">View profile</Link>
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            Activities
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            Message
          </li>
          <li
            onClick={() => {
              handleUserStatus(action(), "users", id);
              handleGetUsers("users");
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
          Full Name
        </th>
        <th scope="col" className="py-3 px-6 ">
          Email
        </th>
        <th scope="col" className="py-3 px-6 ">
          Status
        </th>
        <th scope="col" className="py-3 px-6 ">
          Last Login
        </th>
        <th scope="col" className=" py-3 pr-4 ">
          Action
        </th>
      </tr>
    );
  };

  const TableRow = ({ user, toggleDropdown, isDropdownOpen }) => {
    const lastLogin = formatTimestamp(user.last_login);
    const fullName = user.first_name + " " + user.last_name;
    return (
      <tr>
        <td className="px-6 py-4">{fullName || "N/A"}</td>
        <td className="px-6 py-4">{user.email || "N/A"}</td>
        <td className="px-6 py-4">
          <p
            className={`${
              user.is_active === true
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }   py-1 px-2 rounded-md w-fit`}
          >
            {user.is_active === true ? "Active" : "Deactivated"}
          </p>
        </td>
        <td className="px-6 py-4">{lastLogin || "N/A"}</td>
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
                status={user?.is_active}
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
          <h2 className="font-medium">Administrative users </h2>
          <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div>
        </div>
        {isLoading && <Table />}
        {adminUsersList && adminUsersList.length === 0 ? (
          <p className="text-center opacity-60 text-sm ">
            No Admin user data available
          </p>
        ) : (
          <div className="min-h-96 overflow-y-auto space-y-4 relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="bg-primary/10  rounded-md space sticky top-0 whitespace-nowrap">
                <TableHeader />
              </thead>
              <tbody className="whitespace-nowrap">
                {adminUsersList.map((user) => (
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
      </div>
    </section>
  );
}
