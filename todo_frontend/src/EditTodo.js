import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./../assets/design-system.css";

// PUBLIC_INTERFACE
export default function EditTodo({ todo, onUpdated, onBack }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [detail, setDetail] = useState(todo?.detail || "");
  const [loading, setLoading] = useState(false);

  if (!todo) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !detail.trim()) return;
    setLoading(true);
    await supabase.from("todos")
      .update({ title, detail })
      .eq("id", todo.id);
    setLoading(false);
    onUpdated && onUpdated();
  };

  return (
    <>
      <div className="statusbar" />
      <div className="appbar-container">
        <button className="back-btn" aria-label="Back" type="button" onClick={onBack}>
          <svg width="25" height="25"><polyline points="20,2 5,12 20,22" stroke="#fff" strokeWidth="3" fill="none"/></svg>
        </button>
        <span className="appbar-title typo-add-heading">Edit Task</span>
      </div>
      <form className="add-form-container" onSubmit={handleSubmit} style={{ marginBottom: "56px" }}>
        <div className="text-input-wrapper">
          <label className="text-input-label" htmlFor="edit-title">Title</label>
          <input type="text" id="edit-title" className="text-input" required
            value={title} onChange={e => setTitle(e.target.value)} autoFocus
            placeholder="Enter task title" />
        </div>
        <div className="text-input-wrapper">
          <label className="text-input-label" htmlFor="edit-detail">Detail</label>
          <input type="text" id="edit-detail" className="text-input" required
            value={detail} onChange={e => setDetail(e.target.value)}
            placeholder="Enter task detail" />
        </div>
        <button className="update-btn" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
        <button className="cancel-btn" type="button" onClick={onBack} style={{marginTop:8}}>Cancel</button>
      </form>
    </>
  );
}
