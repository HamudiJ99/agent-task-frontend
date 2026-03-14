import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import TaskItem from "./TaskItem"

function TaskList() {

  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("offen") // "offen" oder "archiv"
  const [sortBy, setSortBy] = useState("newest") // "newest", "oldest", "alpha"

  const loadTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
      setError(null)
    } catch (err) {
      console.error("Fehler beim Laden der Tasks:", err)
      setError(err.message)
    }
  }

  useEffect(() => {
    loadTasks()
    const interval = setInterval(loadTasks, 2000)
    return () => clearInterval(interval)
  }, [])

  const openTasks = tasks.filter(t => !t.completed)
  const archivedTasks = tasks.filter(t => t.completed)

  const sortTasks = (list) => {
    const sorted = [...list]
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      case "alpha":
        return sorted.sort((a, b) => a.title.localeCompare(b.title, "de"))
      default:
        return sorted
    }
  }

  const currentTasks = sortTasks(activeTab === "offen" ? openTasks : archivedTasks)

  const tabStyle = (tab) => ({
    flex: 1,
    padding: "12px",
    border: "none",
    backgroundColor: activeTab === tab ? "#fff" : "transparent",
    color: activeTab === tab ? "#333" : "#888",
    fontWeight: activeTab === tab ? "600" : "400",
    fontSize: "15px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s",
    boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
  })

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "15px" }}>Meine Tasks ({tasks.length})</h2>
      
      {error && (
        <div style={{
          padding: "15px",
          backgroundColor: "#ffebee",
          color: "#c62828",
          borderRadius: "5px",
          marginBottom: "15px"
        }}>
          ❌ Fehler: {error}
          <br />
          <small>Überprüfe die Browser-Konsole (F12) für Details.</small>
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "4px",
        backgroundColor: "#f0f0f0",
        padding: "4px",
        borderRadius: "10px",
        marginBottom: "15px"
      }}>
        <button style={tabStyle("offen")} onClick={() => setActiveTab("offen")}>
          Offen ({openTasks.length})
        </button>
        <button style={tabStyle("archiv")} onClick={() => setActiveTab("archiv")}>
          Archiv ({archivedTasks.length})
        </button>
      </div>

      {/* Filter */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "15px"
      }}>
        <span style={{ color: "#888", fontSize: "14px" }}>Sortieren:</span>
        {[
          { key: "newest", label: "Neueste" },
          { key: "oldest", label: "Älteste" },
          { key: "alpha", label: "A–Z" }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            style={{
              padding: "6px 14px",
              border: sortBy === key ? "1px solid #1976d2" : "1px solid #ddd",
              borderRadius: "20px",
              backgroundColor: sortBy === key ? "#e3f2fd" : "#fff",
              color: sortBy === key ? "#1976d2" : "#666",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: sortBy === key ? "600" : "400",
              transition: "all 0.2s"
            }}
          >
            {label}
          </button>
        ))}
      </div>
      
      {currentTasks.length === 0 ? (
        <p style={{ color: "#999", fontStyle: "italic", textAlign: "center", padding: "30px 0" }}>
          {activeTab === "offen"
            ? "Keine offenen Tasks. Füge oben einen neuen hinzu!"
            : "Noch keine erledigten Tasks."}
        </p>
      ) : (
        <div>
          {currentTasks.map(task => (
            <TaskItem key={task.id} task={task} reload={loadTasks}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList