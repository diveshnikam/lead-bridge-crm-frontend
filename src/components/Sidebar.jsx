import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="px-3 px-md-4">
        <div className="bg-white" style={{ width: "auto", height: "auto" }}>
          <ul className="list-unstyled p-4 text-center text-md-start">
            <li className="p-2 mb-5">
              <Link
                to="/leads"
                className="text-decoration-none text-dark fw-bold sidebar-hover d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <i className="bi bi-person-lines-fill me-2 fs-3"></i>
                Leads
              </Link>
            </li>
            <li className="p-2 mt-5">
              <Link
                to="/agents"
                className="text-decoration-none text-dark fw-bold sidebar-hover d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <i className="bi bi-person-badge-fill me-2 fs-3"></i>
                Agents
              </Link>
            </li>
            <li className="p-2 mt-5">
              <Link
                to="/reports"
                className="text-decoration-none text-dark fw-bold sidebar-hover d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <i className="bi bi-bar-chart-fill me-2 fs-3"></i>
                Reports
              </Link>
            </li>
            <li className="p-2 mt-5">
              <Link
                to="/settings"
                className="text-decoration-none text-dark fw-bold sidebar-hover d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <i className="bi bi-gear-fill me-2 fs-3"></i>
                Settings
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
