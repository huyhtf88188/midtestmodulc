import { useEffect, useState } from "react";
import instance from "../axios/axios";

const HomePage = () => {
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
  return (
    <>
      <div className="container">
        <div className="row">
          {products &&
            products.map((item) => {
              return (
                <>
                  <div key={item.id} className="col-lg-4 col-md-6">
                    <img src={item.thumbnail} alt="" />
                    <h1>{item.title}</h1>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <p>{item.stock}</p>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
