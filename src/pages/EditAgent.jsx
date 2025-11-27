import { useParams, Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useState, useEffect } from "react";

const EditAgent = () => {
  const { id } = useParams();

  const { loading, error, leadData } = useFetch(
    "https://lead-bridge-crm-backend.vercel.app/agents"
  );

  const agent = Array.isArray(leadData)
    ? leadData.find((a) => a._id === id)
    : null;

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [submitMsg, setSubmitMsg] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (agent) {
      setName(agent.name || "");
      setEmail(agent.email || "");
    }
  }, [agent]);

  const validateName = (value) => {
    if (!value.trim()) return "Name is required.";
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(value)) return "Only letters and spaces allowed.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required.";

    const emailRegex =
      /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*\.(com|co|uk|in|org|net|io|co\.uk|co\.in)$/;

    if (!emailRegex.test(value)) return "Enter a valid email address.";

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nErr = validateName(name);
    const eErr = validateEmail(email);

    setNameError(nErr);
    setEmailError(eErr);

    if (nErr || eErr) {
      setSubmitError("Please correct all errors before submitting.");
      setTimeout(() => setSubmitError(""), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMsg("");
    setSubmitError("");

    fetch("https://lead-bridge-crm-backend.vercel.app/agents")
      .then((res) => res.json())
      .then((agents) => {
        const exists = agents.some(
          (a) => a.email.toLowerCase() === email.toLowerCase() && a._id !== id
        );

        if (exists) {
          setSubmitError("This email is already used by another agent.");
          setIsSubmitting(false);
          return;
        }

        const body = {
          name: name.trim(),
          email: email.trim(),
        };

        fetch(`https://lead-bridge-crm-backend.vercel.app/agents/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Agent updated successfully.") {
              setSubmitMsg("Agent updated successfully!");
              setTimeout(() => setSubmitMsg(""), 3000);
            } else {
              setSubmitError(data.message || "Failed to update agent");
            }
          })
          .catch(() => {
            setSubmitError("Something went wrong!");
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      })
      .catch(() => {
        setSubmitError("Failed to check email. Try again.");
        setIsSubmitting(false);
      });
  };

  if (loading)
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

  if (error)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <i className="bi bi-exclamation-triangle-fill fs-1 mb-3"></i>
          <h4 className="fw-semibold">{error}</h4>
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
          <i className="bi bi-person-x fs-1 mb-3"></i>
          <h4 className="fw-semibold">Agent Not Found</h4>
        </div>
      </div>
    );

  return (
    <div
      className="container edit-agent-container"
      style={{ marginTop: "9.5rem" }}
    >
      <div className="row">
        {/* LEFT BUTTON COLUMN */}
        <div className="col-12 col-md-3">
          <Link
            to={`/agent/details/${id}`}
            className="btn btn-white border lead-btn mb-5 mt-2 edit-agent-back-btn"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Agent Details
          </Link>
        </div>

        {/* RIGHT SIDE TITLE + FORM */}
        <div className="col-12 col-md-9">
          <h1 className="fw-bold edit-agent-title">Edit Agent</h1>

          <form
            className="border p-4 rounded shadow-sm mt-5 edit-agent-form"
            style={{ maxWidth: "650px" }}
            onSubmit={handleSubmit}
          >
            {/* NAME */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Agent Name:</label>
              <input
                type="text"
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(validateName(e.target.value));
                }}
              />
              {nameError && (
                <div className="invalid-feedback mt-2">{nameError}</div>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Email:</label>
              <input
                type="text"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
              />
              {emailError && (
                <div className="invalid-feedback mt-2">{emailError}</div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-dark fw-semibold px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Save Changes
                </>
              )}
            </button>

            {submitMsg && (
              <p className="text-dark mt-3 fw-semibold">{submitMsg}</p>
            )}
            {submitError && (
              <p className="text-danger mt-3 fw-semibold">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;
