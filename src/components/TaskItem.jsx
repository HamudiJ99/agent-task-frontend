import { deleteTask, completeTask } from "../api/tasks"

function TaskItem({ task, reload }) {

  const handleDelete = async () => {
    await deleteTask(task.id)
    reload()
  }

  const handleComplete = async () => {
    await completeTask(task.id)
    reload()
  }

  return (
    <div style={{
      border:"1px solid #ccc",
      padding:"10px",
      marginBottom:"10px",
      textDecoration: task.completed ? "line-through" : "none"
    }}>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <button onClick={handleComplete}>
        Complete
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}

export default TaskItem