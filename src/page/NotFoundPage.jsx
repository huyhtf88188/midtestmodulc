import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>404</h1>
      <h2>Not Found Page</h2>
      <Link to="/">Go Back Home Page</Link>
    </>
  );
};

export default NotFoundPage;
