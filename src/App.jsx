import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import ThemeToggle from "./ThemeToggle"
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <ThemeToggle />
        <h1>Agent Task </h1>
        <p>Verwalte deine Aufgaben einfach und übersichtlich</p>
      </header>

      <TaskForm />

      <TaskList />
    </div>
  )
}

export default App