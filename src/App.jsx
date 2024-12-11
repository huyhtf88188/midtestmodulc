import { Route, Routes } from "react-router-dom";
import Dasbroad from "./page/Dasbroad";
import HomePage from "./page/HomePage";
import ProductsPage from "./page/ProductsPage";
import ProductsForm from "./page/ProductsForm";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dasbroad />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/add" element={<ProductsForm />} />
        <Route path="/products/update/:id" element={<ProductsForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
