import Image from "next/image";
import ProfileForm from "../components/profile-page/profile-form";
import ChangePasswordForm from "../components/profile-page/change-password-form";

const Profile = () => {
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
              <p>John Doe</p>
              <p className="text-xs text-gray-400">Vendor</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>COUNTRY</span>
            <span className="text-right">Canada</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>LOCATION</span>
            <span className="text-right">19th dema street, Canada</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span>PHONE NUMBER</span>
            <span className="text-right">+231 456 444 566</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-3">
            <span>EMAIL ADDRESS</span>
            <span className="text-right">doe@gmail.com</span>
          </div>
        </div>

        <div className="w-full flex-[3] rounded-xl bg-white p-4 shadow-sm">
          <p className="mb-4 font-medium">Edit profile</p>
          <ProfileForm />

          <p className="mb-4 mt-8 font-medium">Change password</p>
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
