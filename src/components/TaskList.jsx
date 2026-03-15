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
    backgroundColor: activeTab === tab ? "var(--card)" : "transparent",
    color: activeTab === tab ? "var(--foreground)" : "var(--muted-foreground)",
    fontWeight: activeTab === tab ? "600" : "400",
    fontSize: "15px",
    cursor: "pointer",
    borderRadius: "var(--radius)",
    transition: "all 0.2s",
    boxShadow: activeTab === tab ? "var(--shadow-sm)" : "none"
  })

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "15px", color: "var(--foreground)" }}>Meine Tasks ({tasks.length})</h2>
      
      {error && (
        <div style={{
          padding: "15px",
          backgroundColor: "var(--destructive)",
          color: "var(--destructive-foreground)",
          borderRadius: "var(--radius)",
          marginBottom: "15px",
          boxShadow: "var(--shadow-sm)"
        }}>
          ✗ Fehler: {error}
          <br />
          <small>Überprüfe die Browser-Konsole (F12) für Details.</small>
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "4px",
        backgroundColor: "var(--muted)",
        padding: "4px",
        borderRadius: "var(--radius)",
        marginBottom: "15px"
      }}>
        <button 
          style={tabStyle("offen")} 
          onClick={() => setActiveTab("offen")}
          onMouseOver={(e) => {
            if (activeTab !== "offen") {
              e.currentTarget.style.backgroundColor = "var(--accent)";
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== "offen") {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          Offen ({openTasks.length})
        </button>
        <button 
          style={tabStyle("archiv")} 
          onClick={() => setActiveTab("archiv")}
        >
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
        <span style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>Sortieren:</span>
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
              border: sortBy === key ? "1px solid var(--primary)" : "1px solid var(--border)",
              borderRadius: "20px",
              backgroundColor: sortBy === key ? "var(--accent)" : "var(--card)",
              color: sortBy === key ? "var(--accent-foreground)" : "var(--muted-foreground)",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: sortBy === key ? "600" : "400",
              transition: "all 0.2s",
              boxShadow: sortBy === key ? "var(--shadow-sm)" : "none"
            }}
            onMouseOver={(e) => {
              if (sortBy !== key) {
                e.currentTarget.style.backgroundColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent-foreground)";
              }
            }}
            onMouseOut={(e) => {
              if (sortBy !== key) {
                e.currentTarget.style.backgroundColor = "var(--card)";
                e.currentTarget.style.color = "var(--muted-foreground)";
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      
      {currentTasks.length === 0 ? (
        <p style={{ color: "var(--muted-foreground)", fontStyle: "italic", textAlign: "center", padding: "30px 0" }}>
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