"use client";

import { useEffect, useRef, useState } from "react";
import { handleRequest } from "@/lib/api";
import { useModalControl } from "@/context/ModalControl";
import { CgSpinnerTwo } from "react-icons/cg";
import { storage } from "@/utils/storage";

const EditBookingForm = () => {
  const bookingId = storage.get("bookingId");
  const { openEditBooking, setOpenEditBooking } = useModalControl();

  const [putBooking, setPutBooking] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });

  const [updateBooking, setUpdateBooking] = useState({
    appointment_date: "",
    appointment_time: "",
    service_description: "",
  });

  const errRef = useRef();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const isLoading = putBooking?.loading;
  const errMsg = putBooking?.errMsg;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateBooking((prev) => ({ ...prev, [name]: value }));
  };

  const updatePutBooking = (updates) => {
    setPutBooking((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleEditBooking = async (e) => {
    e.preventDefault();

    const filteredBookingData = Object.fromEntries(
      Object.entries(updateBooking).filter(
        ([key, value]) => value.trim() !== ""
      )
    );

    await handleRequest({
      url: `/admin-app/bookings/${bookingId}/`,
      method: "put",
      data: filteredBookingData,
      setLoading: (loading) => updatePutBooking({ loading }),
      setError: (errMsg) => updatePutBooking({ errMsg }),
      setResponse: (responseData) => updatePutBooking({ data: responseData }),
    });

    setOpenEditBooking(false);
  };

  return (
    <>
      <form
        className="w-full  space-y-6"
        aria-label="Update Booking Form"
        onSubmit={handleEditBooking}
      >
        <div className="pt-5">
          <p className="text-xs">Fill only the neccessary field </p>
        </div>

        <p
          ref={errRef}
          className={
            errMsg
              ? "text-xs bg-red-50  p-3 rounded-md text-red-500"
              : "absolute left-[-9999px]"
          }
        >
          {errMsg}
        </p>
        <div className="flex items-center gap-3 w-full ">
          {/*  appointment_date */}
          <div className="space-y-2 w-full">
            <label className="text-xs " htmlFor="appointment_date">
              Appointment Date
            </label>
            <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
              <input
                className="bg-transparent w-full outline-none placeholder:text-xs"
                id="appointment_date"
                placeholder="e.g john"
                type="date"
                name="appointment_date"
                value={updateBooking?.appointment_date}
                onChange={handleChange}
                ref={inputRef}
                aria-required="true"
              />
            </div>
          </div>
          {/*     appointment_time */}

          <div className="space-y-2 w-full">
            <label className="text-xs " htmlFor="appointment_time">
              Appointment Time
            </label>
            <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
              <input
                className="bg-transparent w-full outline-none placeholder:text-xs"
                id="appointment_time"
                placeholder="e.g doe"
                type="time"
                name="appointment_time"
                value={updateBooking?.appointment_time}
                onChange={handleChange}
                autoComplete="on"
                aria-required="true"
              />
            </div>
          </div>
        </div>
        {/* Service Description */}
        <div className="space-y-2">
          <label className="text-xs " htmlFor="service_description">
            Service Description
          </label>
          <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
            <textarea
              className="bg-transparent w-full outline-none placeholder:text-xs"
              id="service_description"
              placeholder="write a service description"
              type="text"
              name="service_description"
              value={updateBooking?.service_description}
              onChange={handleChange}
              autoComplete="on"
              aria-required="true"
            />
          </div>
        </div>
        {/*button*/}

        <button
          type="submit"
          className="bg-primary text-secondary font-semibold rounded-md py-3 text-sm w-full hover:opacity-90"
        >
          <div className="flex justify-center items-center">
            {isLoading ? (
              <CgSpinnerTwo className="animate-spin text-2xl" />
            ) : (
              "Update Booking"
            )}
          </div>
        </button>
      </form>
    </>
  );
};
export default EditBookingForm;
