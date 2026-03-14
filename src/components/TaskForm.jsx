import { useState } from "react"
import { createTask } from "../api/tasks"

function TaskForm() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setMessage("⚠️ Bitte einen Titel eingeben!")
      return
    }

    try {
      await createTask({
        title,
        description
      })

      setTitle("")
      setDescription("")
      setMessage("✅ Task erfolgreich hinzugefügt!")
      
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("❌ Fehler beim Hinzufügen!")
      console.error(error)
    }
  }

  return (
    <div style={{
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px"
    }}>
      <h2 style={{ marginTop: 0 }}>Neuen Task hinzufügen</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Task-Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        <textarea
          placeholder="Beschreibung (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
        >
          Task hinzufügen
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: message.includes("✅") ? "#e8f5e9" : "#fff3cd",
          color: message.includes("✅") ? "#2e7d32" : "#856404",
          borderRadius: "5px",
          textAlign: "center",
          fontWeight: "500"
        }}>
          {message}
        </div>
      )}
    </div>
  )
}

export default TaskForm