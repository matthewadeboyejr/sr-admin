"use client";

import {
  IoFilterOutline,
  IoInformationCircle,
  IoWalletOutline,
} from "react-icons/io5";
import SubmitButton from "@/components/buttons/SubmitButton";
import { CiCircleMore } from "react-icons/ci";
import PageTitle from "@/components/general/PageTitle";
import { GoArrowUpRight } from "react-icons/go";
import RevenueChart from "@/components/chart/RevenueChart";
import SignupComparisonChart from "@/components/chart/SignupComparisonChart";
import { useUserContext } from "@/context/UsersContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { handleGetOverview, overviewState, setOverviewState } =
    useUserContext();

  const yearValue = overviewState?.year ? `${overviewState.year}-01-01` : "";

  const handleYearChange = (e) => {
    const { value } = e.target;
    const selectedYear = new Date(value).getFullYear();
    setOverviewState((prev) => ({ ...prev, year: selectedYear }));
  };

  useEffect(() => {
    handleGetOverview();
  }, [yearValue]);

  const overviews = overviewState?.getData;
  const overview = overviewState?.getData?.overview || {};
  const totalRev = overview?.revenue?.total || 0;
  const paidSub = overview?.revenue?.total_paid_subscribers || 0;
  const activeArtisan = overview?.active_artisan || 0;
  const activeServUser = overview?.active_service_user || 0;

  console.log("Overview", overviews);

  return (
    <aside className=" flex-1  space-y-5">
      <section className="flex items-center justify-between">
        <PageTitle heading={"Overview"} />

        <form className="flex gap-3">
          <div className="border p-2 flex items-center gap-4 w-full rounded-3xl  ">
            <input
              className=" w-full text-xs outline-none bg-transparent"
              type="date"
              value={yearValue}
              onChange={handleYearChange}
            />
          </div>

          <SubmitButton name={"Export "} />
        </form>
      </section>

      {/*       Overview */}
      <section className=" grid gap-5 md:grid-cols-3 grid-cols-1">
        <div className="p-4 bg-primary/5 rounded-md space-y-1 hover:scale-y-105">
          <p className="flex items-center justify-between text-xs">
            <span>Total Revenue</span>
            <span>
              <GoArrowUpRight />
            </span>
          </p>
          <p className="text-2xl font-semibold">£ {totalRev}</p>
          <p className="text-xs">
            <span>Revenue </span>
            <span>from {paidSub} subscribers</span>
          </p>
        </div>
        <div className="p-4 border rounded-md space-y-1 hover:scale-y-105">
          <p className="flex items-center justify-between text-xs">
            <span>Active Service Users</span>
            <span className="">
              <GoArrowUpRight />
            </span>
          </p>
          <p className="text-2xl font-semibold">{activeServUser}</p>
          <p className="text-xs">
            <span>Request. </span>
            <span> from ,500 users</span>
          </p>
        </div>
        <div className="p-4 border rounded-md space-y-1 hover:scale-y-105">
          <p className="flex items-center justify-between text-xs">
            <span>Active Artisans</span>
            <span>
              <GoArrowUpRight />
            </span>
          </p>
          <p className="text-2xl font-semibold">{activeArtisan}</p>
          <p className="text-xs">
            <span>Bookings. </span>
            <span> from 500 Artisans</span>
          </p>
        </div>
      </section>
      {/* Charts */}
      <section className="grid md:grid-cols-2 grid-cols-1 gap-5  ">
        <div className=" flex flex-col space-y-4   border p-3 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-secondary">
                <IoWalletOutline />
              </span>
              <h2 className="font-medium">Revenue overview</h2>
              <span className="text-gray-300">
                <IoInformationCircle />
              </span>
            </div>
          </div>
          <RevenueChart />
        </div>
        <div className="border p-3 rounded-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Activities</h2>
          </div>
          <SignupComparisonChart />
        </div>
      </section>
      {/*       tables */}
      {/*   <section className="grid  gap-5 md:grid-cols-2 grid-cols-1 ">
        <div className=" space-y-4 relative overflow-x-auto border p-3 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Registered users</h2>
            <div className="border p-2 flex items-center gap-4  rounded-3xl ">
              <span className="w-3 h-3 rounded-full opacity-30">
                <IoFilterOutline />
              </span>
              <span className="text-xs  ">Filter</span>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right  ">
            <thead>
              <tr>
                <th scope="col" class=" py-3">
                  User
                </th>
                <th scope="col" class=" py-3">
                  Type
                </th>
                <th scope="col" class=" py-3">
                  Status
                </th>
                <th scope="col" class=" py-3">
                  Reg.Date
                </th>
                <th scope="col" class=" py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {" "}
              <tr>
                <td>Matthew Adeboye</td>
                <td>Service User</td>
                <td>Active</td>
                <td>1/2/24</td>
                <td>
                  <CiCircleMore />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border p-3 rounded-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Activities</h2>
            <button className="border p-2 flex items-center gap-4  rounded-3xl ">
              <span className="w-3 h-3 rounded-full opacity-30">
                <IoFilterOutline />
              </span>
              <span className="text-xs  ">Filter</span>
            </button>
          </div>
          <div className="opacity-80 text-sm space-y-2">
            <p>
              <span className="text-secondary">Matthew Adeboye</span>{" "}
              Successfully registered as a service user
            </p>
            <p>
              <span className="text-secondary">Matthew Adeboye</span> changed is
              password
            </p>
          </div>
        </div>
      </section> */}
    </aside>
  );
};

export default Dashboard;
