import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Verwalte deine Aufgaben einfach und übersichtlich</p>
      </header>

      <TaskForm />

      <TaskList />
    </div>
  )
}

export default App