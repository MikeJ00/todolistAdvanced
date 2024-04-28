import React, {useRef, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksProps = {
  id: string
  title: string
  isDone: boolean
  date?: string
}
export type FilterValues = 'all' | 'active' | 'completed'

function App() {

  const [tasks, setTasks] = useState<Array<TasksProps>>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
  ])
  const [filter, setFilter] = useState<FilterValues>("all")

  let tasksForTodolist = tasks
  if (filter === "active") {
    tasksForTodolist = tasks.filter(el => !el.isDone)
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(el => el.isDone)
  }
  const changeFilter = (filter: FilterValues) => {
    console.log(filter)
    setFilter(filter)
  }
  const addTasks = (title:string) => {
    const newTask =
      {
        id: v1(),
        title: title,
        isDone: true
      }
    const newTasks = [newTask,...tasks]
    setTasks(newTasks)
  }

  const removeTask = (taskId: string) => {
    let filtredTasks = tasks.filter(task => {
      console.log(tasks)
      return task.id !== taskId
    })
    setTasks(filtredTasks)
    console.log(filtredTasks)
  }
  return (
    <div className="App">
      <Todolist
        title={"what to learn"}
        tasks={tasksForTodolist}
        removeTaskCb={removeTask}
        changeFilterCB={changeFilter}
        addTaskCB={addTasks}
      />
    </div>
  );
}

export default App;
