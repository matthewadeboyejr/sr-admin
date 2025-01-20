"use client";

import { useUserContext } from "@/context/UsersContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import Table from "../skeleton/Table";

export default function ArtisanServices() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { userState, serviceState, handleUserStatus, handleGetService } =
    useUserContext();

  const artisanId = userState?.artisans?.profileData?.id;

  useEffect(() => {
    handleGetService(artisanId);
  }, [artisanId]);

  const serviceList = serviceState?.data?.results || [];
  const isLoading = serviceState?.loading;
  const router = useRouter();

  const params = useParams();
  const { id } = params || {};

  const handleViewPayments = (serviceid) => {
    router.push(`/dashboard/users/${id}/artisan/${serviceid}/payment`);
  };

  const toggleDropdown = (serviceId) => {
    setIsDropdownOpen((prev) => (prev === serviceId ? null : serviceId));
  };

  const DropdownMenu = ({ toggleDropdown, id, status }) => {
    const action = () => (status ? "deactivate" : "activate");
    return (
      <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="text-xs">
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button onClick={() => handleViewPayments(id)}>
              View Payments{" "}
            </button>
          </li>
          {/* <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            Activities
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            Message
          </li> */}
          <li
            onClick={() => {
              handleUserStatus(action(), "service-users", id);
              handleGetUsers("service-users");
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
          Service Catogory
        </th>
        <th scope="col" className="py-3 px-6 ">
          Type
        </th>
        <th scope="col" className="py-3 px-6 ">
          Price
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

  const TableRow = ({ service, toggleDropdown, isDropdownOpen }) => {
    const createdAt = formatTimestamp(service?.created_at);
    const businesName = service?.artisan?.business_name;
    const catogory = service?.service_category?.category;
    const status = service?.service_category?.is_active;
    const type = service?.subscription_id.name;
    const price = service?.subscription_id?.price;
    const serviceId = service?.id;

    return (
      <tr>
        <td className="px-6 py-4">{businesName || "N/A"}</td>
        <td className="px-6 py-4">{catogory || "N/A"}</td>
        <td className="px-6 py-4">{type || "N/A"}</td>
        <td className="px-6 py-4">{price || "N/A"}</td>
        <td className="px-6 py-4">
          <p
            className={`${
              status ? "text-green-700 bg-green-100" : "bg-red-100 text-red-600"
            }  py-1 px-2 rounded-md w-fit`}
          >
            {status ? "Active" : "Not Active"}
          </p>
        </td>
        <td className="px-6 py-4">{createdAt}</td>
        <td>
          <div className="relative">
            <button
              onClick={() => toggleDropdown(serviceId)}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <CiCircleMore />
            </button>
            {isDropdownOpen === serviceId && (
              <DropdownMenu
                id={serviceId}
                status={status}
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
      <div className="border  p-3 rounded-md shadow-sm space-y-5 ">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Subscribed Services </h2>
          <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div>
        </div>
        {isLoading && <Table />}
        {serviceList.length === 0 ? (
          <p className="text-center opacity-60 text-sm ">
            No service data available
          </p>
        ) : (
          <div className="max-h-screen min-h-96 overflow-y-auto space-y-4 relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="bg-primary/10  rounded-md  whitespace-nowrap">
                <TableHeader />
              </thead>
              <tbody className="whitespace-nowrap">
                {serviceList.map((service) => (
                  <TableRow
                    key={service.id}
                    service={service}
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
