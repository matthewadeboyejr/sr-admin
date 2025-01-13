import ForgetPassForm from "@/components/forms/ForgetPassForm";

export const metadata = {
  title: "Forget Password",
  description: "forget password",
};

const ForgotPassword = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ForgetPassForm />
    </div>
  );
};

export default ForgotPassword;
