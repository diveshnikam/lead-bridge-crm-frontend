import Sidebar from "./Sidebar";
import useFetch from "../customHooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomePageMain = () => {
  const [status, setStatus] = useState("");

  const url =
    status && status !== "All"
      ? `https://lead-bridge-crm-backend.vercel.app/leads?status=${status}`
      : "https://lead-bridge-crm-backend.vercel.app/leads";

  const { loading, error, leadData } = useFetch(url);

  const {
    loading: dataLoading,
    error: dataError,
    leadData: dataLead,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/leads");

  const leads = Array.isArray(leadData)
    ? leadData
    : Array.isArray(leadData?.data)
    ? leadData.data
    : [];

  const leadss = Array.isArray(dataLead)
    ? dataLead
    : Array.isArray(dataLead?.data)
    ? dataLead.data
    : [];

  const newLeads = leadss.filter((lead) => lead.status === "New");
  const contactedLeads = leadss.filter((lead) => lead.status === "Contacted");
  const qualifiedLeads = leadss.filter((lead) => lead.status === "Qualified");
  const proposalLeads = leadss.filter(
    (lead) => lead.status === "Proposal Sent"
  );
  const closedLeads = leadss.filter((lead) => lead.status === "Closed");

  const filter = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
    "All",
  ];

  const stateHandler = (name) => {
    setStatus(name);
  };

  return (
    <>
      <div className="container-fluid px-3 px-md-4">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2 mb-4">
            <Sidebar />
          </div>

          <div className="col-9 ms-5 homepage-main">
            <div>
              <h2 className="fw-bold text-center text-md-start">
                Leads-Overview
              </h2>
            </div>

            <hr style={{ marginTop: "2.5rem" }} />

            <div className="mt-5">
              <h2 className="fw-bold text-center text-md-start mb-5">
                Quick Filter:
              </h2>

              <div className="row g-3 justify-content-center justify-content-md-start">
                {filter.map((f, i) => (
                  <div
                    key={i}
                    className="col-6 col-md-4 col-lg-2 d-flex justify-content-center"
                  >
                    <button
                      onClick={() => stateHandler(f)}
                      className="btn lead-btn fw-semibold border rounded shadow-sm w-100 py-2"
                    >
                      {f}
                    </button>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center justify-content-md-end mt-5">
                <Link
                  to="/lead/add"
                  className="btn btn-white lead-btn fw-semibold border px-4 py-2 shadow-sm d-flex align-items-center"
                >
                  <i className="bi bi-plus-lg me-2 fs-5 fw-bold"></i>
                  Add New Lead
                </Link>
              </div>
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

            {!loading && !error && leads.length === 0 && (
              <div
                className="d-flex align-items-center text-secondary fw-semibold mt-5"
                style={{ justifyContent: "center" }}
              >
                <i className="bi bi-emoji-frown me-2 fs-4"></i>
                <span>No leads found</span>
              </div>
            )}

            {!loading && !error && leads.length > 0 && (
              <div className="lead-grid-custom mt-4">
                {leads.map((d, i) => (
                  <div key={i} className="lead-grid-item">
                    <Link
                      to={`/lead/${d._id}`}
                      className="lead-card d-block p-3 border rounded shadow-sm bg-white"
                    >
                      {d.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <hr className="mt-5 mb-5" />

            <div className="mb-5">
              <h2 className="fw-bold text-center text-md-start ms-0 ms-md-2">
                Lead Status:
              </h2>

              {dataLoading && !dataError && (
                <div
                  className="d-flex justify-content-center align-items-center mt-5"
                  style={{ height: "150px" }}
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

              {!dataLoading && dataError && (
                <div className="d-flex justify-content-center align-items-center text-danger fw-semibold mt-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>{dataError}</span>
                </div>
              )}

              {!dataLoading && !dataError && leadss.length === 0 && (
                <div
                  className="d-flex align-items-center text-secondary fw-semibold mt-5"
                  style={{ justifyContent: "center" }}
                >
                  <i className="bi bi-emoji-frown me-2 fs-4"></i>
                  <span>No leads found</span>
                </div>
              )}

              {!dataLoading && !dataError && leadss.length > 0 && (
                <div className="d-flex flex-column flex-md-row flex-md-wrap align-items-center justify-content-center gap-3 mt-5 me-0 me-md-5">
                  <div
                    className="border rounded p-3 shadow-sm bg-white text-center sidebar-hover"
                    style={{ minWidth: "180px" }}
                  >
                    <h5 className="mb-1">New</h5>
                    <p className="mb-0 fs-5 fw-bold">{newLeads.length}</p>
                  </div>

                  <div
                    className="border rounded p-3 shadow-sm bg-white text-center sidebar-hover"
                    style={{ minWidth: "180px" }}
                  >
                    <h5 className="mb-1">Contacted</h5>
                    <p className="mb-0 fs-5 fw-bold">{contactedLeads.length}</p>
                  </div>

                  <div
                    className="border rounded p-3 shadow-sm bg-white text-center sidebar-hover"
                    style={{ minWidth: "180px" }}
                  >
                    <h5 className="mb-1">Qualified</h5>
                    <p className="mb-0 fs-5 fw-bold">{qualifiedLeads.length}</p>
                  </div>

                  <div
                    className="border rounded p-3 shadow-sm bg-white text-center sidebar-hover"
                    style={{ minWidth: "180px" }}
                  >
                    <h5 className="mb-1">Proposal Sent</h5>
                    <p className="mb-0 fs-5 fw-bold">{proposalLeads.length}</p>
                  </div>

                  <div
                    className="border rounded p-3 shadow-sm bg-white text-center sidebar-hover"
                    style={{ minWidth: "180px" }}
                  >
                    <h5 className="mb-1">Closed</h5>
                    <p className="mb-0 fs-5 fw-bold">{closedLeads.length}</p>
                  </div>
                </div>
              )}

              <hr className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
