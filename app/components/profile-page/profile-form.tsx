"use client";

import { Formik, Form, Field } from "formik";

const ProfileForm = () => {
  const initialValues = {
    full_name: "John Doe",
    email: "doe@gmail.com",
    phone_number: "+234 901 773 9920",
    about_me: "This is some information about John Doe",
  };

  const handleSubmit = (values: {
    full_name: string;
    email: string;
    phone_number: string;
    about_me: string;
  }) => {
    console.log(values);
    // Handle form submit here
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
