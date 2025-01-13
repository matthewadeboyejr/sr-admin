import localFont from "next/font/local";
import "./globals.css";
import { ModalControlProvider } from "@/context/ModalControl";
import { LoginProvider } from "@/context/LoginContext";
import { Toaster } from "react-hot-toast";

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
            {children}
          </ModalControlProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
