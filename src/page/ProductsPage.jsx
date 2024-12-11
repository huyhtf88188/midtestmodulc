import { useEffect, useState } from "react";
import instance from "../axios/axios";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const removeProduct = async (id) => {
    try {
      const confirmDelete = confirm("Are you sure?");
      if (confirmDelete) {
        await instance.delete(`/products/${id}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Products List</h1>

        <Link className="btn btn-primary" to="/products/add">
          Add Product
        </Link>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Category Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.stock}</td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeProduct(item.id);
                        }}
                      >
                        Remove
                      </button>
                      <Link
                        className="btn btn-primary"
                        to={`/products/update/${item.id}`}
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsPage;
