import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();
  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.token;
          console.log();
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email: ${formData.email} is not found.`,
      });
    }
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
      <p>{errors?.root?.random?.message}</p>
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
