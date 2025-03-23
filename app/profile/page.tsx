"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ChangePasswordForm from "../components/profile-page/change-password-form"; // Import ChangePasswordForm

const Profile = () => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [profileDetails, setProfileDetails] = useState({
    id: "",
    email: "",
    full_name: "",
    phone_number: "",
    about_me: "",
    store_name: "",
    is_vendor: false,
  });

  useEffect(() => {
    const loadingProfile = toast.loading("Loading user profile...");

    axios
      .get("https://vicsmall-backend-ckn4.onrender.com/v1/api/auth/vendor-profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingProfile);
        if (res.status === 200) {
          setProfileDetails(res.data.Data);
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(loadingProfile));
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
const shop_name = localStorage.getItem("shopName")
const aboutme = localStorage.getItem("aboutMe")
  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingUpdate = toast.loading("Updating profile...");

    axios
      .patch(
        "https://vicsmall-backend-ckn4.onrender.com/v1/api/auth/vendor-profile",
        {
          full_name: profileDetails.full_name,
          phone_number: profileDetails.phone_number,
          about_me: profileDetails.about_me,
          store_name: profileDetails.store_name,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingUpdate);
        if (res.status === 200) {
          setProfileDetails(res.data.Data);
          toast.success("Profile updated successfully");
          // Save updated store_name to local storage
          localStorage.setItem("shopName", res.data.Data.store_name);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(loadingUpdate));
  };

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Profile
      </h1>

      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="w-full flex-[2] rounded-xl bg-white p-4 text-sm shadow-sm">
          <p className="mb-4 text-base font-medium">Profile</p>

          <div className="mb-4 flex items-center gap-2">
            <Image
              src="https://utfs.io/f/wLDjZbdcJHpRMWIl9NP3i48NTabVkLgSlduGEY15BDA9eZjR"
              alt="John Doe"
              height={48}
              width={48}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <span className="text-xs sm:block">
                {profileDetails?.full_name}
              </span>
              <p className="text-xs text-gray-400">Vendor</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>STORE NAME</span>
            <span className="text-right">{shop_name}</span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>PHONE NUMBER</span>
            <span className="text-xs sm:block">
              {profileDetails?.phone_number}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>ABOUT ME</span>
            <span className="text-xs sm:block">
              {profileDetails?.about_me}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <span>EMAIL ADDRESS</span>
            <span className="text-right text-xs sm:block">
              {profileDetails?.email}
            </span>
          </div>
        </div>

        <div className="w-full flex-[3] rounded-xl bg-white p-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={profileDetails.full_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={profileDetails.phone_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                About Me
              </label>
              <textarea
                name="about_me"
                value={aboutme}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                name="store_name"
                value={shop_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </form>

          <p className="mb-4 mt-8 font-medium">Change password</p>
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default Profile;