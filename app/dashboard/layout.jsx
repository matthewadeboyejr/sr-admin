import HorizontalNav from "@/components/general/HorizontalNav";
import { MobileNav } from "@/components/general/MobileNav";
import SideNav from "@/components/general/SideNav";
import { UserContextProvider } from "@/context/UsersContext";

export default function DashboardLayout({ children }) {
  return (
    <UserContextProvider>
      <div className="flex max-h-screen ">
        <div className="md:block hidden ">
          <SideNav />
        </div>
        <div className="w-full p-5 overflow-y-auto">
          <HorizontalNav />
          {children}
          <MobileNav />
        </div>
      </div>
    </UserContextProvider>
  );
}
