import { FormEvent, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function generateId(): number {
    const id = Math.floor(Math.random() * 1000) + 1
    const isDuplicateId = tasks.find( task => task.id === id)
    return isDuplicateId ? generateId() : id
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    newTaskTitle && setTasks( () => [
      ...tasks, {
      id: generateId(),
      title: newTaskTitle,
      isComplete: false
    }])

    setNewTaskTitle("")
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = [...tasks]
    const task = newTasks.find( task => task.id === id)
    if(task) task.isComplete = !task.isComplete
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const filterTasks = tasks.filter( task => task.id !== id)
    setTasks( () => filterTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <form className="input-group" onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button">
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </form>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}