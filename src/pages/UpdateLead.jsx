import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { Link } from "react-router-dom";

const UpdateLead = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedLead = location.state?.leadData;

  const [lead, setLead] = useState(passedLead || null);
  const [nameError, setNameError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [tagError, setTagError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { leadData, loading, error } = useFetch(
    `https://lead-bridge-crm-backend.vercel.app/leads/${id}`
  );

  const {
    leadData: agentData,
    loading: agentLoading,
    error: agentError,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/agents");

  useEffect(() => {
    const data = passedLead || leadData;

    if (data) {
      setLead(data);

      setTagInput(data.tags?.join(", ") || "");
    }
  }, [passedLead, leadData]);

  if (loading || agentLoading) {
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

  if (error || agentError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger fw-semibold mt-5 fs-4"
        style={{ height: "70vh" }}
      >
        <i className="bi bi-exclamation-triangle-fill me-3 fs-2"></i>
        <span>
          {error ? `Lead Error: ${error}` : `Agent Error: ${agentError}`}
        </span>
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

  if (!agentLoading && !agentError && agentData?.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-secondary fw-semibold mt-5 fs-4"
        style={{ height: "70vh" }}
      >
        <i className="bi bi-person-x fs-2 me-3"></i>
        <span>Agent Not Found</span>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!lead.salesAgent || !lead.salesAgent._id) {
      setUpdateError("Please select a valid Sales Agent.");
      setTimeout(() => setUpdateError(""), 3000);
      return;
    }

    if (!lead?._id) return;

    setIsUpdating(true);
    setUpdateMessage("");
    setUpdateError("");

    const data = {
      name: lead.name,
      source: lead.source,
      salesAgent: lead.salesAgent._id || null,
      status: lead.status,
      tags: lead.tags,
      timeToClose: Number(lead.timeToClose),
      priority: lead.priority,
    };

    try {
      const res = await fetch(
        `https://lead-bridge-crm-backend.vercel.app/leads/${lead._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setUpdateMessage("Lead updated successfully!");
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (error) {
      setUpdateError("Failed to update lead!");
      setTimeout(() => setUpdateError(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";

    if (value.trim().length < 2) return "Minimum 2 characters required";

    const simplePattern = /^[A-Za-z-' ]+$/;

    if (!simplePattern.test(value))
      return "Only letters, spaces, hyphens (-), and apostrophes (') allowed";

    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;

    setLead({ ...lead, name: value });

    setNameError(validateName(value));
  };

  const validateTime = (value) => {
    if (!value) return "Time is required";

    if (!/^[0-9]+$/.test(value)) return "Only numbers allowed";

    if (Number(value) <= 0) return "Time must be greater than 0";

    return "";
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;

    setLead({ ...lead, timeToClose: value });

    setTimeError(validateTime(value));
  };

  const validateTags = (tagsArray) => {
    if (tagsArray.length === 0) return "At least one tag is required";

    const unique = new Set(tagsArray);
    if (unique.size !== tagsArray.length)
      return "Duplicate tags are not allowed";

    const tagPattern = /^[a-zA-Z0-9-' ]*$/;

    for (let tag of tagsArray) {
      if (!tagPattern.test(tag)) {
        return "Each tag can only contain letters, numbers, and hyphens (no spaces)";
      }
    }

    return "";
  };

  const handleTagChange = (e) => {
    const value = e.target.value;

    setTagInput(value);

    const tagsArray = value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    setLead({ ...lead, tags: tagsArray });

    setTagError(validateTags(tagsArray));
  };

  return (
    <>
     <div className="container mb-5 px-3 px-md-0" style={{ marginTop: "5rem" }}>

        <div className="row justify-content-center g-5">
          <div className="col-12 col-md-3 mb-4 text-center text-md-start">
            <div className="container mt-3">
              <Link
                to={`/lead/${lead._id || agentData._id}`}
                className="btn btn-white border lead-btn"
              >
                <i className="bi bi-arrow-left me-2"></i>
                <span className="back-btn-text">Back To Lead Details</span>
                <span className="back-btn-short">Back</span>
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <h1 className="fw-bold mb-4 text-center text-md-start mt-2 mb-5">
              Update Lead - {lead?.name}
            </h1>

            {lead?._id &&
              !loading &&
              !error &&
              !agentLoading &&
              !agentError &&
              agentData?.length > 0 && (
                <>
                  <form
                    className="border p-4 rounded shadow-sm mt-3 mx-1 mx-md-0"
                    style={{ maxWidth: "650px" }}
                    onSubmit={handleUpdate}
                  >
                    <div className="mb-4">
                      <label className="form-label">Lead Name:</label>
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${
                          nameError ? "is-invalid" : ""
                        }`}
                        value={lead.name || ""}
                        onChange={handleNameChange}
                      />
                      {nameError && (
                        <div className="invalid-feedback mt-3">{nameError}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Sales Agent:</label>
                      <select
                        name="salesAgent"
                        className="form-select"
                        value={lead?.salesAgent?._id || ""}
                        onChange={(e) =>
                          setLead({
                            ...lead,
                            salesAgent: e.target.value
                              ? { _id: e.target.value }
                              : null,
                          })
                        }
                      >
                        <option value="">No Agent Assigned</option>

                        {agentData.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Source:</label>
                      <select
                        name="source"
                        className="form-select"
                        value={lead?.source || ""}
                        onChange={handleChange}
                      >
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Email">Email</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Status:</label>
                      <select
                        name="status"
                        className="form-select"
                        value={lead?.status || ""}
                        onChange={handleChange}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Priority</label>
                      <select
                        name="priority"
                        className="form-select"
                        value={lead.priority || ""}
                        onChange={handleChange}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <label className="form-label">
                      Time to Close: (Number of days)
                    </label>
                    <input
                      type="text"
                      name="timeToClose"
                      className={`form-control ${
                        timeError ? "is-invalid" : ""
                      }`}
                      value={lead.timeToClose || ""}
                      onChange={handleTimeChange}
                    />
                    {timeError && (
                      <div className="invalid-feedback mt-3">{timeError}</div>
                    )}

                    <div className="mb-4 mt-4">
                      <label className="form-label">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        className={`form-control ${
                          tagError ? "is-invalid" : ""
                        }`}
                        value={tagInput}
                        onChange={handleTagChange}
                      />

                      {tagError && (
                        <div className="invalid-feedback mt-2">{tagError}</div>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        className="btn btn-dark fw-semibold px-4 py-2"
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check2-circle me-2"></i>
                            Update Lead
                          </>
                        )}
                      </button>

                      {updateMessage && (
                        <p className="text-dark mt-3 fw-semibold">
                          <i className="bi bi-check-circle me-2"></i>
                          {updateMessage}
                        </p>
                      )}

                      {updateError && (
                        <p className="text-danger mt-3 fw-semibold">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {updateError}
                        </p>
                      )}
                    </div>
                  </form>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateLead;
