import useFetch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [refresh]);

  const navigate = useNavigate();

  const {
    loading: loadingLeads,
    error: errorLeads,
    leadData: leads,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/leads", refresh);

  const {
    loading,
    error,
    leadData: agents,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/agents", refresh);

  const [deleteMsg, setDeleteMsg] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [deletingAgentId, setDeletingAgentId] = useState(null);
  const [deletingLeadId, setDeletingLeadId] = useState(null);

  const handleDeleteAgent = (id) => {
    setDeletingAgentId(id);
    setDeleteMsg("");
    setDeleteError("");

    fetch(`https://lead-bridge-crm-backend.vercel.app/agents/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Agent deleted successfully.") {
          setDeleteMsg("Agent deleted successfully!");
          setTimeout(() => setDeleteMsg(""), 3000);
          setRefresh((prev) => !prev);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setDeleteError(data.message || "Failed to delete agent.");
          setTimeout(() => setDeleteError(""), 3000);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch(() => {
        setDeleteError("Something went wrong.");
        setTimeout(() => setDeleteError(""), 3000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .finally(() => setDeletingAgentId(null));
  };

  const handleDeleteLead = (id) => {
    setDeletingLeadId(id);
    setDeleteMsg("");
    setDeleteError("");

    fetch(`https://lead-bridge-crm-backend.vercel.app/leads/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Lead deleted successfully.") {
          setDeleteMsg("Lead deleted successfully!");
          setTimeout(() => setDeleteMsg(""), 3000);
          setRefresh((prev) => !prev);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setDeleteError(data.message || "Failed to delete lead.");
          setTimeout(() => setDeleteError(""), 3000);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch(() => {
        setDeleteError("Something went wrong.");
        setTimeout(() => setDeleteError(""), 3000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .finally(() => setDeletingLeadId(null));
  };

  return (
    <>
      <div className="container-fluid px-3 px-md-5 mt-5">
        <h1 className="fw-bold text-center">
          <i className="bi bi-gear-fill me-3"></i>
          Settings
        </h1>
        <hr className="mt-5 mb-5" />

        {deleteMsg && (
          <div
            className="text-center fw-semibold mt-3 mb-5"
            style={{ color: "black" }}
          >
            <i className="bi bi-check-circle-fill fs-1 me-2"></i>
            <h3>{deleteMsg}</h3>
          </div>
        )}

        {deleteError && (
          <div
            className="text-center fw-semibold mt-3 mb-5"
            style={{ color: "black" }}
          >
            <i className="bi bi-exclamation-triangle-fill fs-1 me-2"></i>
            <h3>{deleteError}</h3>
          </div>
        )}
      </div>

      <div className="container-fluid px-3 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-3 mb-4 text-center text-md-start">
            <Link to="/" className="btn btn-white border lead-btn ">
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </Link>
          </div>

          <div className="col-12 col-md-9">
            <h3 className="fw-bold mb-4 mt-1 mb-5 text-center text-md-start">
              All Agents
            </h3>

            {loading && !error && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh" }}
              >
                <div
                  className="spinner-border text-dark"
                  style={{ width: "3rem", height: "3rem" }}
                ></div>
              </div>
            )}

            {!loading && error && (
              <div className="text-center mb-4">
                <i className="bi bi-exclamation-triangle-fill fs-1 mb-3"></i>
                <h4 className="fw-semibold">{error}</h4>
              </div>
            )}

            {!loading &&
              !error &&
              Array.isArray(agents) &&
              agents.length === 0 && (
                <div className="text-center mt-4 mb-5">
                  <i className="bi bi-people-fill fs-1 mb-3"></i>
                  <h4>No agents found</h4>
                </div>
              )}

            {!loading &&
              !error &&
              Array.isArray(agents) &&
              agents.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered bg-white shadow-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th className="d-none d-md-table-cell">Email</th>
                        <th style={{ width: "120px" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent) => (
                        <tr
                          key={agent._id}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/agent/details/${agent._id}`)
                          }
                           className="row-lead"
                        >
                          <td>{agent.name}</td>
                          <td className="d-none d-md-table-cell">
                            {agent.email}
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <button
                              className="btn btn-white border lead-btn btn-sm w-100"
                              onClick={() => handleDeleteAgent(agent._id)}
                              disabled={deletingAgentId === agent._id}
                            >
                              {deletingAgentId === agent._id ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-1" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-trash-fill" /> Delete
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            <h3 className="fw-bold mt-5 mb-5 text-center text-md-start">
              All Leads
            </h3>

            {loadingLeads && !errorLeads && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh" }}
              >
                <div
                  className="spinner-border text-dark"
                  style={{ width: "3rem", height: "3rem" }}
                ></div>
              </div>
            )}

            {!loadingLeads && errorLeads && (
              <div className="text-center mb-4">
                <i className="bi bi-exclamation-triangle-fill fs-1 mb-3"></i>
                <h4 className="fw-semibold">{errorLeads}</h4>
              </div>
            )}

            {!loadingLeads &&
              !errorLeads &&
              Array.isArray(leads) &&
              leads.length === 0 && (
                <div className="text-center mt-4 mb-5">
                  <i className="bi bi-search fs-1 mb-3"></i>
                  <h4>No leads found</h4>
                </div>
              )}

            {!loadingLeads &&
              !errorLeads &&
              Array.isArray(leads) &&
              leads.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered bg-white shadow-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th className="d-none d-md-table-cell">Status</th>
                        <th className="d-none d-md-table-cell">Agent</th>

                        <th style={{ width: "120px" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr
                          key={lead._id}
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/lead/${lead._id}`)}
                        className="row-lead"
                        >
                          <td>{lead.name}</td>
                          <td className="d-none d-md-table-cell">
                            {lead.status}
                          </td>
                          <td className="d-none d-md-table-cell">
                            {lead.salesAgent?.name || "--"}
                          </td>

                          <td onClick={(e) => e.stopPropagation()}>
                            <button
                              className="btn btn-white border lead-btn btn-sm w-100"
                              onClick={() => handleDeleteLead(lead._id)}
                              disabled={deletingLeadId === lead._id}
                            >
                              {deletingLeadId === lead._id ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-1" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-trash-fill" /> Delete
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
