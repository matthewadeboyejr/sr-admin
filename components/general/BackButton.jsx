import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDropleft } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex text-sm items-center gap-3 "
    >
      <span className=" text-secondary">
        <IoIosArrowDropleft />
      </span>
      <span>Go Back</span>
    </button>
  );
};

export default BackButton;
