import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./design-system.css";

// Icons (minimal SVGs inline)
function EditIcon() {
  return (
    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#b3b7ee"/></svg>
  );
}
function TrashIcon() {
  return (
    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#b3b7ee"/></svg>
  );
}
function CheckIcon({ isCompleted }) {
  return (
    <svg width="20" height="20" fill="none">
      <circle cx="10" cy="10" r="8" stroke={isCompleted ? "#34c759" : "#d1d1d6"} strokeWidth="2"/>
    </svg>
  );
}
function FabIcon() {
  return (
    <svg viewBox="0 0 21 23" fill="none" width="21" height="23">
      <rect x="8" y="3" width="5" height="16" rx="2" fill="#fff"/>
      <rect x="3" y="9" width="15" height="5" rx="2" fill="#fff"/>
    </svg>
  );
}

const TABLE = "todos";

// PUBLIC_INTERFACE
export default function TodoList({ onEdit, onAdd }) {
  const [todos, setTodos] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch todos
  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: false });
    if (!error) setTodos(data);
    setLoading(false);
  };

  // Effect: initial load and live updates (realtime)
  useEffect(() => {
    fetchTodos();
    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLE },
        () => fetchTodos()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    await supabase.from(TABLE).delete().eq("id", id);
    fetchTodos();
  };

  const handleToggle = async (id, completed) => {
    await supabase.from(TABLE).update({ completed: !completed }).eq("id", id);
    fetchTodos();
  };

  const todosDisplayed = showAll ? todos : todos.filter(t => t.completed);

  return (
    <div className="todo-list-root">
      {/* AppBar */}
      <div className="appbar-container">
        <span className="appbar-title typo-appbar">TODO APP</span>
        <span style={{ marginLeft: "auto" }}>
          {/* Calendar Icon */}
          <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="6" fill="#9395d3"/></svg>
        </span>
      </div>

      <div className="todos-list" style={{ marginTop: "130px" }}>
        {loading && <div>Loading...</div>}
        {!loading && todosDisplayed.length === 0 && (
          <div className="todo-item">
            <div className="todo-texts">
              <div className="todo-title">No tasks</div>
            </div>
          </div>
        )}
        {!loading && todosDisplayed.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <div className="todo-texts">
              <div className="todo-title">{todo.title}</div>
              <div className="todo-subtitle">{todo.detail}</div>
            </div>
            <div className="todo-actions">
              <button aria-label="Edit" onClick={() => onEdit(todo)}>
                <EditIcon />
              </button>
              <button aria-label="Delete" onClick={() => handleDelete(todo.id)}>
                <TrashIcon />
              </button>
              <button 
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as completed"}
                onClick={() => handleToggle(todo.id, todo.completed)}
              >
                <CheckIcon isCompleted={todo.completed} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Floating Add Button */}
      <button className="fab" id="fab-btn" title="Add new task" onClick={() => onAdd()}>
        <FabIcon />
      </button>
      {/* NavigasiBar */}
      <nav className="navigasi-bar">
        <div className="nav-item" onClick={() => setShowAll(true)} style={showAll ? { color: "#9395d3" } : {}}>
          <span className="nav-icon">
            <svg width="24" height="24"><circle cx="12" cy="12" r="9" stroke="#9395d3" strokeWidth="2"/></svg>
          </span>
          <span className="nav-label typo-status-label">All</span>
        </div>
        <div className="nav-item" onClick={() => setShowAll(false)} style={!showAll ? { color: "#8b8787" } : {}}>
          <span className="nav-icon">
            <svg width="24" height="24"><circle cx="12" cy="12" r="9" stroke="#8b8787" strokeWidth="2"/></svg>
          </span>
          <span className="nav-label typo-status-label-secondary">Completed</span>
        </div>
      </nav>
    </div>
  );
}
