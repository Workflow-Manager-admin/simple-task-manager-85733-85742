import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./design-system.css";

// PUBLIC_INTERFACE
export default function AddTodo({ onAdded, onBack }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  /**
   * Handles todo creation form submission.
   * On success, resets form and notifies parent.
   * Handles and displays errors.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !detail.trim()) return;

    setLoading(true);
    try {
      // Insert the todo; Supabase wants array of objects for .insert
      const { error } = await supabase
        .from("todos")
        .insert([{ title, detail, completed: false }]);
      if (error) {
        // Show error to user (alert for simplicity; could use in-UI notice)
        alert("Failed to add todo: " + error.message);
      } else {
        setTitle("");
        setDetail("");
        onAdded && onAdded();
      }
    } catch (err) {
      alert("Unexpected error: " + (err.message || err));
    }
    setLoading(false);
  };

  return (
    <>
      <div className="statusbar" />
      <div className="appbar-container">
        <button className="back-btn" aria-label="Back" type="button" onClick={onBack}>
          <svg width="25" height="25"><polyline points="20,2 5,12 20,22" stroke="#fff" strokeWidth="3" fill="none"/></svg>
        </button>
        <span className="appbar-title typo-add-heading">Add Task</span>
      </div>
      <form className="add-form-container" onSubmit={handleSubmit} style={{ marginBottom: "56px" }}>
        <div className="text-input-wrapper">
          <label className="text-input-label" htmlFor="todo-title">Title</label>
          <input type="text" id="todo-title" className="text-input" required
            placeholder="Enter task title"
            value={title} onChange={e => setTitle(e.target.value)} autoFocus />
        </div>
        <div className="text-input-wrapper">
          <label className="text-input-label" htmlFor="todo-detail">Detail</label>
          <input type="text" id="todo-detail" className="text-input" required
            placeholder="Enter task detail"
            value={detail} onChange={e => setDetail(e.target.value)} />
        </div>
        <button className="add-btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </>
  );
}
