import BackButton from "@/components/Buttons/BackButton";
import {InputOTPControlled} from "@/components/Forms/OtpComponent";
import SignInForm from "@/components/Forms/SignInForm";
import {setUser} from "@/redux/Slices/AuthSlice";
import instance from "@/utils/axios";
import useToastNotification from "@/hooks/SonnerToast";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToastNotification();

  const handleFormSubmit = async (values) => {
    setEmail(values.email);
    setLoading(true);
    try {
      const response = await instance.post("/accounts/sign-in/", {
        email: values.email,
      });
      showToast(response.data.message || "otp sent succuss", "success");
      setIsOTPsent(true);
    } catch (error) {
      console.error("OTP sent failed", error);
      showToast("error sending otp", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndLogin = async () => {
    try {
      setLoading(true);
      const response = await instance.post("/accounts/verify-otp/", {
        email: email,
        otp: otp,
      });
      const {access, user} = response.data;
      dispatch(
        setUser({
          isAuthenticated: true,
          isActive: user.is_active || "",
          email: user.email || "",
          username: user.username || "",
          accessToken: access || "",
          role: user.role || "",
        })
      );
      showToast("User Logined Succussfully", "success");
    } catch (error) {
      showToast(error.response?.data?.error, "error");
      if (error) {
        setIsError(
          error.response?.data?.error ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-md shadow-md border-gray-100 overflow-y-auto">
      <BackButton handleBackClick={handleBackClick} />
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isOTPsent ? "Verify OTP " : "Sign In"}
      </h1>
      {!isOTPsent ? (
        <SignInForm onSubmit={handleFormSubmit} isLoading={loading} />
      ) : (
        <InputOTPControlled
          email={email}
          verifyAndLogin={verifyAndLogin}
          setOtp={setOtp}
          isLoading={loading}
          setIsError={setIsError}
          isError={isError}
        />
      )}
    </div>
  );
};

export default SignIn;
