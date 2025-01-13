"use client";

import { useEffect, useRef, useState } from "react";
import { handleRequest } from "@/lib/api";
import { useModalControl } from "@/context/ModalControl";
import { CgSpinnerTwo } from "react-icons/cg";

const AddCategoryForm = () => {
  const { setOpenAddCategory } = useModalControl();

  const [postCategory, setPostCategory] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });

  const [categoryData, setCategoryData] = useState({
    category: "",
    is_active: true,
  });

  const errRef = useRef();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const isLoading = postCategory?.loading;
  const errMsg = postCategory?.errMsg;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const updatePostCategory = (updates) => {
    setPostCategory((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const category = categoryData?.category;
    const capitalizeFirstLetter = category
      ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      : "";

    await handleRequest({
      url: `/admin-app/service-categories/`,
      data: {
        category: capitalizeFirstLetter,
        is_active: categoryData?.is_active,
      },
      setLoading: (loading) => updatePostCategory({ loading }),
      setError: (errMsg) => updatePostCategory({ errMsg }),
      setResponse: (responseData) => updatePostCategory({ data: responseData }),
    });

    setOpenAddCategory(false);
  };

  return (
    <>
      <form
        className="w-full  space-y-6"
        aria-label="Add service categories Form"
        onSubmit={handleAddCategory}
      >
        {/* <div className="pt-5">
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

        {/*  category */}
        <div className="space-y-2 w-full">
          <label className="text-xs " htmlFor="category">
            Category
          </label>
          <div className="flex border border-secondary/20 justify-between p-3 items-center pr-5 rounded-md ">
            <input
              className="bg-transparent w-full outline-none placeholder:text-xs"
              id="category"
              placeholder="e.g plumber"
              type="text"
              name="category"
              value={categoryData?.category}
              onChange={handleChange}
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
              "Add Category"
            )}
          </div>
        </button>
      </form>
    </>
  );
};
export default AddCategoryForm;
