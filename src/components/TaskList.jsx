import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import TaskItem from "./TaskItem"

function TaskList() {

  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  const loadTasks = async () => {
    try {
      console.log("Lade Tasks...")
      const res = await getTasks()
      console.log("Tasks geladen:", res.data)
      setTasks(res.data)
      setError(null)
    } catch (err) {
      console.error("Fehler beim Laden der Tasks:", err)
      setError(err.message)
    }
  }

  useEffect(() => {
    loadTasks()
    
    // Automatisch alle 2 Sekunden aktualisieren
    const interval = setInterval(loadTasks, 2000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Meine Tasks ({tasks.length})</h2>
      
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
      
      {tasks.length === 0 ? (
        <p style={{ color: "#999", fontStyle: "italic" }}>
          Noch keine Tasks vorhanden. Füge oben einen neuen Task hinzu!
        </p>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} reload={loadTasks}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList