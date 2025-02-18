import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import instance from "@/utils/axios";
import {Button} from "../ui/button";
import useToastNotification from "@/hooks/SonnerToast";

const SignUpForm = ({setUserData, setIsOTPsent}) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastNotification();

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values, {setErrors}) => {
      try {
        setLoading(true);
        const response = await instance.post("accounts/sign-up/", {
          email: values.email,
        });
        showToast(response?.data?.message || "OTP sent", "success");

        setUserData({
          email: values.email,
        });
        setIsOTPsent(true);
      } catch (error) {
        if (error.response?.data?.error) {
          setErrors({email: error.response.data.error});
        } else {
          showToast("Error sending OTP", "error");
        }
        console.error("Error during signup:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className=""
      >
        <div>
          <label
            htmlFor="email"
            className="block font-medium text-gray-700 mt-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <Button type="submit"  className="mt-4">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <a
            href="/auth/sign-in"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Please sign in
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
