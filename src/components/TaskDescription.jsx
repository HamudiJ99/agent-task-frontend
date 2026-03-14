import { updateTask } from "../api/tasks"

function TaskDescription({ task, reload }) {
  
  const handleChecklistToggle = async (lineIndex) => {
    const lines = task.description.split('\n')
    const line = lines[lineIndex]
    
    // Toggle zwischen [ ] und [x]
    if (line.includes('[ ]')) {
      lines[lineIndex] = line.replace('[ ]', '[x]')
    } else if (line.includes('[x]')) {
      lines[lineIndex] = line.replace('[x]', '[ ]')
    }
    
    const updatedDescription = lines.join('\n')
    
    try {
      await updateTask(task.id, {
        title: task.title,
        description: updatedDescription,
        completed: task.completed
      })
      reload()
    } catch (error) {
      console.error("Fehler beim Update:", error)
      alert("Fehler! Hast du den updateTask Endpoint im Backend hinzugefügt?")
    }
  }

  const renderDescription = () => {
    if (!task.description) return null

    const lines = task.description.split('\n')
    
    return lines.map((line, index) => {
      // Prüfe ob es eine Checklist-Zeile ist
      const checkboxMatch = line.match(/^(\s*)\[([ x])\]\s*(.*)$/)
      
      if (checkboxMatch) {
        const [, indent, checked, text] = checkboxMatch
        const isChecked = checked === 'x'
        
        return (
          <div 
            key={index}
            onClick={() => !task.completed && handleChecklistToggle(index)}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px",
              marginBottom: "8px",
              paddingLeft: indent.length * 10 + "px",
              padding: "8px 12px",
              backgroundColor: isChecked ? "#e8f5e9" : "#f5f5f5",
              borderRadius: "6px",
              cursor: task.completed ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
          >
            <span style={{
              width: "22px",
              height: "22px",
              border: isChecked ? "none" : "2px solid #bbb",
              borderRadius: "4px",
              backgroundColor: isChecked ? "#4CAF50" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              flexShrink: 0
            }}>
              {isChecked && "✓"}
            </span>
            <span style={{
              textDecoration: isChecked ? "line-through" : "none",
              color: isChecked ? "#888" : "#333",
              flex: 1
            }}>
              {text}
            </span>
          </div>
        )
      }
      
      // Normale Textzeile (keine leeren Zeilen anzeigen)
      if (!line.trim()) return null
      
      return (
        <div key={index} style={{ marginBottom: "6px", color: "#666" }}>
          {line}
        </div>
      )
    })
  }

  return <div style={{ marginBottom: "12px" }}>{renderDescription()}</div>
}

export default TaskDescription
