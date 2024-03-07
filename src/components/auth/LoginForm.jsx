import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitForm = (formData) => {
    console.log(formData);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          className={`auth-input ${!!errors.email && "border-red-500"}`}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
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
          placeholder="password"
        />
      </Field>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
