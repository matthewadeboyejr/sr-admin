import { useModalControl } from "@/context/ModalControl";
import { useUserContext } from "@/context/UsersContext";
import { storage } from "@/utils/storage";
import Image from "next/image";
import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function CategoryDetails() {
  const { openCategoryDetails, setOpenCategoryDetails } = useModalControl();
  const { handleCategoryById, categoryState } = useUserContext();

  //const categoryId = sessionStorage.getItem("categoryId") || null;

  const categoryId = storage.get("categoryId");

  useEffect(() => {
    if (openCategoryDetails && categoryId) {
      handleCategoryById(categoryId);
    }
  }, [openCategoryDetails, categoryId]);

  const categoryDetail = categoryState?.categoryidData || {};
  const category = categoryDetail?.category;
  const imagePlaceHolder = "https://picsum.photos/200";
  const image = categoryDetail?.image;
  const status = categoryDetail?.is_active;

  console.log("categoryDetail", categoryDetail);

  return (
    <>
      {openCategoryDetails && (
        <div
          className={`flex bg-black/30 fixed inset-0 h-screen justify-center md:items-center items-end z-20`}
        />
      )}
      {openCategoryDetails && (
        <div
          className={` flex md:items-center items-end justify-center inset-0 fixed z-50 `}
        >
          <div className="bg-white p-5 md:rounded-md rounded-t-md md:w-1/3 w-full z-50 ">
            <div className="flex items-center justify-between border-b pb-5 ">
              <div className="flex gap-2 items-center">
                <h3 className="text-sm font-medium">Category Details</h3>
                {/* <button className="text-secondary text-sm">Edit</button> */}
              </div>
              <button
                onClick={() => {
                  //sessionStorage.removeItem("categoryId");
                  storage.remove("categoryId");
                  setOpenCategoryDetails(false);
                }}
                className="text-lg cursor-pointer hover:scale-x-125 transition-all  "
              >
                <RiCloseFill />
              </button>
            </div>

            <div className="space-y-4 mt-5 order-b">
              <p className="grid grid-cols-2 ">
                <span className="text-xs">Category Image</span>
                <Image
                  src={image ? image : imagePlaceHolder}
                  width={25}
                  height={25}
                  alt="category image"
                  className="w-25 h-25 rounded-full"
                />
              </p>

              <p className="grid grid-cols-2 ">
                <span className="text-xs">Category</span>
                <span className="text-xs font-medium">{category}</span>
              </p>

              <p className="grid grid-cols-2 ">
                <span className="text-xs">Status </span>
                <span
                  className={`${
                    status
                      ? "text-green-700 bg-green-100"
                      : "bg-red-100 text-red-600"
                  }  py-1 px-2 rounded-md w-fit`}
                >
                  {status ? "Active" : "Non Active"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
