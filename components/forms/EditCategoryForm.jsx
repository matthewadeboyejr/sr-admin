"use client";

import { useEffect, useRef, useState } from "react";
import { handleRequest } from "@/lib/api";
import { useModalControl } from "@/context/ModalControl";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUserContext } from "@/context/UsersContext";
import toast from "react-hot-toast";

const EditCategoryForm = () => {
  const categoryId = sessionStorage.getItem("categoryId");
  const { openEditCategory, setOpenEditCategory } = useModalControl();
  const { handleCategoryById, categoryState } = useUserContext();

  const [putcategory, setPutCategory] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });

  const errRef = useRef();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  useEffect(() => {
    if (openEditCategory && categoryId) {
      handleCategoryById(categoryId);
    }
  }, [openEditCategory, categoryId]);
  const categoryDetail = categoryState?.categoryidData || {};
  const currentCategory = categoryDetail?.category;
  const [category, setCategory] = useState(currentCategory);

  const isLoading = putcategory?.loading;
  const errMsg = putcategory?.errMsg;

  const updatePutCategory = (updates) => {
    setPutCategory((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleEditBooking = async (e) => {
    e.preventDefault();

    if (!category) {
      return toast.error("Field is empty");
    }

    const capitalizeFirstLetter = category
      ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      : "";

    await handleRequest({
      url: `/admin-app/service-categories/${categoryId}/`,
      method: "put",
      data: { category: capitalizeFirstLetter },
      setLoading: (loading) => updatePutCategory({ loading }),
      setError: (errMsg) => updatePutCategory({ errMsg }),
      setResponse: (responseData) => updatePutCategory({ data: responseData }),
    });

    setOpenEditCategory(false);
  };

  return (
    <>
      <form
        className="w-full  space-y-6"
        aria-label="Update Category Form"
        onSubmit={handleEditBooking}
      >
        {/*  <div className="pt-5">
          <p className="text-xs">Fill only the neccessary field </p>
        </div> */}

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

        {/*  appointment_date */}
        <div className="space-y-2 w-full">
          <label className="text-xs " htmlFor="category">
            Category
          </label>
          <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
            <input
              className="bg-transparent w-full outline-none placeholder:text-xs"
              id="category"
              placeholder={currentCategory}
              type="text"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              ref={inputRef}
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
              "Update Category"
            )}
          </div>
        </button>
      </form>
    </>
  );
};
export default EditCategoryForm;
