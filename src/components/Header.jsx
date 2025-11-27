import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      
      <header className="bg-dark p-5 d-flex justify-content-center align-items-center">
        <Link to="/" className="text-decoration-none">
          <h1 className="fw-bold text-white m-0 d-flex align-items-center">
            <i className="bi bi-diagram-3-fill me-3 text-white"></i>
            Lead-Bridge CRM
          </h1>
        </Link>
      </header>
    </>
  );
};

export default Header;
