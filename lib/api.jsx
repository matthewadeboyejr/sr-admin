import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleRequest = async ({
  url,
  data = null,
  setLoading,
  method = "post",
  setError,
  setResponse,
}) => {
  let toastId;

  try {
    toastId = toast.loading("loading");
    setLoading?.(true);
    const response = await axiosInstance({
      url,
      method,
      ...(data && { data }),
    });

    if (response.status === 200) {
      toast.success(response?.data?.message || "Completed");
      setResponse?.(response.data);
    } else {
      const errorMessage = response?.data?.message || "Unexpected response.";
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";

    setError?.(errorMessage);
    toast.error(errorMessage);
  } finally {
    if (toastId) {
      toast.dismiss(toastId);
    }
    setLoading(false);
  }
};

export { baseUrl, axiosInstance, handleRequest };
