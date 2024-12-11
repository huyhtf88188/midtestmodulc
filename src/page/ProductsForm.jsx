import { useForm } from "react-hook-form";
import { productSchema } from "../schema/ProductSchema";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axios/axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductsForm = () => {
  let nav = useNavigate();
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const productId = await instance.get(`/products/${id}`);
          reset(productId.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      if (id) {
        const newUpdate = await instance.patch(`/products/${id}`, data);
        setProducts(newUpdate.data);
        nav("/products");
      } else {
        const addConfirm = confirm(
          "đăng ký thành công. chuyển đến trang sản phẩm?"
        );
        if (addConfirm) {
          const newProducts = await instance.post("/products", data);
          setProducts(newProducts);
          nav("/products");
        } else {
          reset();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <h1>{id ? "Update" : "Add"} Products</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text text-danger"> {errors.title.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text text-danger"> {errors.price.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text text-danger"> {errors.description.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="form-control"
              {...register("stock", { required: true, valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text text-danger"> {errors.stock.message}</p>
            )}
          </div>
          <div className="mb-3">
            <button className="btn btn-primary">{id ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductsForm;
