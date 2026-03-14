import { useState } from "react"
import { createTask } from "../api/tasks"

function TaskForm() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [checklistItems, setChecklistItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [message, setMessage] = useState("")
  const [showChecklist, setShowChecklist] = useState(false)

  const addChecklistItem = () => {
    if (newItem.trim()) {
      setChecklistItems([...checklistItems, newItem.trim()])
      setNewItem("")
    }
  }

  const removeChecklistItem = (index) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addChecklistItem()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setMessage("⚠ Bitte einen Titel eingeben!")
      return
    }

    // Beschreibung zusammenbauen
    let fullDescription = description
    if (checklistItems.length > 0) {
      const checklistText = checklistItems.map(item => `[ ] ${item}`).join('\n')
      fullDescription = description 
        ? `${description}\n\n${checklistText}` 
        : checklistText
    }

    try {
      await createTask({
        title,
        description: fullDescription,
        deadline: deadline || null
      })

      setTitle("")
      setDescription("")
      setDeadline("")
      setChecklistItems([])
      setShowChecklist(false)
      setMessage("✓ Task erfolgreich hinzugefügt!")
      
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("✗ Fehler beim Hinzufügen!")
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

        {/* Deadline */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
            Deadline (optional)
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Checkliste Toggle Button */}
        <button
          type="button"
          onClick={() => setShowChecklist(!showChecklist)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: showChecklist ? "#e3f2fd" : "#fff",
            color: "#1976d2",
            border: "2px dashed #1976d2",
            borderRadius: "5px",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          {showChecklist ? "Checkliste ausblenden" : "Checkliste hinzufügen"}
        </button>

        {/* Checkliste Bereich */}
        {showChecklist && (
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px"
          }}>
            <div style={{ fontWeight: "500", marginBottom: "10px", color: "#333" }}>
              Checkliste
            </div>

            {/* Vorhandene Items */}
            {checklistItems.map((item, index) => (
              <div 
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                  marginBottom: "8px"
                }}
              >
                <span style={{ flex: 1 }}>□ {item}</span>
                <button
                  type="button"
                  onClick={() => removeChecklistItem(index)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#f44336",
                    cursor: "pointer",
                    fontSize: "18px",
                    padding: "0 5px"
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Neues Item hinzufügen */}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <input
                placeholder="Neuer Eintrag..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "15px"
                }}
              />
              <button
                type="button"
                onClick={addChecklistItem}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "20px",
                  cursor: "pointer",
                  minWidth: "50px"
                }}
              >
                +
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          ✓ Task hinzufügen
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