import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SpinnerWhite } from "../../components/common/Spinner";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ForgotFormInputs {
  email: string;
}

export const ForgotPasswordPage = () => {
  //const baseURL = secrets.baseURL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [isMailSent, setIsMailSent] = useState(true);

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotFormInputs>();

  //CALL API TO SEND EMAIL FOR PASSWORD FORGET
  //   useEffect(() => {
  //     if (email) {
  //       setIsLoadingForgot(true);
  //       axios
  //         .get(
  //           `${baseURL}/resend?email=${email}&method=PASSWORD`,
  //           {}
  //         )
  //         .then(function (response) {
  //           if (response?.data?.code === "000000") {
  //             setIsLoadingForgot(false);
  //             reset();
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log("err", error);
  //         });
  //     }
  //   }, [email]);

  const onSubmitHandler: SubmitHandler<ForgotFormInputs> = (data) => {
    setEmail(data.email);
    setIsLoadingForgot(false);
    navigate("/password/reset");
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff] ">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
          <div>
            <label htmlFor="email" className="input_label">
              Email address
            </label>
            <div >
              <input
                placeholder="Enter your Email"
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
          </div>
          <div>
            <button type="submit" className="submit_btn">
              {isLoadingForgot ? <SpinnerWhite /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
