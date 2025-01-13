import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";

function ConfirmSignup() {
  return (
    <form className="w-full max-w-md space-y-4" aria-label="Login Form">
      <div className="flex text-3xl items-center justify-center ">
        <span className=" text-green-700">
          <BiCheckCircle />
        </span>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-medium text-green-700">
          Sign up Complete
        </h1>
        <p className="text-xs">
          Wait for admin Activation, we will notify you{" "}
        </p>
      </div>

      <p className="text-sm space-x-2 font-medium text-center">
        <span>Go to</span>
        <Link className="   text-secondary    hover:opacity-90" href="/">
          Login page
        </Link>
      </p>
    </form>
  );
}

export default ConfirmSignup;
