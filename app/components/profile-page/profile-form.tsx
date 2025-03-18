"use client";

import { Profile } from "@/app/data/dummyTypes";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

type FormData = {
  full_name: string;
  phone_number: string;
  about_me: string;
  store_name: string;
};

const ProfileForm = ({ profileDetails }: { profileDetails: Profile }) => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const initialValues = {
    full_name: profileDetails.full_name,
    phone_number: profileDetails.phone_number,
    about_me: profileDetails.about_me,
    store_name: profileDetails.store_name,
  };

  const handleSubmit = (values: FormData) => {
    const editingProfile = toast.loading("Updating your profile...");
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/vendor-profile`,
        values,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(editingProfile);
        if (res.status === 200) {
          toast.success(res.data.Message);
          window.location.reload();
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(editingProfile));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-4">
          <label htmlFor="full_name" className="mb-2">
            Full name
          </label>
          <Field type="text" name="full_name" className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="phone_number" className="mb-2">
            Phone number
          </label>
          <Field type="text" name="phone_number" className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="store_name" className="mb-2">
            Store name
          </label>
          <Field type="text" name="store_name" className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="about_me" className="mb-2">
            About me
          </label>
          <Field type="text" name="about_me" className="w-full" />
        </div>

        <button
          type="submit"
          className="button button-accent ml-auto block w-full px-4 py-2"
        >
          Update profile
        </button>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
