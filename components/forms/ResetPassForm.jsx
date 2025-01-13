import { FiEyeOff, FiEye } from "react-icons/fi";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

function ResetPassword() {
  return (
    <form className="w-full max-w-md space-y-6" aria-label="Login Form">
      <Image
        src="/Logo.png"
        width={100}
        height={100}
        alt="service rendering logo"
      />
      <button className="flex text-sm items-center gap-3">
        <span className=" text-secondary">
          <IoIosArrowDropleft />
        </span>
        <span>Go Back</span>
      </button>
      <div>
        <h1 className="text-2xl font-medium">Reset password</h1>
        <p className="text-xs">Kindly enter a new password</p>
      </div>

      {/*New password */}
      <div className="space-y-2">
        <label className="text-xs" htmlFor="newPassword">
          password
        </label>
        <div className="flex border border-secondary/20  justify-between p-3 items-center pr-5 rounded-md ">
          <input
            className="bg-transparent w-full outline-none laceholder:text-xs"
            id="newPassword"
            placeholder="Enter your password"
            type="password"
            name="newPassword"
            required
          />
          <button className="hover:cursor-pointer">
            <FiEye />
          </button>
        </div>
      </div>
      {/* Confirm password */}
      <div className="space-y-2">
        <label className="text-xs" htmlFor="confimPassword">
          Confirm password
        </label>
        <div className="flex border border-secondary/20  justify-between p-3 items-center pr-5 rounded-md ">
          <input
            className="bg-transparent w-full outline-none laceholder:text-xs"
            id="confimPassword"
            placeholder="comfirm your password"
            type="password"
            name="confimPassword"
            required
          />
          <button className="hover:cursor-pointer">
            <FiEye />
          </button>
        </div>
      </div>
      <button className="bg-primary text-secondary font-semibold rounded-md py-3 text-sm w-full hover:opacity-90">
        Confirm Otp
      </button>
      <p className="text-sm space-x-2 font-medium">
        <span>Didnt get the code ?</span>
        <Link className="   text-secondary    hover:opacity-90" href={""}>
          Resend
        </Link>
      </p>
    </form>
  );
}

export default ResetPassword;
