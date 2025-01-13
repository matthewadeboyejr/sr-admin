"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import PageTitle from "@/components/general/PageTitle";

import Payments from "@/components/table/Payments";

const Payment = () => {
  return (
    <aside className=" flex-1  space-y-5">
      <section className="flex  justify-between ">
        <PageTitle heading={"Payment History"} />

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

      <Payments />
    </aside>
  );
};

export default Payment;
