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
      backgroundColor: "var(--card)",
      padding: "20px",
      borderRadius: "var(--radius)",
      marginBottom: "20px",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)"
    }}>
      <h2 style={{ marginTop: 0, color: "var(--card-foreground)" }}>Neuen Task hinzufügen</h2><br />
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Task-Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            fontSize: "16px",
            boxSizing: "border-box",
            backgroundColor: "var(--background)",
            color: "var(--foreground)"
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
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            fontSize: "16px",
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box",
            backgroundColor: "var(--background)",
            color: "var(--foreground)"
          }}
        />

        {/* Deadline */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "var(--muted-foreground)" }}>
            Deadline (optional)
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              fontSize: "16px",
              boxSizing: "border-box",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
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
            backgroundColor: showChecklist ? "var(--accent)" : "var(--background)",
            color: showChecklist ? "var(--accent-foreground)" : "var(--primary)",
            border: "2px dashed var(--primary)",
            borderRadius: "var(--radius)",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent-foreground)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = showChecklist ? "var(--accent)" : "var(--background)";
            e.currentTarget.style.color = showChecklist ? "var(--accent-foreground)" : "var(--primary)";
          }}
        >
          {showChecklist ? "Checkliste ausblenden" : "Checkliste hinzufügen"}
        </button>

        {/* Checkliste Bereich */}
        {showChecklist && (
          <div style={{
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "15px",
            marginBottom: "15px"
          }}>
            <div style={{ fontWeight: "500", marginBottom: "10px", color: "var(--foreground)" }}>
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
                  backgroundColor: "var(--muted)",
                  borderRadius: "var(--radius)",
                  marginBottom: "8px"
                }}
              >
                <span style={{ flex: 1, color: "var(--foreground)" }}>□ {item}</span>
                <button
                  type="button"
                  onClick={() => removeChecklistItem(index)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "var(--destructive)",
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
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  fontSize: "15px",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)"
                }}
              />
              <button
                type="button"
                onClick={addChecklistItem}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  fontSize: "20px",
                  cursor: "pointer",
                  minWidth: "50px",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
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
            backgroundColor: "var(--success)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "var(--radius)",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "var(--shadow-md)",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.75";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          ✓ Task hinzufügen
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: message.includes("✓") ? "var(--success)" : "var(--warning)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius)",
          textAlign: "center",
          fontWeight: "500",
          boxShadow: "var(--shadow-sm)"
        }}>
          {message}
        </div>
      )}
    </div>
  )
}

export default TaskForm