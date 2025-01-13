"use client";
import { useEffect, useMemo, useState } from "react";
import SubmitButton from "@/components/buttons/SubmitButton";
import PageTitle from "@/components/general/PageTitle";
import ServiceUsers from "@/components/table/ServiceUsers";
import Artisans from "@/components/table/Artisans";
import { useUserContext } from "@/context/UsersContext";

const Users = () => {
  const titles = useMemo(() => ["Service Users", "Artisans"], []);
  const contents = useMemo(
    () => [<ServiceUsers key="ServiceUsers " />, <Artisans key="Artisans" />],
    []
  );
  const [displayContent, setDisplayContent] = useState(0);

  const handleTabClick = (index) => setDisplayContent(index);

  return (
    <aside className=" flex-1  space-y-5">
      <section className="flex items-center justify-between">
        <PageTitle heading={"Users"} />
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

      {/*       tables */}
      {contents[displayContent]}
    </aside>
  );
};

export default Users;
