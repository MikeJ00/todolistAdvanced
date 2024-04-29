import React, {ChangeEvent, KeyboardEvent, Fragment, useRef, useState} from 'react';
import {FilterValues, TasksProps} from "./App";
import {Button} from "./Button";
import {log} from "util";

type Props = {
  filter:string
  title: string
  tasks: Array<TasksProps>
  removeTaskCb: (taskId: string) => void
  changeFilterCB: (filter: FilterValues) => void
  addTaskCB: (title: string) => void
  changeTaskStatusCb: (taskId: string, taskStatus: boolean) => void
}

export const Todolist = ({title, tasks, removeTaskCb, changeFilterCB, addTaskCB, changeTaskStatusCb,filter}: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const addTaskHandler = () => {
    setError(null)
    if (taskTitle.trim() !== "") {
      addTaskCB(taskTitle.trim())
      setTaskTitle("")
    } else {
      setError("title is required")
    }
  }
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }

  const changeFilterHandlerCreator = (filer: FilterValues) => {
    return () => {
      changeFilterCB(filer)
    }
  }
  // const changeFilterHandlerCreator = (filer: FilterValues) => () => {changeFilterCB(filer)}
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input className={error ? "error" : ""}
               value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyUp={addTaskOnKeyUpHandler}/>
        <Button title={"+"}
                onClick={addTaskHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Tasks not display</p>
      ) : (
        <ul>
          {tasks.map((el) => {
            const removeTaskHandler = () => {
              removeTaskCb(el.id)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatusCb(el.id, newStatusValue)
            }
            return (
              <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={changeTaskStatusHandler}/>
                <span>{el.title}</span>
                <Button title={"X"}
                        onClick={removeTaskHandler}/>
              </li>
            )
          })}
        </ul>
      )}
      <>
        <Button className={filter === 'all' ? 'active-filter' : ''}
                title={"All"}
                onClick={changeFilterHandlerCreator("all")}/>
        <Button className={filter === 'active' ? 'active-filter' : ''}
                title={"Active"}
                onClick={changeFilterHandlerCreator("active")}/>
        <Button className={filter === 'completed' ? 'active-filter' : ''}
                title={"Completed"}
                onClick={changeFilterHandlerCreator("completed")}/>
      </>
    </div>
  );
};