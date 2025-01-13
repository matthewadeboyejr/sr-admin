"use client";

import React, { createContext, useContext, useState } from "react";

const ModalControl = createContext({});

export const ModalControlProvider = ({ children }) => {
  const [openUserBookingDetail, setOpenUserBookingDetail] = useState(false);
  const [openEditUserDetails, setOpenEditUserDetails] = useState(false);
  const [openSubscriptionDetails, setOpenSubscriptionDetails] = useState(false);
  const [openPaymentDetails, setOpenPaymentDetails] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openBookingDetails, setOpenBookingDetails] = useState(false);
  const [openEditBooking, setOpenEditBooking] = useState(false);
  const [openCategoryDetails, setOpenCategoryDetails] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openUploadCtgImage, setOpenUploadCtgImage] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);

  return (
    <ModalControl.Provider
      value={{
        openUserBookingDetail,
        setOpenUserBookingDetail,
        openEditUserDetails,
        setOpenEditUserDetails,
        openSubscriptionDetails,
        setOpenSubscriptionDetails,
        openMobileNav,
        setOpenMobileNav,
        openPaymentDetails,
        setOpenPaymentDetails,
        openBookingDetails,
        setOpenBookingDetails,
        openEditBooking,
        setOpenEditBooking,
        openCategoryDetails,
        setOpenCategoryDetails,
        openAddCategory,
        setOpenAddCategory,
        openUploadCtgImage,
        setOpenUploadCtgImage,
        openEditCategory,
        setOpenEditCategory,
      }}
    >
      {children}
    </ModalControl.Provider>
  );
};

export default ModalControl;

export const useModalControl = () => useContext(ModalControl);
