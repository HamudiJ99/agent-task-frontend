import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import TaskItem from "./TaskItem"

function TaskList() {

  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const res = await getTasks()
    setTasks(res.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} reload={loadTasks}/>
      ))}
    </div>
  )
}

export default TaskList