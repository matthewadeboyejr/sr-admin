import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Login into your account",
};

const Login = () => {
  return (
    <>
      <div className="fixed m-8">
        <Link href={"/"}>
          <Image
            src="/Logo.png"
            width={100}
            height={100}
            alt="service rendering logo"
          />
        </Link>
      </div>

      <div className="h-screen w-screen flex items-center justify-center px-8">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
