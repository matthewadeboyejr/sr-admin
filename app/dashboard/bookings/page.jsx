"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import PageTitle from "@/components/general/PageTitle";

import Bookings from "@/components/table/Bookings";

const Booking = () => {
  return (
    <aside className=" flex-1  space-y-5">
      <section className="flex  justify-between ">
        <PageTitle heading={"Booking History"} />

        <form className="flex gap-3">
          <div className="border p-2 flex items-center gap-4 w-full rounded-3xl  ">
            <input
              className=" w-full text-xs outline-none bg-transparent"
              type="date"
              placeholder="Search user, artisan etc"
            />
          </div>

          <SubmitButton name={"Export "} />
        </form>
      </section>

      <Bookings />
    </aside>
  );
};

export default Booking;
