"use client";
import { useEffect, useMemo, useState } from "react";
import SubmitButton from "@/components/buttons/SubmitButton";
import PageTitle from "@/components/general/PageTitle";
import ServiceUsers from "@/components/table/ServiceUsers";
import Artisans from "@/components/table/Artisans";
import { useUserContext } from "@/context/UsersContext";
import AdminUsers from "@/components/settings/AdminUsers";
import Security from "@/components/settings/Security";
import ServiceCategories from "@/components/table/ServiceCategories";
import ServiceCategory from "@/components/settings/ServiceCategory";

const Setting = () => {
  const titles = useMemo(() => ["Security", "Admins", "Services"], []);
  const contents = useMemo(
    () => [
      <Security key="security" />,
      <AdminUsers key="adminUsers" />,
      <ServiceCategory key="serviceCategory" />,
    ],
    []
  );
  const [displayContent, setDisplayContent] = useState(0);

  const handleTabClick = (index) => setDisplayContent(index);

  return (
    <aside className=" flex-1  space-y-5">
      <section className="flex items-center justify-between">
        <PageTitle heading={"Settings"} />
      </section>

      <section className="flex  justify-between ">
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
      </section>

      {/*       tables */}
      {contents[displayContent]}
    </aside>
  );
};

export default Setting;
