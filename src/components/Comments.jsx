import { data } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Comments = ({ id, agent }) => {
  const [comment, setComment] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [postError, setPostError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="text-secondary text-center mt-5">Loading Comments...</div>
    );
  }

  const { loading, error, leadData } = useFetch(
    `https://lead-bridge-crm-backend.vercel.app/leads/comments/${id}`,
    refresh
  );

  const comments = Array.isArray(leadData?.data)
    ? leadData.data
    : Array.isArray(leadData)
    ? leadData
    : [];

  const postComent = () => {
    if (!comment.trim()) {
      setPostError("Comment cannot be blank.");
      setSuccessMsg("");
      setTimeout(() => setPostError(""), 3000);
      return;
    }

    setIsPosting(true);
    setPostError("");
    setSuccessMsg("");

    try {
      fetch(`https://lead-bridge-crm-backend.vercel.app/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentText: comment,
          author: agent,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMsg("Comment added successfully!");
            setComment("");
            setRefresh((prev) => !prev);

            setTimeout(() => setSuccessMsg(""), 3000);
          } else {
            setPostError("Failed to add comment");
          }

          setIsPosting(false);
        });
    } catch (error) {
      setPostError("Error posting comment.");
    }
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return (
      date.toLocaleDateString("en-GB") +
      " • " +
      date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const deleteComment = (commentId) => {
    setDeletingId(commentId);
    setDeleteMsg("");

    fetch(`https://lead-bridge-crm-backend.vercel.app/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDeleteMsg("Comment deleted successfully!");
          setRefresh((prev) => !prev);
          setTimeout(() => setDeleteMsg(""), 3000);
        } else {
          setDeleteMsg("Failed to delete comment.");
        }
        setDeletingId(null);
      })
      .catch(() => {
        setDeleteMsg("Error deleting comment.");
        setDeletingId(null);
      });
  };

  const saveEdit = (commentId) => {
    if (!editText.trim()) {
      setPostError("Comment cannot be blank.");
      setSuccessMsg("");
      setTimeout(() => setPostError(""), 3000);
      return;
    }

    setSavingEdit(true);
    setSuccessMsg("");
    setPostError("");

    fetch(
      `https://lead-bridge-crm-backend.vercel.app/comments/update/${commentId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText: editText }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessMsg("Comment updated successfully!");

          setEditId(null);
          setEditText("");

          setRefresh((prev) => !prev);

          setTimeout(() => setSuccessMsg(""), 3000);
        } else {
          setPostError("Failed to update comment.");
          setTimeout(() => setPostError(""), 3000);
        }

        setSavingEdit(false);
      })
      .catch(() => {
        setPostError("Error updating comment.");
        setTimeout(() => setPostError(""), 3000);
        setSavingEdit(false);
      });
  };

  return (
    <>
      <h3 className="mt-5 mb-4 fw-bold">Comments:</h3>

      <div className="mt-5">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
          rows={4}
          placeholder="Write a comment..."
        ></textarea>
      </div>

      <button
        className="btn btn-white lead-btn mt-4 mb-5 border"
        onClick={postComent}
        disabled={isPosting}
      >
        {isPosting ? "Adding..." : "Add Comment"}
      </button>

      {successMsg && (
        <div className="text-dark fw-semibold mt-3 mb-5">{successMsg}</div>
      )}

      {deleteMsg && (
        <div className="text-dark fw-semibold mt-3 mb-5">{deleteMsg}</div>
      )}

      {postError && (
        <div className="text-dark fw-semibold  mb-5">{postError}</div>
      )}

      {loading && !error && (
        <div className="mt-5 d-flex justify-content-center mb-5">
          <div
            className="spinner-border text-dark"
            style={{ width: "2.5rem", height: "2.5rem" }}
            role="status"
          ></div>
        </div>
      )}

      {error && !loading && (
        <div className="text-danger fw-semibold mt-5 fs-5">
          <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
          {error}
        </div>
      )}

      {!loading && !error && comments.length === 0 && (
        <div className="text-secondary fw-semibold mt-0 mb-5 fs-5">
          <i className="bi bi-emoji-frown fs-4 me-3"></i>
          No Comments Yet...
        </div>
      )}

      {[...comments].reverse().map((c, i) => (
        <div
          key={i}
          className="p-3 mb-5 border bg-body-tertiary rounded shadow-sm"
          style={{ borderLeft: "4px solid #222" }}
        >
          <div className="d-flex justify-content-between">
            <p
              className="mb-1 fw-semibold"
              style={{
                color: "black",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() => {
                if (c.author?._id) navigate(`/agent/details/${c.author._id}`);
              }}
            >
              <i className="bi bi-person-fill me-2"></i>
              {c.author?.name || "Unknown User"}
            </p>

            <small className="text-muted">{formatDate(c.createdAt)}</small>
          </div>

          {editId === c._id ? (
            <>
              <textarea
                className="form-control mt-3"
                rows={3}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              ></textarea>

              <button
                className="btn btn-success btn-sm mt-3 me-2"
                onClick={() => saveEdit(c._id)}
                disabled={savingEdit}
              >
                {savingEdit ? "Saving..." : "Save"}
              </button>

              <button
                className="btn btn-secondary btn-sm mt-3"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>

              {postError && (
                <div className="text-dark fw-semibold  mt-5">{postError}</div>
              )}
            </>
          ) : (
            <>
              <div className="mt-2">
                <p className="mb-3 mt-3 text-start">{c.commentText}</p>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => {
                    setEditId(c._id);
                    setEditText(c.commentText);
                  }}
                >
                  <i className="bi bi-pencil-fill me-1"></i>Edit
                </button>

                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => deleteComment(c._id)}
                  disabled={deletingId === c._id}
                >
                  <i className="bi bi-trash-fill me-1"></i>
                  {deletingId === c._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Comments;
