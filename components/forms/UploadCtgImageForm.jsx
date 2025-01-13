"use client";

import { useEffect, useRef, useState } from "react";
import { handleRequest } from "@/lib/api";
import { useModalControl } from "@/context/ModalControl";
import { CgSpinnerTwo } from "react-icons/cg";
import toast from "react-hot-toast";

const UploadCtgImageForm = () => {
  const { setOpenUploadCtgImage } = useModalControl();

  const [postImage, setPostImage] = useState({
    data: "",
    loading: false,
    errMsg: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("https://picsum.photos/200");

  const errRef = useRef();
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const isLoading = postImage?.loading;
  const errMsg = postImage?.errMsg;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("Image is too large. Limit is 5MB");
        fileInputRef.current.value = null;
        return;
      }
      setImage(e.target.files[0]);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const updatePostImage = (updates) => {
    setPostImage((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const categoryId = sessionStorage.getItem("categoryId");
    console.log("image", image);
    await handleRequest({
      url: `/admin-app/api/v1/upload-category/?category_id=${categoryId}`,
      data: image,
      setLoading: (loading) => updatePostImage({ loading }),
      setError: (errMsg) => updatePostImage({ errMsg }),
      setResponse: (responseData) => updatePostImage({ data: responseData }),
    });

    setOpenUploadCtgImage(false);
  };

  return (
    <>
      <form
        className="w-full  space-y-6"
        aria-label="Upload Image category Form"
        onSubmit={handleUploadImage}
      >
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

        {/* Upload  Images */}
        <div className="space-y-2 w-full flex justify-center ">
          <div
            className="relative rounded-full w-40 h-40 group cursor-pointer flex"
            onClick={handleClick}
          >
            <img
              src={imagePreview}
              alt="Image preview"
              className="rounded-full object-cover w-full h-full border"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-sm">Change Image</p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
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
              "Upload Image"
            )}
          </div>
        </button>
      </form>
    </>
  );
};
export default UploadCtgImageForm;
