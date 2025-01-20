"use client";

import { IoFilterOutline } from "react-icons/io5";

export default function Table() {
  const TableHeader = () => {
    return (
      <tr>
        <th scope="col" className="py-3 px-6 ">
          <p className="rounded-full h-3 w-14 bg-gray-300"></p>
        </th>
        <th scope="col" className="py-3 px-6 ">
          <p className="rounded-full h-3  w-14 bg-gray-300"></p>
        </th>
        <th scope="col" className="py-3 px-6 ">
          <p className="rounded-full h-3  w-14 bg-gray-300"></p>
        </th>
        <th scope="col" className="py-3 px-6 ">
          <p className="rounded-full h-3  w-14 bg-gray-300"></p>
        </th>
        <th scope="col" className="py-3 px-6 ">
          <p className="rounded-full h-3 w-14 bg-gray-300"></p>
        </th>
        <th scope="col" className=" py-3 pr-4 ">
          <p className="rounded-full h-3  w-14 bg-gray-300"></p>
        </th>
      </tr>
    );
  };

  const TableRow = ({ row }) => {
    return Array(row)
      .fill(0)
      .map((_, index) => (
        <tr key={index}>
          <td className="px-6 py-4 ">
            <p className="rounded-full h-3 w-full bg-gray-300"></p>
          </td>
          <td className="px-6 py-4">
            <p className="rounded-full h-3.5  w-full bg-gray-300"></p>
          </td>
          <td className="px-6 py-4">
            <p className="rounded-full h-3.5  w-full bg-gray-300"></p>
          </td>
          <td className="px-6 py-4">
            <p className="rounded-full h-3.5  w-full bg-gray-300"></p>
          </td>
          <td className="px-6 py-4 ">
            <p className="rounded-full h-3.5  w-full bg-gray-300"></p>
          </td>
          <td>
            <p className="rounded-full h-3.5  w-full bg-gray-300"></p>
          </td>
        </tr>
      ));
  };

  return (
    <section className="gap-5 ">
      <div className="min-h-96 overflow-y-auto space-y-4 relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-primary/5  rounded-md  whitespace-nowrap">
            <TableHeader />
          </thead>
          <tbody className="whitespace-nowrap">
            <TableRow row={5} />
          </tbody>
        </table>
      </div>
    </section>
  );
}
