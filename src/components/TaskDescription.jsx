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
              backgroundColor: isChecked ? "var(--accent)" : "var(--muted)",
              borderRadius: "var(--radius)",
              cursor: task.completed ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              border: "1px solid var(--border)"
            }}
          >
            <span style={{
              width: "22px",
              height: "22px",
              border: isChecked ? "none" : "2px solid var(--border)",
              borderRadius: "4px",
              backgroundColor: isChecked ? "var(--success)" : "var(--background)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-foreground)",
              fontSize: "14px",
              fontWeight: "bold",
              flexShrink: 0
            }}>
              {isChecked && "✓"}
            </span>
            <span style={{
              textDecoration: isChecked ? "line-through" : "none",
              color: isChecked ? "var(--accent-foreground)" : "var(--foreground)",
              flex: 1,
              fontWeight: isChecked ? "500" : "400"
            }}>
              {text}
            </span>
          </div>
        )
      }
      
      // Normale Textzeile (keine leeren Zeilen anzeigen)
      if (!line.trim()) return null
      
      return (
        <div key={index} style={{ marginBottom: "6px", color: "var(--muted-foreground)" }}>
          {line}
        </div>
      )
    })
  }

  return <div style={{ marginBottom: "12px" }}>{renderDescription()}</div>
}

export default TaskDescription
