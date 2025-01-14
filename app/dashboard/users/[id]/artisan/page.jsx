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

const Profile = () => {
  const { userState, handleGetUserProfile } = useUserContext();

  const profileData = userState?.artisans?.profileData || {};
  const user = profileData?.user;

  const params = useParams();
  const { id } = params || {};

  useEffect(() => {
    handleGetUserProfile("artisan-user", id);
  }, [id]);

  const titles = useMemo(() => [" Details", "Services"], []);
  const contents = useMemo(
    () => [
      <ArtisanProfile key="ArtisanProfile" />,
      <ArtisanServices key="ArtisanServices" />,
    ],
    []
  );
  const [displayContent, setDisplayContent] = useState(0);

  const handleTabClick = (index) => setDisplayContent(index);
  return (
    <>
      <aside className=" flex-1 space-y-5">
        <section className="flex items-center justify-between">
          <PageTitle
            heading={user?.first_name + " " + user?.last_name || "User Profile"}
          />
        </section>
        <ul className="flex items-center gap-2">
          {titles.map((title, index) => (
            <li
              onClick={() => handleTabClick(index)}
              key={index}
              className={`${
                displayContent === index ? " bg-secondary/40" : ""
              } cursor-pointer bg-secondary text-xs px-4 py-2 rounded-full`}
            >
              {title}
            </li>
          ))}
        </ul>
        {contents[displayContent]}
      </aside>
      <UserBookingDetail />
      <EditUserDetails />
      <SubscriptionDetails />
    </>
  );
};

export default Profile;
