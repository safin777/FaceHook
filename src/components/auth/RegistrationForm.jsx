import { useForm } from "react-hook-form";
import Field from "../common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async (formdata) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formdata
      );
      if (response.status === 201) {
        // 201 is the status code for created resource
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong. Please try again later`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          className={`auth-input ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          type="firstName"
          name="firstName"
          id="firstName"
          {...register("firstName", { required: " First Name is required" })}
        />
      </Field>

      <Field label="Last Name" error={errors.lastName}>
        <input
          className={`auth-input ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          type="lastName"
          name="lastName"
          id="lastName"
          {...register("lastName")}
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
          {...register("email", { required: "Email ID is required" })}
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
        />
      </Field>

      <p>{errors?.root?.random?.message}</p>

      <Field>
        <button
          className="font-bold transition-all auth-input bg-lwsGreen text-deepDark hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </Field>
    </form>
  );
};

export default RegistrationForm;
