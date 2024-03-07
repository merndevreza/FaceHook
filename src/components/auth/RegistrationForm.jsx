import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../common/Field";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const submitForm = (formData) => {
    console.log(formData);
    navigate("/login");
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="Name" htmlFor="name" error={errors.name}>
        <input
          {...register("name", { required: "name is required" })}
          className={`auth-input ${!!errors.name && "border-red-500"}`}
          type="name"
          id="name"
          name="name"
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
            required: "password is required",
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
      <Field label="Retype Password" htmlFor="password" error={errors.password}>
        <input
          {...register("confirmPassword", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`auth-input ${!!errors.password && "border-red-500"}`}
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
