import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
//import axios from "axios";
import { SpinnerWhite } from "../../components/common/Spinner";

interface ResetFormInputs {
  email: string;
  password: string;
}

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  //const { email, token } = useParams();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetFormInputs>();

  //CALL API TO SEND EMAIL FOR PASSWORD FORGET
  //    useEffect(() => {
  //     if (email) {
  //       setIsLoading(true);
  //       axios
  //         .get("URL"
  //         )
  //         .then(function (response) {
  //           if (response?.data?.code === "000") {
  //             setIsLoading(false);
  //             reset();
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log("err", error);
  //         });
  //     }
  //   }, [email]);

  const onSubmitHandler: SubmitHandler<ResetFormInputs> = (data) => {
    setPassword(data.password);
    setIsLoading(false);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff]">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
          <div className="relative">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="input_label">
                Password
              </label>
            </div>
            <div>
              <input
                placeholder="Enter New Password"
                type={show ? "text" : "password"}
                className={`in_put peer ${errors.password && "input_error"}`}
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#\$%\^\&*\)\(+=._-\d]{6,}$/,
                    message:
                      "Your password should contain at least a number and a letter and minimum of 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.password.message}
                </p>
              )}
              <span onClick={() => setShow(!show)}>
                {show ? (
                  <span className="absolute cursor-pointer right-[14px] top-[41px] ">
                    <Eye />
                  </span>
                ) : (
                  <span className="absolute cursor-pointer right-[14px] top-[41px] ">
                    <EyeOff />
                  </span>
                )}
              </span>
            </div>
          </div>
          <div>
            <button type="submit" className="submit_btn">
              {isLoading ? <SpinnerWhite /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
