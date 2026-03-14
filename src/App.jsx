import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"

function App() {
  return (
    <div style={{maxWidth:"600px", margin:"auto"}}>
      <h1>Task Manager</h1>

      <TaskForm />

      <TaskList />
    </div>
  )
}

export default App