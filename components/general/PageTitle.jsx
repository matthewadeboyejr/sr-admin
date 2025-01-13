import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";

export default function PageTitle({ heading }) {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-3 md:text-2xl"
      onClick={() => router.back()}
    >
      <span className=" text-secondary hover:opacity-80">
        <IoIosArrowDropleft />
      </span>
      <h1 className="">{heading}</h1>
    </button>
  );
}

export const SubTitle = (heading) => {
  return <div></div>;
};
