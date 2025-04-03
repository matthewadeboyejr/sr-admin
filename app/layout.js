import "./globals.css";
import { ModalControlProvider } from "@/context/ModalControl";
import { LoginProvider } from "@/context/LoginContext";
import { Toaster } from "react-hot-toast";
import Progress from "@/components/general/Progress";

export const metadata = {
  title: "Service rendering",
  description:
    "Connecting you with trusted artisans for all your household and environmental fixes ASAP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginProvider>
          <ModalControlProvider>
            <Toaster />
            <Progress />
            {children}
          </ModalControlProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
