import { useState } from "react"
import { createTask } from "../api/tasks"

function TaskForm() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createTask({
      title,
      description
    })

    setTitle("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  )
}

export default TaskForm