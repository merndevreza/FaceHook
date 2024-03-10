import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../common/Field";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const password = watch("password", "");

  const submitForm = async (formData) => {
    const { confirmPassword, ...data } = formData;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        data
      );
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${formData.email}.`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="First Name" htmlFor="firstName" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First name is required" })}
          className={`auth-input ${!!errors.firstName && "border-red-500"}`}
          type="text"
          id="firstName"
          name="firstName"
        />
      </Field>
      <Field label="Last Name" htmlFor="lastName" error={errors.lastName}>
        <input
          {...register("lastName")}
          className={`auth-input ${!!errors.lastName && "border-red-500"}`}
          type="text"
          id="lastName"
          name="lastName"
        />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          className={`auth-input ${!!errors.email && "border-red-500"}`}
          type="email"
          id="email"
          name="email"
        />
      </Field>
      <Field label="Password" htmlFor="password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`auth-input ${!!errors.password && "border-red-500"}`}
          type="password"
          id="password"
          name="password"
        />
      </Field>
      <Field
        label="Retype Password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword}
      >
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className={`auth-input ${
            !!errors.confirmPassword && "border-red-500"
          }`}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
      </Field>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
