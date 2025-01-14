"use client";

import { useUserContext } from "@/context/UsersContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import CategoryDetails from "../modals/CategoryDetails";
import { useModalControl } from "@/context/ModalControl";
import AddCategory from "../modals/AddCategory";
import { handleRequest } from "@/lib/api";
import UploadCtgImage from "../modals/UploadCtgImage";
import EditCategory from "../modals/EditCategory";
import { storage } from "@/utils/storage";

export default function ServiceCategories() {
  const [deleteState, setDeleteState] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });
  const [removeImgState, setRemoveImgState] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });

  const [statusState, setStatusState] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { handleGetCategories, categoryState } = useUserContext();
  const {
    openCategoryDetails,
    setOpenCategoryDetails,
    setOpenAddCategory,
    openAddCategory,
    setOpenUploadCtgImage,
    openEditCategory,
    setOpenEditCategory,
  } = useModalControl();

  useEffect(() => {
    handleGetCategories();
  }, [
    openAddCategory,
    deleteState,
    statusState,
    removeImgState,
    openEditCategory,
  ]);

  const categories = categoryState?.data || [];

  const toggleDropdown = (categoryId) => {
    setIsDropdownOpen((prev) => (prev === categoryId ? null : categoryId));
  };

  const updateDeleteState = (updates) => {
    setDeleteState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateRemoveImgState = (updates) => {
    setRemoveImgState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateStatusState = (updates) => {
    setStatusState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleDelete = (id) => {
    handleRequest({
      url: `/admin-app/service-categories/${id}/`,
      method: "delete",
      setLoading: (loading) => updateDeleteState({ loading }),
      setError: (errMsg) => updateDeleteState({ errMsg }),
      setResponse: (responseData) => updateDeleteState({ data: responseData }),
    });
  };
  const handleRemoveImage = (id) => {
    handleRequest({
      url: `/admin-app/api/v1/remove-image/${id}`,
      method: "delete",
      setLoading: (loading) => updateRemoveImgState({ loading }),
      setError: (errMsg) => updateRemoveImgState({ errMsg }),
      setResponse: (responseData) =>
        updateRemoveImgState({ data: responseData }),
    });
  };

  const handleCategoryStatus = async (verb, id) => {
    await handleRequest({
      url: `/admin-app/service-categories/${id}/${verb}/`,
      setLoading: (loading) => updateStatusState({ loading }),
      setError: (errMsg) => updateStatusState({ errMsg }),
      setResponse: (responseData) => updateStatusState({ data: responseData }),
    });

    setIsDropdownOpen(null);
  };

  const handleDropdownActions = async (action, id) => {
    //sessionStorage.setItem("categoryId", id);

    storage.set("categoryId", id);

    switch (action) {
      case "view":
        setOpenCategoryDetails(true);
        break;
      case "edit":
        setOpenEditCategory(true);
        break;
      case "upload":
        setOpenUploadCtgImage(true);
        break;
      case "remove":
        await handleRemoveImage(id);
        break;
      case "delete":
        await handleDelete(id);
        break;
      default:
        break;
    }

    setIsDropdownOpen(null);
  };

  const DropdownMenu = ({ toggleDropdown, id, status }) => {
    const action = () => (status ? "deactivate" : "activate");
    return (
      <div className="absolute right-0  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="text-xs">
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button
              className="w-full text-left"
              onClick={() => {
                handleDropdownActions("view", id);
              }}
            >
              View Details
            </button>
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button
              className="w-full text-left"
              onClick={() => {
                handleDropdownActions("edit", id);
              }}
            >
              Edit Category
            </button>
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button
              className="w-full text-left"
              onClick={() => {
                handleDropdownActions("upload", id);
              }}
            >
              Upload Image
            </button>
          </li>
          <li className="hover:bg-secondary/20 p-2 rounded-md cursor-pointer">
            <button
              className="w-full text-left"
              onClick={() => {
                handleDropdownActions("remove", id);
              }}
            >
              Remove Image
            </button>
          </li>
          <li
            onClick={() => {
              handleCategoryStatus(action(), id);
            }}
            className={`${
              status ? "text-yellow-600" : "text-green-600"
            } " hover:bg-secondary/20 p-2 rounded-md cursor-pointer"`}
          >
            {status ? "Deactivate" : "Activate"}
          </li>
          <li
            onClick={() => {
              handleDropdownActions("delete", id);
            }}
            className="hover:bg-secondary/20 text-red-600 bg-red-200 p-2 rounded-md cursor-pointer"
          >
            Delete
          </li>
        </ul>
        <span
          className="pt-2 cursor-pointer hover:opacity-70 text-lg flex justify-center"
          onClick={toggleDropdown}
        >
          <IoMdClose />
        </span>
      </div>
    );
  };

  const TableHeader = () => {
    return (
      <tr>
        <th scope="col" className="py-3 px-6 ">
          Category
        </th>
        <th scope="col" className="py-3 px-6 ">
          Status
        </th>
        <th scope="col" className=" py-3 pr-4 ">
          Action
        </th>
      </tr>
    );
  };

  const TableRow = ({ category, toggleDropdown, isDropdownOpen }) => {
    const serviceCategory = category?.category;
    const status = category?.is_active;
    const imagePlaceHolder = "https://picsum.photos/200";
    const image = category?.image;
    const categoryId = category?.id;
    return (
      <tr>
        <td className="px-6 py-4 flex items-center gap-2">
          <Image
            src={image ? image : imagePlaceHolder}
            width={25}
            height={25}
            alt="category image"
            priority
            unoptimized
            className="w-12 h-12 object-cover rounded-full  "
          />

          {serviceCategory || "N/A"}
        </td>
        <td className="px-6 py-4">
          <p
            className={`${
              status ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
            }   py-1 px-2 rounded-md w-fit`}
          >
            {status ? "Active" : "Deactivated"}
          </p>
        </td>
        <td>
          <div className="relative">
            <button
              onClick={() => toggleDropdown(categoryId)}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <CiCircleMore />
            </button>
            {isDropdownOpen === categoryId && (
              <DropdownMenu
                id={categoryId}
                status={status}
                toggleDropdown={() => toggleDropdown(null)}
              />
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <section className="gap-5 ">
      <div className="border  p-3 rounded-md shadow-sm space-y-5 ">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="font-medium">Categories </h2>
            <button
              className=" text-secondary  text-xs hover:opacity-80"
              onClick={() => {
                setOpenAddCategory(true);
              }}
            >
              Add New
            </button>
          </div>

          {/* <div className="border p-2 flex items-center gap-4 rounded-3xl cursor-pointer">
            <span className="w-3 h-3 rounded-full opacity-30">
              <IoFilterOutline />
            </span>
            <span className="text-xs">Filter</span>
          </div> */}
        </div>
        <div className=" overflow-y-auto space-y-4 relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="bg-primary/10  rounded-md space  whitespace-nowrap">
              <TableHeader />
            </thead>
            <tbody className="whitespace-nowrap">
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  category={category}
                  isDropdownOpen={isDropdownOpen}
                  toggleDropdown={toggleDropdown}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openCategoryDetails && <CategoryDetails />}
      {openEditCategory && <EditCategory />}
      <AddCategory />
      <UploadCtgImage />
    </section>
  );
}
