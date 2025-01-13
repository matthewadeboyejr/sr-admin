"use client";

import { handleRequest } from "@/lib/api";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [overviewState, setOverviewState] = useState({
    data: "",
    getData: "",
    loading: false,
    getLoading: false,
    errMsg: "",
    getErrMsg: "",
    year: new Date().getFullYear(),
  });

  const [userState, setUserState] = useState({
    users: {
      data: "",
      getData: "",
      profileData: "",
      loading: false,
      getLoading: false,
      profileLoading: false,
      errMsg: "",
      profileErrMsg: "",
      getErrMsg: "",
    },
    serviceUsers: {
      data: "",
      getData: "",
      profileData: "",
      loading: false,
      getLoading: false,
      profileLoading: false,
      errMsg: "",
      getErrMsg: "",
      profileErrMsg: "",
    },
    artisans: {
      data: "",
      getData: "",
      profileData: "",
      loading: false,
      getLoading: false,
      profileLoading: false,
      profileErrMsg: "",
      errMsg: "",
      getErrMsg: "",
    },
  });

  const [serviceState, setServiceState] = useState({
    data: "",
    serviceidData: "",
    loading: false,
    IdLoading: false,
    errMsg: "",
    idErrMsg: "",
  });

  const [paymentState, setPaymentState] = useState({
    data: "",
    paymentidData: "",
    loading: false,
    IdLoading: false,
    errMsg: "",
    idErrMsg: "",
  });

  const [bookingState, setBookingState] = useState({
    data: "",
    bookingidData: "",
    loading: false,
    IdLoading: false,
    errMsg: "",
    idErrMsg: "",
  });

  const [categoryState, setCategoryState] = useState({
    data: "",
    categoryidData: "",
    loading: false,
    IdLoading: false,
    errMsg: "",
    idErrMsg: "",
  });

  const updateUserState = (section, updates) => {
    setUserState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
  };

  const updateOverviewState = (updates) => {
    setOverviewState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateServiceState = (updates) => {
    setServiceState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updatePaymentState = (updates) => {
    setPaymentState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateBookingState = (updates) => {
    setBookingState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateCategoryState = (updates) => {
    setCategoryState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const sectionMapping = {
    "service-user": "serviceUsers",
    "artisan-user": "artisans",
    "artisan-payment": "payment",
    "artisan-service": "artisans",
    default: "users",
  };

  const handleUserStatus = (verb, userType, id) => {
    const section = sectionMapping[userType] || sectionMapping.default;
    handleRequest({
      url: `/admin-app/${userType}/${id}/${verb}/`,
      setLoading: (loading) => updateUserState(section, { loading }),
      setError: (errMsg) => updateUserState(section, { errMsg }),
      setResponse: (responseData) =>
        updateUserState(section, { data: responseData }),
    });
  };

  const handleGetUsers = (userType, page) => {
    const section = sectionMapping[userType] || sectionMapping.default;
    handleRequest({
      url: `/admin-app/${userType}/?page=${page || 1}`,
      method: "get",
      setLoading: (getLoading) => updateUserState(section, { getLoading }),
      setError: (getErrMsg) => updateUserState(section, { getErrMsg }),
      setResponse: (responseData) =>
        updateUserState(section, { getData: responseData }),
    });
  };
  const handleGetOverview = () => {
    const year = overviewState?.year;
    console.log(year, "year");
    handleRequest({
      url: `/admin-app/dashboard/overview/?year=${year}`,
      method: "get",
      setLoading: (getLoading) => updateOverviewState({ getLoading }),
      setError: (getErrMsg) => updateOverviewState({ getErrMsg }),
      setResponse: (responseData) =>
        updateOverviewState({ getData: responseData }),
    });
  };

  const handleGetUserProfile = (userType, id) => {
    const section = sectionMapping[userType] || sectionMapping.default;
    handleRequest({
      url: `/admin-app/${userType}/${id}`,
      method: "get",
      setLoading: (profileLoading) =>
        updateUserState(section, { profileLoading }),
      setError: (profileErrMsg) => updateUserState(section, { profileErrMsg }),
      setResponse: (responseData) =>
        updateUserState(section, { profileData: responseData }),
    });
  };

  const handleGetService = (artisanId) => {
    handleRequest({
      url: `/admin-app/artisan-service/?artisan_id=${artisanId}`,
      method: "get",
      setLoading: (loading) => updateServiceState({ loading }),
      setError: (errMsg) => updateServiceState({ errMsg }),
      setResponse: (responseData) => updateServiceState({ data: responseData }),
    });
  };

  const handleGetPayment = (page, serviceId) => {
    handleRequest({
      url: `/admin-app/artisan-payment/?page=${page}&service_id=${serviceId}`,
      method: "get",
      setLoading: (loading) => updatePaymentState({ loading }),
      setError: (errMsg) => updatePaymentState({ errMsg }),
      setResponse: (responseData) => updatePaymentState({ data: responseData }),
    });
  };
  const handleGetBooking = (page) => {
    handleRequest({
      url: `/admin-app/bookings/?page=${page}`,
      method: "get",
      setLoading: (loading) => updateBookingState({ loading }),
      setError: (errMsg) => updateBookingState({ errMsg }),
      setResponse: (responseData) => updateBookingState({ data: responseData }),
    });
  };

  const handleBookingById = (bookingId) => {
    handleRequest({
      url: `/admin-app/bookings/${bookingId}`,
      method: "get",
      setLoading: (idLoading) => updateBookingState({ idLoading }),
      setError: (idErrMsg) => updateBookingState({ idErrMsg }),
      setResponse: (responseData) =>
        updateBookingState({ bookingidData: responseData }),
    });
  };

  const handlePaymentById = (paymentId) => {
    handleRequest({
      url: `/admin-app/artisan-payment/${paymentId}`,
      method: "get",
      setLoading: (idLoading) => updatePaymentState({ idLoading }),
      setError: (idErrMsg) => updatePaymentState({ idErrMsg }),
      setResponse: (responseData) =>
        updatePaymentState({ paymentidData: responseData }),
    });
  };

  const handleGetCategories = () => {
    handleRequest({
      url: `/admin-app/service-categories/`,
      method: "get",
      setLoading: (loading) => updateCategoryState({ loading }),
      setError: (errMsg) => updateCategoryState({ errMsg }),
      setResponse: (responseData) =>
        updateCategoryState({ data: responseData }),
    });
  };

  const handleCategoryById = (categoryId) => {
    handleRequest({
      url: `/admin-app/service-categories/${categoryId}/`,
      method: "get",
      setLoading: (idloading) => updateCategoryState({ idloading }),
      setError: (idErrMsg) => updateCategoryState({ idErrMsg }),
      setResponse: (responseData) =>
        updateCategoryState({ categoryidData: responseData }),
    });
  };

  return (
    <UserContext.Provider
      value={{
        userState,
        handleGetUsers,
        handleUserStatus,
        handleGetOverview,
        overviewState,
        setOverviewState,
        handleGetUserProfile,
        serviceState,
        handleGetService,
        handleGetPayment,
        paymentState,
        handlePaymentById,
        handleGetCategories,
        categoryState,
        handleGetBooking,
        bookingState,
        handleBookingById,
        handleCategoryById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUserContext = () => useContext(UserContext);
