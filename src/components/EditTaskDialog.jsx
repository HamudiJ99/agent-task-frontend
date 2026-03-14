import { useState } from "react"
import { updateTask } from "../api/tasks"

function EditTaskDialog({ task, onClose, onSaved }) {

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [deadline, setDeadline] = useState(task.deadline ? task.deadline.split('T')[0] : "")
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setSaving(true)
    try {
      const updateData = {
        title,
        description,
        deadline: deadline || null,
        completed: task.completed
      }
      
      console.log("Sende Update:", updateData)
      
      const response = await updateTask(task.id, updateData)
      
      console.log("Update Erfolgreich:", response.data)
      
      onSaved()
    } catch (error) {
      console.error("Fehler beim Speichern:", error)
      console.error("Error Response:", error.response?.data)
      alert("Fehler beim Speichern!")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "25px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", color: "#333" }}>
          Task bearbeiten
        </h2>

        <form onSubmit={handleSave}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#555" }}>
            Titel
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />

          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#555" }}>
            Beschreibung
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              fontFamily: "inherit",
              resize: "vertical",
              boxSizing: "border-box"
            }}
          />

          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#555" }}>
            Deadline (optional)
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 24px",
                backgroundColor: "#f5f5f5",
                color: "#666",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 24px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? "Speichern..." : "Speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskDialog
