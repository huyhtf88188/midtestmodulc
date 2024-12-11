import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/authSchema";
import instance from "../axios/axios";

const LoginPage = () => {
  let nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    const user = await instance.post("/login", data);
    localStorage.setItem("accessToken", user.data.accessToken);
    localStorage.setItem("users", JSON.stringify(user.data.user));
    console.log(user);
    if (user.data.user.role === "admin") {
      nav("/products");
    } else {
      nav("/homepage");
    }
  };
  return (
    <>
      <div className="container">
        <h1>Login Form</h1>
        <form action="" onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text text-danger"> {errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text text-danger"> {errors.password.message}</p>
            )}
          </div>
          <div className="mb-3">
            <Link to="/register">Bạn chuea có tài khoản?</Link>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
