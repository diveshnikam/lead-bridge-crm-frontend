import { useState } from "react";
import { Link } from "react-router-dom";

const AddAgent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [buttonState, setButtonState] = useState("idle");

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

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setNameError(validateName(val));
    setServerError("");
    setErrMsg("");
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(validateEmail(val));
    setServerError("");
    setErrMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nErr = validateName(name);
    const eErr = validateEmail(email);

    setNameError(nErr);
    setEmailError(eErr);
    setServerError("");
    setSuccessMsg("");

    if (nErr || eErr) {
      setErrMsg("Please fix the highlighted errors.");
      setTimeout(() => setErrMsg(""), 3000);
      return;
    }

    setButtonState("adding");

    fetch("https://lead-bridge-crm-backend.vercel.app/agents")
      .then((res) => res.json())
      .then((allAgents) => {
        const exists = allAgents.some(
          (a) => a.email.toLowerCase() === email.toLowerCase()
        );

        if (exists) {
          setServerError("Email already exists for another agent.");
          setButtonState("idle");
          setTimeout(() => setServerError(""), 3000);

          return;
        }

        const body = { name, email };

        fetch("https://lead-bridge-crm-backend.vercel.app/agents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.error) {
              setSuccessMsg("Agent added successfully!");
              setName("");
              setEmail("");
              setNameError("");
              setEmailError("");
              setServerError("");
              setErrMsg("");

              setTimeout(() => setSuccessMsg(""), 3000);
            } else {
              setServerError(data.error || "Failed to add agent.");
            }
          })
          .catch(() => {
            setServerError("Something went wrong. Please try again.");
          })
          .finally(() => {
            setButtonState("idle");
          });
      })
      .catch(() => {
        setServerError("Failed to verify email. Try again.");
        setButtonState("idle");
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="fw-bold text-center mt-5 mb-5">Add New Sales Agent</h1>
        <hr />
      </div>

      <div className="container-fluid px-3 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-3 mb-4 text-center text-md-start">
            <Link
              to="/agents"
              className="btn btn-white border lead-btn mb-4 mt-5   back-btn-agent"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </Link>
          </div>

         <div className="col-12 col-md-9 add-agent-form-wrapper">

            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-sm mt-5 add-agent-form"
              style={{ background: "white", maxWidth: "600px", width: "100%" }}
            >
              {serverError && (
                <div className="d-flex align-items-center text-dark fw-semibold mt-5 mb-5">
                  <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                  {serverError}
                </div>
              )}

              {successMsg && (
                <div
                  className="py-2 px-3 text-center rounded mb-3"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                  }}
                >
                  {successMsg}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">Agent Name</label>
                <input
                  type="text"
                  className={`form-control ${nameError ? "is-invalid" : ""}`}
                  placeholder="Enter agent name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  placeholder="Enter agent email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-white border lead-btn mt-4"
                style={{
                  padding: "6px 14px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  width: "150px",
                }}
                disabled={buttonState === "adding"}
              >
                {buttonState === "adding" ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding…
                  </>
                ) : (
                  "Add Agent"
                )}
              </button>
              {errMsg && (
                <div
                  className="py-2 px-3 text-center rounded mb-3 mt-3"
                  style={{
                    backgroundColor: "#fdecea",
                    color: "#b00020",
                    fontWeight: 500,
                    border: "1px solid #f5c2c7",
                  }}
                >
                  {errMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAgent;
