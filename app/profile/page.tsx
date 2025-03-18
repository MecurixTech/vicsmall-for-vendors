"use client";
import Image from "next/image";
import ProfileForm from "../components/profile-page/profile-form";
import ChangePasswordForm from "../components/profile-page/change-password-form";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Profile as ProfileType } from "../data/dummyTypes";

const Profile = () => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [profileDetails, setProfileDetails] = useState<ProfileType>();

  useEffect(() => {
    const loadingProfile = toast.loading("Loading user profile...");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/vendor-profile`, {
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
            <span className="text-right">{profileDetails?.store_name}</span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>PHONE NUMBER</span>
            <span className="text-xs sm:block">
              {profileDetails?.phone_number}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>ABOUT ME</span>
            <span className="text-xs sm:block">{profileDetails?.about_me}</span>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <span>EMAIL ADDRESS</span>
            <span className="text-right text-xs sm:block">
              {profileDetails?.email}
            </span>
          </div>
        </div>

        <div className="w-full flex-[3] rounded-xl bg-white p-4 shadow-sm">
          {profileDetails && (
            <>
              <p className="mb-4 font-medium">Edit profile</p>
              <ProfileForm profileDetails={profileDetails} />
            </>
          )}

          <p className="mb-4 mt-8 font-medium">Change password</p>
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
