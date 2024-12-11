import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schema/authSchema";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axios/axios";

const RegisterPage = () => {
  let nav = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    const registerConfirm = confirm(
      "đăng ký thành công, chuyển đến trang đăng nhập"
    );
    if (registerConfirm) {
      await instance.post("/register", data);
      nav("/login");
    } else {
      reset();
    }
  };
  return (
    <>
      <div className="container">
        <h1>Register Form</h1>
        <form action="" onSubmit={handleSubmit(handleRegister)}>
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
            <Link to="/login">Bạn đã có tài khoản?</Link>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
