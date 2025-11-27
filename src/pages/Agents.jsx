import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

const Agents = () => {
  const { loading, error, leadData } = useFetch(
    "https://lead-bridge-crm-backend.vercel.app/agents"
  );

  return (
    <>
      <div className="container-fluid px-3 px-md-5 mt-5">
        <h1 className="fw-bold text-center mt-4 mb-5">
          Sales Agent Management
        </h1>
        <hr />
      </div>

      <div
        className="container-fluid px-3 px-md-5"
        style={{ marginTop: "3rem" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-3 mb-5 text-center text-md-start">
            <Link
              to="/"
              className="btn btn-white border lead-btn mt-2 back-btn-lg"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back To Dashboard
            </Link>
          </div>

          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h2 className="fw-bold mb-4 text-center text-md-start w-100 w-md-auto">
                Sales Agents List
              </h2>

              <Link
                to="/agent/add"
                className="btn btn-white border lead-btn d-flex align-items-center justify-content-center back-btn-agent mt-5 mb-5 "
                style={{
                  padding: "6px 14px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Add New Agent
              </Link>
            </div>

            {loading && !error && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <div
                  className="spinner-border text-dark mt-5"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {error && !loading && (
              <div
                className="d-flex align-items-center text-danger fw-semibold mt-5"
                style={{ justifyContent: "center" }}
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && leadData?.length === 0 && (
              <div
                className="d-flex align-items-center text-secondary fw-semibold"
                style={{ justifyContent: "center", marginTop: "8rem" }}
              >
                <i className="bi bi-search fs-3 me-2"></i>
                <h5 className="mt-2">No Agents Found</h5>
              </div>
            )}

            {leadData?.length > 0 && (
              <>
                <div className="d-none d-md-block table-responsive mt-4 mb-5">
                  <table
                    className="table table-bordered shadow-sm bg-white"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    <thead className="table-light">
                      <tr>
                        <th className="py-3 px-3">
                          <i className="bi bi-person-fill me-2"></i>Name
                        </th>
                        <th className="py-3 px-3">
                          <i className="bi bi-envelope-fill me-2"></i>Email
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {leadData?.map((ag) => (
                        <tr
                          key={ag._id}
                          className="row-lead"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href = `/agent/details/${ag._id}`)
                          }
                        >
                          <td className="py-3 px-3">{ag.name}</td>
                          <td className="py-3 px-3">{ag.email || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="d-md-none mt-4">
              {leadData?.map((ag) => (
                <div
                  key={ag._id}
                  className="p-3 mb-4 border rounded shadow-sm bg-white"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    (window.location.href = `/agent/details/${ag._id}`)
                  }
                >
                  <p className="fw-bold mb-2" style={{ fontSize: "1.1rem" }}>
                    <i className="bi bi-person-fill me-2"></i>
                    {ag.name}
                  </p>

                  <p className="text-muted mb-0">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {ag.email || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agents;
