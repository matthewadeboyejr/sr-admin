import { useModalControl } from "@/context/ModalControl";
import { useUserContext } from "@/context/UsersContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function PaymentDetail() {
  const { openPaymentDetails, setOpenPaymentDetails } = useModalControl();
  const { handlePaymentById, paymentState } = useUserContext();

  const paymentId = sessionStorage.getItem("paymentId");

  useEffect(() => {
    if (paymentId) {
      handlePaymentById(paymentId);
    }
  }, [paymentId]);

  const paymentDetail = paymentState?.paymentidData || {};
  const date = formatTimestamp(paymentDetail?.payment_date);
  const method = paymentDetail?.method;
  const amount = paymentDetail?.amount;
  const paymentRef = paymentDetail?.gocardless_payment_id;
  const status = paymentDetail?.status;

  return (
    <>
      {openPaymentDetails && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openPaymentDetails && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <h3 className="text-sm font-medium">Payment Details</h3>
              <button
                onClick={() => {
                  sessionStorage.removeItem("paymentId");
                  setOpenPaymentDetails(false);
                }}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <div className="space-y-4 mt-5 order-b">
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Payment Date & Time</span>
                <span className="text-xs font-medium">{date}</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Channel</span>
                <span className="text-xs font-medium">{method}</span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Amount</span>
                <span className="text-xs font-medium">{amount}</span>
              </p>

              <p className="grid grid-cols-2 ">
                <span className="text-xs">Status </span>
                <span className="text-xs font-medium p-2 bg-green-200 text-green-700 rounded-sm w-fit">
                  {status}
                </span>
              </p>
              <p className="grid grid-cols-2 ">
                <span className="text-xs">payment Reference </span>
                <span className="text-xs font-medium">{paymentRef}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
