"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangePasswordForm = () => {
  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const validationSchema = Yup.object({
    current_password: Yup.string().required("Current password is required"),
    new_password: Yup.string().required("New password is required"),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) {
        alert("You must be logged in to change your password.");
        return;
      }

      const response = await fetch(
        "https://vicsmall-backend.onrender.com/v1/api/auth/password-reset/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: values.current_password,
            newPassword: values.new_password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="current_password" className="mb-2">Current password</label>
            <Field type="password" name="current_password" className="w-full" />
            <ErrorMessage name="current_password" component="div" className="text-red-500" />
          </div>

          <div className="mb-4">
            <label htmlFor="new_password" className="mb-2">New password</label>
            <Field type="password" name="new_password" className="w-full" />
            <ErrorMessage name="new_password" component="div" className="text-red-500" />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm_new_password" className="mb-2">Confirm new password</label>
            <Field type="password" name="confirm_new_password" className="w-full" />
            <ErrorMessage name="confirm_new_password" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="button button-accent ml-auto block w-full px-4 py-2"
          >
            {isSubmitting ? "Changing..." : "Change password"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;