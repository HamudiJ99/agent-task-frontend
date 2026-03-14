import { deleteTask, completeTask } from "../api/tasks"

function TaskItem({ task, reload }) {

  const handleDelete = async () => {
    await deleteTask(task.id)
    reload()
  }

  const handleComplete = async () => {
    await completeTask(task.id)
    reload()
  }

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "12px",
      backgroundColor: task.completed ? "#e8f5e9" : "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      transition: "all 0.2s"
    }}>
      <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
        
        {/* Checkbox zum als erledigt markieren */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleComplete}
          disabled={task.completed}
          style={{ 
            marginTop: "4px",
            cursor: task.completed ? "not-allowed" : "pointer",
            width: "18px",
            height: "18px"
          }}
        />

        {/* Task-Inhalt */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: "0 0 8px 0",
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#666" : "#333"
          }}>
            {task.title}
          </h3>

          <p style={{
            margin: "0 0 8px 0",
            color: "#666",
            textDecoration: task.completed ? "line-through" : "none"
          }}>
            {task.description}
          </p>

          <small style={{ 
            color: "#999",
            fontSize: "12px"
          }}>
            Erstellt: {new Date(task.createdAt).toLocaleString("de-DE")}
          </small>
        </div>

        {/* Löschen-Button */}
        <button
          onClick={handleDelete}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
        >
          Löschen
        </button>
      </div>
    </div>
  )
}

export default TaskItem