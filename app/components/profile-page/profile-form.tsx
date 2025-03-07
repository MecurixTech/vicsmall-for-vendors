"use client";

import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";

type ProfileData = {
  full_name: string;
  email: string;
  phone_number: string;
  about_me: string;
};

const ProfileForm = () => {
  const [initialValues, setInitialValues] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    about_me: "",
  });

  useEffect(() => {
    setInitialValues({
      full_name: localStorage.getItem("fullName") || "",
      email: localStorage.getItem("email") || "",
      phone_number: localStorage.getItem("phoneNumber") || "",
      about_me:
        localStorage.getItem("aboutMe") ||
        "This is some information about John Doe",
    });
  }, []);

  const handleSubmit = (values: ProfileData) => {
    console.log(values);
    localStorage.setItem("fullName", values.full_name);
    localStorage.setItem("email", values.email);
    localStorage.setItem("phoneNumber", values.phone_number);
    localStorage.setItem("aboutMe", values.about_me);
    //alert("Profile updated successfully!");
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
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <Field type="text" name="email" className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="phone_number" className="mb-2">
            Phone number
          </label>
          <Field type="text" name="phone_number" className="w-full" />
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
