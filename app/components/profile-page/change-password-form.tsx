"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ChangePasswordForm = () => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  //Just ignore this
  const validationSchema = Yup.object({
    old_password: Yup.string().required("Current password is required"),
    new_password: Yup.string().required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const changingPassword = toast.loading("Changing password...");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/vendor-profile/change-password`,
        values,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(changingPassword);
        if (res.status === 200) {
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(changingPassword));
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
            <label htmlFor="old_password" className="mb-2">
              Current password
            </label>
            <Field type="password" name="old_password" className="w-full" />
            <ErrorMessage
              name="old_password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="new_password" className="mb-2">
              New password
            </label>
            <Field type="password" name="new_password" className="w-full" />
            <ErrorMessage
              name="new_password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm_password" className="mb-2">
              Confirm new password
            </label>
            <Field type="password" name="confirm_password" className="w-full" />
            <ErrorMessage
              name="confirm_password"
              component="div"
              className="text-red-500"
            />
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
