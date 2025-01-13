import { useUserContext } from "@/context/UsersContext";
import React from "react";
import { MdAccountCircle } from "react-icons/md";

const ArtisanPersonalDetails = () => {
  const { userState } = useUserContext();

  const profileData = userState?.artisans?.profileData || {};
  const user = profileData?.user;

  return (
    <section className="space-y-4 border p-3 rounded-md shadow-sm ">
      <div className="flex items-center gap-3">
        <h2 className="font-medium">Profile Details</h2>
        <button
          onClick={() => setOpenEditUserDetails(true)}
          className="text-secondary font-medium"
        >
          Edit
        </button>
      </div>

      <div className="flex md:flex-row flex-col items-center gap-4">
        <span className="text-5xl">
          <MdAccountCircle />
        </span>
        <div className="flex justify-between flex-wrap gap-5  w-full">
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">First Name</span>
            <span className="font-semibold"> {user?.first_name || "N/A"}</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">Last Name</span>
            <span className="font-semibold"> {user?.last_name || "N/A"}</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className=" opacity-50">Phone Number</span>
            <span className="font-semibold">
              {" "}
              {profileData?.phone || "N/A"}
            </span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">Email Address</span>
            <span className="font-semibold">{user?.email || "N/A"}</span>
          </p>
          <p className="text-sm flex flex-col gap-">
            <span className="opacity-50">Home Address</span>
            <span className="font-semibold">
              {" "}
              {profileData?.address || "N/A"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanPersonalDetails;
