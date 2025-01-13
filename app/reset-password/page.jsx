import ResetPassForm from "@/components/forms/ResetPassForm";

export const metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const ResetPassword = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ResetPassForm />
    </div>
  );
};

export default ResetPassword;
