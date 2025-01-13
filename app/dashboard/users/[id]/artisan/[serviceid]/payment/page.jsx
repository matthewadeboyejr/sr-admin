"use client";
import PageTitle from "@/components/general/PageTitle";
import UserBookingDetail from "@/components/modals/UserBookingDetail";
import EditUserDetails from "@/components/modals/EditUserDetails";
import ArtisanProfile from "@/components/profile/ArtisanProfile";
import ArtisanBookingActivities from "@/components/profile/ArtisanBookingsActivities";
import { useEffect, useMemo, useState } from "react";
import ArtisanSubscriptions from "@/components/profile/ArtisanSubscriptions";
import SubscriptionDetails from "@/components/modals/SubscriptionDetails";
import { useUserContext } from "@/context/UsersContext";
import { useParams } from "next/navigation";
import ArtisanServices from "@/components/profile/ArtisanServices";
import Payments from "@/components/table/Payments";

const Profile = () => {
  const { userState } = useUserContext();

  const profileData = userState?.artisans?.profileData || {};
  const user = profileData?.user;

  return (
    <>
      <aside className=" flex-1 space-y-5">
        <section className="flex items-center justify-between">
          <PageTitle
            heading={user?.first_name + " " + user?.last_name || "User Profile"}
          />
        </section>
        <Payments />
      </aside>
    </>
  );
};

export default Profile;
