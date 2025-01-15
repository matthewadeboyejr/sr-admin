import { useModalControl } from "@/context/ModalControl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUsers } from "react-icons/fi";
import { IoMdStarOutline } from "react-icons/io";
import {
  IoSettingsOutline,
  IoTimeOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { RiHeadphoneLine, RiHomeLine } from "react-icons/ri";

export function NavList() {
  const { openMobileNav, setOpenMobileNav } = useModalControl();
  const menu = [
    { title: "Overview", path: "/dashboard", icon: <RiHomeLine /> },
    { title: "Users", path: "/dashboard/users", icon: <FiUsers /> },
    { title: "Booking", path: "/dashboard/bookings", icon: <IoTimeOutline /> },
    /*     { title: "Payments", path: "", icon: <IoWalletOutline /> }, */
    /*  { title: "Feedbacks", path: "", icon: <IoMdStarOutline /> }, */
    /* { title: "Help Center", path: "", icon: <RiHeadphoneLine /> }, */
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: <IoSettingsOutline />,
    },
  ];

  const router = useRouter();

  const handleNavRoute = (link) => {
    router.push(link);

    if (openMobileNav) {
      setOpenMobileNav(false);
    }
  };

  return (
    <ul className="space-y-2 flex-1  whitespace-nowrap">
      {menu.map((link, index) => (
        <li key={index}>
          <button
            onClick={() => {
              handleNavRoute(link.path);
            }}
            className={`flex items-center gap-2 md:text-sm text-lg hover:bg-white/20 rounded-md p-2 pr-16`}
          >
            <span className="text-white">{link.icon}</span>
            <span className="text-secondary">{link.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
