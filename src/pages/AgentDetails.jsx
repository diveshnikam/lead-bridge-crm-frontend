import { useParams, Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useState } from "react";

const AgentDetails = () => {
  const { id } = useParams();

  const {
    loading: agentLoading,
    error: agentError,
    leadData: agents,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/agents");

  const {
    loading: leadsLoading,
    error: leadsError,
    leadData: allLeads,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/leads");

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [source, setSource] = useState("");

  const agent = Array.isArray(agents) ? agents.find((a) => a._id === id) : null;

  const agentLeads = Array.isArray(allLeads)
    ? allLeads.filter((lead) => lead.salesAgent?._id === id)
    : [];

  let filteredLeads = agentLeads;

  if (status) filteredLeads = filteredLeads.filter((l) => l.status === status);
  if (priority)
    filteredLeads = filteredLeads.filter((l) => l.priority === priority);
  if (source) filteredLeads = filteredLeads.filter((l) => l.source === source);

  if (agentLoading || leadsLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div
          className="spinner-border text-dark"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
      </div>
    );

  if (agentError || leadsError)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <i
            className="bi bi-exclamation-triangle-fill fs-1 mb-3"
            style={{ color: "black" }}
          ></i>
          <h4 style={{ color: "black" }}>{agentError || leadsError}</h4>
        </div>
      </div>
    );

  if (!agent)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <i
            className="bi bi-person-x fs-1 mb-3"
            style={{ color: "black" }}
          ></i>
          <h4 className="fw-semibold" style={{ color: "black" }}>
            Agent Not Found
          </h4>
        </div>
      </div>
    );

  return (
    <div
      className="container agent-details-container"
      style={{ marginTop: "6rem" }}
    >
      <div className="row">
        <div className="col-2 d-none d-md-block">
          <Link
            to="/agents"
            className="btn btn-white border lead-btn mb-5 mt-3"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
        </div>

        <div className="d-block d-md-none mobile-center-block ">
          <Link
            to="/agents"
            className="btn btn-white border lead-btn mobile-back-btn back-agent-details mb-5"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
        </div>

        <div className="col-10">
          <h1 className="fw-bold mb-4 mobile-center-block agent-heading">
            Agent Details
          </h1>
          <hr className="mt-5 mb-5 mobile-center-block" />

          <div className="p-3 border rounded bg-white shadow-sm mb-4 agent-header-mobile mobile-center-block">
            <div className="d-flex justify-content-between">
              <h4 className="fw-bold d-flex align-items-center agent-name-mobile">
                <i
                  className="bi bi-person-fill me-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                {agent.name}
              </h4>

              <Link
                className="btn btn-white border lead-btn mt-1 edit-agent-btn-mobile desktop-edit-btn"
                to={`/agents/details/edit/${id}`}
              >
                <i className="bi bi-pencil-square me-2 fs-5 fw-bold"></i>
                Edit Details
              </Link>

              <Link
                className="btn btn-white border lead-btn mt-1 edit-agent-btn-mobile mobile-edit-btn btn-sm"
                to={`/agents/details/edit/${id}`}
              >
                 <i className="bi bi-pencil-square me-2 fs-5 fw-bold"></i>
               Edit
              </Link>
            </div>

            <p>
              <strong>Email:</strong> {agent.email}
            </p>
            <p>
              <strong>Total Leads:</strong> {agentLeads.length}
            </p>
            <p>
              <strong>Closed Leads:</strong>{" "}
              {agentLeads.filter((l) => l.status === "Closed").length}
            </p>
          </div>

          <div className="row g-3 mb-5 mt-5 filters-mobile mobile-center-block">
            <div className="col-md-4">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Status (All)</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Priority (All)</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Source (All)</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {filteredLeads.length === 0 && (
            <div
              className="d-flex justify-content-center align-items-center mt-5 mb-5"
              style={{ height: "40vh" }}
            >
              <div className="text-center">
                <i
                  className="bi bi-search fs-1 mb-3"
                  style={{ color: "black" }}
                ></i>
                <h5 className="fw-semibold" style={{ color: "black" }}>
                  No leads found
                </h5>
              </div>
            </div>
          )}

          {filteredLeads.length > 0 && (
            <table className="table table-bordered bg-white shadow-sm desktop-table-only">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Source</th>
                  <th>Time to Close</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = `/lead/${lead._id}`)}
                  >
                    <td>{lead.name}</td>
                    <td>{lead.status}</td>
                    <td>{lead.priority}</td>
                    <td>{lead.source}</td>
                    <td>{lead.timeToClose} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="d-md-none mobile-center-block mt-5">
            
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="lead-card-mobile"
                onClick={() => (window.location.href = `/lead/${lead._id}`)}
                style={{ cursor: "pointer" }}
              >
                <p className="fw-bold mb-1">{lead.name}</p>
                <p className="mb-1">Status: {lead.status}</p>
                <p className="mb-1">Priority: {lead.priority}</p>
                <p className="mb-1">Source: {lead.source}</p>
                <p className="mb-0">Time to Close: {lead.timeToClose} days</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
