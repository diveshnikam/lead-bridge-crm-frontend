import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

const Leads = () => {
  const [agents, setAgents] = useState([]);

  const [agentName, setAgentName] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("");
  const [url, setUrl] = useState(
    "https://lead-bridge-crm-backend.vercel.app/leads"
  );

  const { leadData: agentData } = useFetch(
    "https://lead-bridge-crm-backend.vercel.app/agents"
  );

  useEffect(() => {
    if (Array.isArray(agentData)) setAgents(agentData);
  }, [agentData]);

  useEffect(() => {
    const newUrl =
      `https://lead-bridge-crm-backend.vercel.app/leads?` +
      `salesAgent=${agentName}&` +
      `status=${status}&` +
      `source=${source}&` +
      `priority=${priority}&` +
      `sort=${sort}`;

    setUrl(newUrl);
  }, [agentName, status, source, priority, sort]);

  const { loading, error, leadData } = useFetch(url);
  const leads = Array.isArray(leadData)
    ? leadData
    : Array.isArray(leadData?.data)
    ? leadData.data
    : [];

  return (
    <>
      <div className="container">
        <h1 className="fw-bold text-center mt-5 mb-5">Lead List</h1>
        <hr />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-3 mt-2 mb-4 mb-md-5 text-center text-md-start">
            <Link to="/" className="btn btn-white border lead-btn mb-5">
              <i className="bi bi-arrow-left me-2"></i>
              Back To Dashboard
            </Link>
          </div>

          <div className="col-12 col-md-9">
            <h2 className="fw-bold text-center text-md-start mb-5 mt-2">
              Lead Overview
            </h2>

            <div className="text-center text-md-end">
              <Link
                to="/lead/add"
                className="btn btn-white border lead-btn mt-2"
              >
                <i className="bi bi-plus-lg me-2 fs-5 fw-bold"></i> Add New Lead
              </Link>

              <div className="row g-3 mt-5">
                <div className="col-md-3 col-sm-6">
                  <select
                    className="form-select"
                    onChange={(e) => setAgentName(e.target.value)}
                  >
                    <option value="">Agent</option>
                    <option value="">None</option>
                    {agents?.map((ag) => (
                      <option key={ag._id} value={ag._id}>
                        {ag.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6">
                  <select
                    className="form-select"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Status</option>
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="col-md-3 col-sm-6">
                  <select
                    className="form-select"
                    onChange={(e) => setSource(e.target.value)}
                  >
                    <option value="">Source</option>
                    <option value="">None</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-3 col-sm-6">
                  <select
                    className="form-select"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="">Priority</option>
                    <option value="">None</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="col-md-3 col-sm-6">
                  <select
                    className="form-select"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Time</option>
                    <option value="">None</option>
                    <option value="High">High → Low</option>
                    <option value="Low">Low → High</option>
                  </select>
                </div>
              </div>

              <div className="">
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
                      className="spinner-border text-dark"
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

                {!loading && !error && leads?.length === 0 && (
                  <div
                    className="d-flex align-items-center text-dark fw-semibold "
                    style={{ justifyContent: "center", marginTop: "8rem" }}
                  >
                    <i class="bi bi-search text-secondary fs-3 me-2"></i>
                    <h5 className="mt-5 mb-5">No Leads Found</h5>
                  </div>
                )}

                {!loading && !error && leads?.length > 0 && (
                  <div className="table-responsive mt-5">
                    <table
                      className="table border leads-table shadow-sm mb-5"
                      style={{ background: "white" }}
                    >
                      <thead>
                        <tr>
                          <th className="text-start py-3 px-3">Lead Name</th>
                          <th className="text-start py-3 px-3">Agent Name</th>
                          <th className="text-start py-3 px-3">Status</th>
                          <th className="text-start py-3 px-3">Priority</th>
                          <th className="text-start py-3 px-3">
                            Time to Close
                          </th>
                          <th className="text-start py-3 px-3">Source</th>
                        </tr>
                      </thead>

                      <tbody>
                        {leads.map((lead) => (
                          <tr
                            key={lead._id}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/lead/${lead._id}`)
                            }
                            className="row-lead"
                          >
                            <td className="text-start py-4 px-4">
                              {lead.name}
                            </td>
                            <td className="text-start py-4 px-4">
                              {lead.salesAgent?.name || "—"}
                            </td>
                            <td className="text-start py-4 px-4">
                              {lead.status}
                            </td>
                            <td className="text-start py-4 px-4">
                              {lead.priority}
                            </td>
                            <td className="text-start py-4 px-4">
                              {lead.timeToClose} days
                            </td>
                            <td className="text-start py-4 px-4">
                              {lead.source}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {!loading && !error && leads?.length > 0 && (
                <div className="lead-card-mobile mt-4 ">
                  {leads.map((lead) => (
                    <div
                      key={lead._id}
                      className="lead-card-mobile-item"
                      style={{ paddingLeft: "5rem" }}
                      onClick={() =>
                        (window.location.href = `/lead/${lead._id}`)
                      }
                    >
                      <p className="lead-field-row ">
                        <span className="lead-field-label">Lead Name:</span>
                        <span className="lead-field-value">{lead.name}</span>
                      </p>

                      <p className="lead-field-row ">
                        <span className="lead-field-label">Agent:</span>
                        <span className="lead-field-value">
                          {lead.salesAgent?.name || "—"}
                        </span>
                      </p>

                      <p className="lead-field-row">
                        <span className="lead-field-label">Status:</span>
                        <span className="lead-field-value">{lead.status}</span>
                      </p>

                      <p className="lead-field-row">
                        <span className="lead-field-label">Priority:</span>
                        <span className="lead-field-value">
                          {lead.priority}
                        </span>
                      </p>

                      <p className="lead-field-row">
                        <span className="lead-field-label">Close Time:</span>
                        <span className="lead-field-value">
                          {lead.timeToClose} days
                        </span>
                      </p>

                      <p className="lead-field-row">
                        <span className="lead-field-label">Source:</span>
                        <span className="lead-field-value">{lead.source}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leads;
