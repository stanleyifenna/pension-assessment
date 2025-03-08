import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface SignUpFormInputs {
  email: string;
  password: string;
  address: string;
  businessName: string;
  phoneNo: Number;
}

const SignUpPage: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  // FORM VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormInputs>();

  // SUBMIT FORM
  const onSubmitHandler: SubmitHandler<SignUpFormInputs> = (data) => {
    setEmail(data.email);
    setPassword(data.password);
  };

  return (
    <>
      <div className=" grid-cols-1 h-screen md:flex grid ">
        <div className="mx-auto  md:mb-20 mb-0 md:mt-[60px] mt-0 rounded-[10px] bg-[#F6F7F9] md:pt-[64px] px-10 md:w-[600px] w-full h-[850px]">
          <div className="md:mt-[0px] mt-10">
            <h3 className="text_24 font-medium text-[#000000]">Hello There,</h3>
            <p className=" pt-4 text-[#6B6968]">Create Your Account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mt-8 relative">
              <label htmlFor="password" className="input_label">
                Full Name
              </label>
              <input
                placeholder="Full Name"
                type="text"
                className={`in_put peer ${
                  errors.businessName && "input_error"
                }`}
                {...register("businessName", {
                  required: "Name is required",
                })}
              />
              {errors.businessName && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.businessName.message}
                </p>
              )}
            </div>

            <div className="mt-8 relative">
              <label htmlFor="email" className="input_label">
                Email
              </label>
              <input
                placeholder="Enter Email"
                type="email"
                className={`in_put peer ${errors.email && "input_error"}`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-8 relative">
              <label htmlFor="text" className="input_label">
                Business Address
              </label>
              <input
                placeholder="Enter Business Address"
                type="text"
                className={`in_put ${errors.address && "input_error"}`}
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mt-8 relative">
              <label htmlFor="text" className="input_label">
                Phone Number
              </label>
              <input
                placeholder="Enter Phone Number"
                type="text"
                className={`in_put peer put ${errors.phoneNo && "input_error"}`}
                {...register("phoneNo", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phoneNo && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.phoneNo.message}
                </p>
              )}
            </div>

            <div className="relative w-full mt-8">
              <label htmlFor="text" className="input_label">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                className={`in_put peer ${errors.password && "input_error"}`}
              />
              {errors.password && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.password.message}
                </p>
              )}
              <span onClick={() => setShow(!show)}>
                {show ? (
                  <span className="absolute cursor-pointer right-[14px] top-[40px] ">
                    <Eye />
                  </span>
                ) : (
                  <span className="absolute cursor-pointer right-[14px] top-[40px] ">
                    <EyeOff />
                  </span>
                )}
              </span>
            </div>

            <div className="pt-8">
              <button type="submit" className="submit_btn">
                SiginUp
              </button>
            </div>
          </form>

          <p className="mt-6 mb-[70px] text-center text-sm ">
            Already have an account with us?{" "}
            <Link to="/login">
              <span className="text_16 text-[#2a3948] hover:text-[#F99762]">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
