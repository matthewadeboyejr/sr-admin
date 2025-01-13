"use client";
import PageTitle from "@/components/general/PageTitle";
import UserProfile from "@/components/profile/UserProfile";
import UserBookingActivities from "@/components/profile/UserBookingActivities";
import UserBookingDetail from "@/components/modals/UserBookingDetail";
import EditUserDetails from "@/components/modals/EditUserDetails";
import { useParams } from "next/navigation";
import { useUserContext } from "@/context/UsersContext";
import { useEffect } from "react";

const Profile = () => {
  const { handleGetUserProfile, userState } = useUserContext();
  const profileData = userState?.serviceUsers?.profileData || {};
  const user = profileData?.user;

  const params = useParams();
  const { id } = params || {};

  useEffect(() => {
    handleGetUserProfile("service-user", id);
  }, [id]);

  return (
    <>
      <aside className=" flex-1 space-y-5">
        <section className="flex items-center justify-between">
          <PageTitle
            heading={user?.first_name + " " + user?.last_name || "User Profile"}
          />
        </section>
        <UserProfile />
        <UserBookingActivities />
      </aside>
      <UserBookingDetail />
      <EditUserDetails />
    </>
  );
};

export default Profile;
