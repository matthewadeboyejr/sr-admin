import React from "react";
import { MdAccountCircle } from "react-icons/md";

const ArtisanBusinessDetails = () => {
  return (
    <section className="space-y-4 border p-3 rounded-md shadow-sm ">
      <div className="flex items-center gap-3">
        <h2 className="font-medium">Business Details</h2>
        {/* <button
          onClick={() => setOpenEditUserDetails(true)}
          className="text-secondary font-medium"
        >
          Edit
        </button> */}
      </div>

      <div className="flex md:flex-row flex-col  items-center gap-4">
        <span className="text-5xl">
          <MdAccountCircle />
        </span>
        <div className="grid md:grid-cols-5 grid-cols-2  gap-5 w-full">
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">Full Business Name</span>
            <span className="font-semibold">Matthew</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">City</span>
            <span className="font-semibold">Adeboye</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className=" opacity-50">County</span>
            <span className="font-semibold">+1234455333</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">Postal Code</span>
            <span className="font-semibold">Adeboye@gmail.com</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">Business Address</span>
            <span className="font-semibold">Shelfield, 1ba 291</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanBusinessDetails;
