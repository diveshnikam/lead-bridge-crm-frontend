import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Comments from "../components/Comments";

const LeadDetails = () => {
  const { id } = useParams();
  const { loading, error, leadData } = useFetch(
    `https://lead-bridge-crm-backend.vercel.app/leads/${id}`
  );

  if (loading && !error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div
          className="spinner-border text-dark"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger fw-semibold mt-5 fs-4"
        style={{ height: "70vh" }}
      >
        <i className="bi bi-exclamation-triangle-fill me-3 fs-2"></i>
        <span>{error}</span>
      </div>
    );
  }

  if (!loading && !error && !leadData?._id) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-secondary fw-semibold mt-5 fs-4"
        style={{ height: "70vh" }}
      >
        <i className="bi bi-emoji-frown fs-2 me-3"></i>
        <span>Lead Not Found</span>
      </div>
    );
  }

  return (
    <>
      {!loading && !error && leadData?._id && (
        <div
          className="container"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="fw-bold text-center mt-3 mb-4">
              Lead Management - {leadData.name}
            </h1>
          </div>

          <hr />

         <div className="row mt-5 justify-content-center g-4 px-3 px-md-0">

            {/* LEFT COLUMN */}
            <div className="col-12 col-md-3 text-center text-md-start px-2 px-md-0 mt-4">

              <Link
                to="/"
                className="btn btn-white border lead-btn  mb-4 mt-2 lead-w"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back To Dashboard
              </Link>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-12 col-md-9 text-center text-md-start px-2 px-md-0">

              <h2 className="fw-bold mb-4 mt-2">Lead Details</h2>

              <div className="p-4 border rounded shadow-sm mx-auto w-100 w-md-75 w-xl-50">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: "180px" }}>Lead Name:</th>
                      <td>{leadData.name}</td>
                    </tr>
                    <tr>
                      <th>Sales Agent:</th>
                      <td>
                        {leadData.salesAgent?.name || (
                          <span className="text-muted">No Agent Assigned</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Lead Source:</th>
                      <td>{leadData.source}</td>
                    </tr>
                    <tr>
                      <th>Lead Status:</th>
                      <td>{leadData.status}</td>
                    </tr>
                    <tr>
                      <th>Priority:</th>
                      <td>{leadData.priority}</td>
                    </tr>
                    <tr>
                      <th>Time to Close:</th>
                      <td>{leadData.timeToClose} days</td>
                    </tr>
                    {leadData.tags?.length > 0 && (
                      <tr>
                        <th>Tags:</th>
                        <td>{leadData.tags.join(", ")}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Link
                to={`/lead/update/${leadData._id}`}
                state={{ leadData }}
                className="mt-4 btn btn-white lead-btn fw-semibold border p-2 lead-e"
              >
                <i className="bi bi-pencil-square me-2 fs-5 fw-bold"></i>
                Edit Lead
              </Link>

              <Comments
                id={leadData._id}
                agent={leadData.salesAgent?._id || null}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadDetails;
