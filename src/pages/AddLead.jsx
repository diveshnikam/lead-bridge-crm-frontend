import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../customHooks/useFetch";

const AddLead = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [agentError, setAgentError] = useState("");

  const [source, setSource] = useState("");
  const [sourceError, setSourceError] = useState("");

  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");

  const [priority, setPriority] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const [timeToClose, setTimeToClose] = useState("");
  const [timeError, setTimeError] = useState("");

  const [tags, setTags] = useState("");
  const [tagError, setTagError] = useState("");

  const [submitMsg, setSubmitMsg] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { leadData: agentData } = useFetch(
    "https://lead-bridge-crm-backend.vercel.app/agents"
  );

  useEffect(() => {
    if (Array.isArray(agentData)) setAgents(agentData);
  }, [agentData]);

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Minimum 2 characters required";
    const pattern = /^[A-Za-z-' ]+$/;
    if (!pattern.test(value))
      return "Only letters, spaces, hyphens (-), and apostrophes (') allowed";
    return "";
  };

  const validateTime = (value) => {
    if (!value.trim()) return "Time to close is required";
    if (!/^[0-9]+$/.test(value)) return "Only numbers allowed";
    if (Number(value) <= 0) return "Time must be greater than 0";
    return "";
  };

  const validateTags = (value) => {
    if (!value.trim()) return "At least one tag required";

    const tagArray = value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const unique = new Set(tagArray);
    if (unique.size !== tagArray.length) return "Duplicate tags not allowed";

    const pattern = /^[A-Za-z0-9-]+$/;
    for (let tag of tagArray) {
      if (!pattern.test(tag))
        return "Tags can only contain letters, numbers, and hyphens";
    }

    return "";
  };

  const handleName = (e) => {
    const v = e.target.value;
    setName(v);
    setNameError(validateName(v));
  };

  const handleAgent = (e) => {
    const v = e.target.value;
    setAgentId(v);
    setAgentError(v === "" ? "Please select an agent" : "");
  };

  const handleSource = (e) => {
    const v = e.target.value;
    setSource(v);
    setSourceError(v === "" ? "Please select a source" : "");
  };

  const handleStatus = (e) => {
    const v = e.target.value;
    setStatus(v);
    setStatusError(v === "" ? "Please select a status" : "");
  };

  const handlePriority = (e) => {
    const v = e.target.value;
    setPriority(v);
    setPriorityError(v === "" ? "Please select a priority" : "");
  };

  const handleTime = (e) => {
    const v = e.target.value;
    setTimeToClose(v);
    setTimeError(validateTime(v));
  };

  const handleTags = (e) => {
    const v = e.target.value;
    setTags(v);
    setTagError(validateTags(v));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const timeErr = validateTime(timeToClose);
    const tagErr = validateTags(tags);

    setNameError(nameErr);
    setTimeError(timeErr);
    setTagError(tagErr);
    setAgentError(agentId === "" ? "Please select an agent" : "");
    setSourceError(source === "" ? "Please select a source" : "");
    setStatusError(status === "" ? "Please select a status" : "");
    setPriorityError(priority === "" ? "Please select a priority" : "");

    if (
      nameErr ||
      timeErr ||
      tagErr ||
      agentId === "" ||
      source === "" ||
      status === "" ||
      priority === ""
    ) {
      setSubmitError("Please correct all errors before submitting.");
      setTimeout(() => setSubmitError(""), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMsg("");
    setSubmitError("");

    const finalTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const body = {
      name,
      salesAgent: agentId,
      source,
      status,
      priority,
      timeToClose: Number(timeToClose),
      tags: finalTags,
    };

    fetch("https://lead-bridge-crm-backend.vercel.app/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSubmitMsg("Lead added successfully!");

          setName("");
          setAgentId("");
          setSource("");
          setStatus("");
          setPriority("");
          setTimeToClose("");
          setTags("");

          setNameError("");
          setAgentError("");
          setSourceError("");
          setStatusError("");
          setPriorityError("");
          setTimeError("");
          setTagError("");

          setTimeout(() => setSubmitMsg(""), 3000);
        } else {
          setSubmitError("Failed to add lead!");
        }
      })
      .catch(() => {
        setSubmitError("Something went wrong!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="container mb-5" style={{ marginTop: "5rem" }}>
        <div className="row justify-content-center g-5">
          <div className="col-12 col-md-3 mb-4 text-md-start text-center">
            <Link
              to={`/`}
              className="btn btn-white border lead-btn lead-w mt-2"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back To Dashboard
            </Link>
          </div>

          <div className="col-12 col-md-9">
            <h1 className="fw-bold mb-5 text-center text-md-start">
              Add New Lead
            </h1>

            <form
              className="border p-4 rounded shadow-sm mt-5"
              style={{ maxWidth: "650px" }}
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="form-label">Lead Name:</label>
                <input
                  type="text"
                  className={`form-control ${nameError ? "is-invalid" : ""}`}
                  value={name}
                  onChange={handleName}
                  required
                />
                {nameError && (
                  <div className="invalid-feedback mt-2">{nameError}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label">Sales Agent:</label>
                <select
                  className={`form-select ${agentError ? "is-invalid" : ""}`}
                  value={agentId}
                  onChange={handleAgent}
                  required
                >
                  <option value="">Select Agent</option>
                  {agents.map((a) => (
                    <option value={a._id} key={a._id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                {agentError && (
                  <div className="invalid-feedback mt-2">{agentError}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label">Source:</label>
                <select
                  className={`form-select ${sourceError ? "is-invalid" : ""}`}
                  value={source}
                  onChange={handleSource}
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
                {sourceError && (
                  <div className="invalid-feedback mt-2">{sourceError}</div>
                )}
              </div>

              <div className="row">
                <div className="col-12 col-md-6 mb-4">
                  <label className="form-label">Status:</label>
                  <select
                    className={`form-select ${statusError ? "is-invalid" : ""}`}
                    value={status}
                    onChange={handleStatus}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                  {statusError && (
                    <div className="invalid-feedback mt-2">{statusError}</div>
                  )}
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <label className="form-label">Priority:</label>
                  <select
                    className={`form-select ${
                      priorityError ? "is-invalid" : ""
                    }`}
                    value={priority}
                    onChange={handlePriority}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {priorityError && (
                    <div className="invalid-feedback mt-2">{priorityError}</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Time to Close (Days)</label>
                <input
                  type="text"
                  className={`form-control ${timeError ? "is-invalid" : ""}`}
                  value={timeToClose}
                  onChange={handleTime}
                  required
                />
                {timeError && (
                  <div className="invalid-feedback mt-2">{timeError}</div>
                )}
              </div>

              <div className="mb-4 mt-4">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className={`form-control ${tagError ? "is-invalid" : ""}`}
                  value={tags}
                  onChange={handleTags}
                  required
                />
                {tagError && (
                  <div className="invalid-feedback mt-2">{tagError}</div>
                )}
              </div>

              <div className="text-center text-md-start mt-4">
                <button
                  className="btn btn-dark fw-semibold px-4 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle-fill me-2"></i>
                      Add Lead
                    </>
                  )}
                </button>

                {submitMsg && (
                  <p className="text-dark mt-3 fw-semibold">{submitMsg}</p>
                )}

                {submitError && (
                  <p className="text-danger mt-3 fw-semibold">{submitError}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLead;
