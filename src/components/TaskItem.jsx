import { useState, useRef, useEffect } from "react"
import { deleteTask, completeTask, uncompleteTask } from "../api/tasks"
import TaskDescription from "./TaskDescription"
import EditTaskDialog from "./EditTaskDialog"

function TaskItem({ task, reload }) {

  const [menuOpen, setMenuOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const menuRef = useRef(null)

  // Menü schließen bei Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDelete = async () => {
    setMenuOpen(false)
    if (window.confirm(`Task "${task.title}" wirklich löschen?`)) {
      await deleteTask(task.id)
      reload()
    }
  }

  const handleToggleComplete = async () => {
    try {
      if (task.completed) {
        await uncompleteTask(task.id)
      } else {
        await completeTask(task.id)
      }
      reload()
    } catch (error) {
      console.error("Fehler:", error)
    }
  }

  const handleArchive = async () => {
    setMenuOpen(false)
    try {
      await completeTask(task.id)
      reload()
    } catch (error) {
      console.error("Fehler:", error)
    }
  }

  const handleUnarchive = async () => {
    setMenuOpen(false)
    try {
      await uncompleteTask(task.id)
      reload()
    } catch (error) {
      console.error("Fehler:", error)
    }
  }

  const handleEdit = () => {
    setMenuOpen(false)
    setEditing(true)
  }

  const getDeadlineStatus = () => {
    if (!task.deadline || task.completed) return null
    
    const now = new Date()
    const deadline = new Date(task.deadline)
    const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return { text: "Überfällig", color: "#f44336", icon: "!" }
    } else if (diffDays === 0) {
      return { text: "Heute fällig", color: "#ff9800", icon: "◉" }
    } else if (diffDays <= 3) {
      return { text: `In ${diffDays} Tag${diffDays > 1 ? 'en' : ''}`, color: "#ff9800", icon: "◔" }
    }
    return { text: new Date(task.deadline).toLocaleDateString("de-DE"), color: "#666", icon: "○" }
  }

  const deadlineStatus = getDeadlineStatus()

  return (
    <>
      <div style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "15px",
        marginBottom: "12px",
        backgroundColor: task.completed ? "var(--muted)" : "var(--card)",
        boxShadow: "var(--shadow-sm)",
        transition: "all 0.2s",
        opacity: task.completed ? 0.85 : 1
      }}>
        <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
          
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            style={{ 
              marginTop: "4px",
              cursor: "pointer",
              width: "18px",
              height: "18px",
              accentColor: "var(--success)"
            }}
          />

          {/* Task-Inhalt */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              margin: "0 0 8px 0",
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "var(--muted-foreground)" : "var(--card-foreground)",
              fontSize: "16px",
              wordBreak: "break-word"
            }}>
              {task.title}
            </h3>

            {task.description && (
              <TaskDescription task={task} reload={reload} />
            )}

            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
              <small style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>
                {new Date(task.createdAt).toLocaleString("de-DE")}
              </small>
              
              {deadlineStatus && (
                <span style={{
                  fontSize: "12px",
                  color: deadlineStatus.color,
                  fontWeight: "600",
                  padding: "3px 8px",
                  backgroundColor: deadlineStatus.color + "15",
                  borderRadius: "4px"
                }}>
                  {deadlineStatus.icon} {deadlineStatus.text}
                </span>
              )}
            </div>
          </div>

          {/* 3-Punkte-Menü */}
          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
                fontSize: "22px",
                color: "var(--muted-foreground)",
                borderRadius: "4px",
                lineHeight: 1
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "var(--muted)"}
              onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
              ⋮
            </button>

            {menuOpen && (
              <div style={{
                position: "absolute",
                right: 0,
                top: "100%",
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                zIndex: 100,
                minWidth: "180px",
                overflow: "hidden"
              }}>
                <button
                  onClick={handleEdit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "var(--popover-foreground)",
                    textAlign: "left"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--muted)"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  Bearbeiten
                </button>

                {task.completed ? (
                  <button
                    onClick={handleUnarchive}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "var(--primary)",
                      textAlign: "left"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--muted)"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Wiederherstellen
                  </button>
                ) : (
                  <button
                    onClick={handleArchive}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "var(--warning)",
                      textAlign: "left"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--muted)"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Archivieren
                  </button>
                )}

                <div style={{ borderTop: "1px solid var(--border)" }} />

                <button
                  onClick={handleDelete}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "var(--destructive)",
                    textAlign: "left"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--muted)"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  Löschen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <EditTaskDialog
          task={task}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); reload() }}
        />
      )}
    </>
  )
}

export default TaskItem