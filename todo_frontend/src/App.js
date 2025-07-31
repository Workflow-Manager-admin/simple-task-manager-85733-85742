import React, { useState, useEffect } from "react";
import "./design-system.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

// PUBLIC_INTERFACE
/**
 * Main App routing logic for a simple todo app.
 * Provides 3 states:
 *   - "list": main todo list with add, edit, toggle, delete
 *   - "add": add new todo form
 *   - "edit": edit an existing todo
 */
function App() {
  const [theme, setTheme] = useState("light");
  // State: screen can be "list"|"add"|"edit"
  const [screen, setScreen] = useState("list");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" style={{ minHeight: "100vh", background: "var(--color-ebebf5,#f8f9fa)" }}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      {screen === "list" && (
        <TodoList
          onAdd={() => setScreen("add")}
          onEdit={(todo) => {
            setEditingTodo(todo);
            setScreen("edit");
          }}
        />
      )}
      {screen === "add" && (
        <AddTodo
          onAdded={() => setScreen("list")}
          onBack={() => setScreen("list")}
        />
      )}
      {screen === "edit" && (
        <EditTodo
          todo={editingTodo}
          onUpdated={() => setScreen("list")}
          onBack={() => setScreen("list")}
        />
      )}
    </div>
  );
}

export default App;
