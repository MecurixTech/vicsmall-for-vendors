"use client";

import { Formik, Form, Field } from "formik";

const ChangePasswordForm = () => {
  const initialValues = {
    current_password: "",
    new_password: "",
    repeat_new_password: "",
  };

  const handleSubmit = (values: {
    current_password: string;
    new_password: string;
    repeat_new_password: string;
  }) => {
    console.log(values);
    // Handle form submit here
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div className="mb-4">
          <label htmlFor="current_password" className="mb-2">
            Current password
          </label>
          <Field type="text" name="current_password" className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="new_password" className="mb-2">
            New password
          </label>
          <Field type="text" name="new_password" className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm_new_password" className="mb-2">
            Confirm new password
          </label>
          <Field type="text" name="confirm_new_password" className="w-full" />
        </div>

        <button
          type="submit"
          className="button button-accent ml-auto block w-full px-4 py-2"
        >
          Change password
        </button>
      </Form>
    </Formik>
  );
};

export default ChangePasswordForm;
