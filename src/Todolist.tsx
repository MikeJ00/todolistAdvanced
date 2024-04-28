import React, {ChangeEvent, KeyboardEvent, Fragment, useRef, useState} from 'react';
import {FilterValues, TasksProps} from "./App";
import {Button} from "./Button";

type Props = {
  title: string
  tasks: Array<TasksProps>
  removeTaskCb: (taskId: string) => void
  changeFilterCB: (filter: FilterValues) => void
  addTaskCB: (title: string) => void
}

export const Todolist = ({title, tasks, removeTaskCb, changeFilterCB, addTaskCB}: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const addTaskHandler = () => {
    addTaskCB(taskTitle)
    setTaskTitle("")
  }
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
        <input value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyUp={addTaskOnKeyUpHandler}/>
        <Button title={"+"}
                onClick={addTaskHandler}/>
      </div>
      {tasks.length === 0 ? (
        <p>Tasks not display</p>
      ) : (
        <ul>
          {tasks.map((el) => {
            const removeTaskHandler = () => {
              removeTaskCb(el.id)
            }
            return (
              <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <Button title={"X"}
                        onClick={removeTaskHandler}/>
              </li>
            )
          })}
        </ul>
      )}
      <>
        <Button title={"All"} onClick={changeFilterHandlerCreator("all")}/>
        <Button title={"Active"} onClick={changeFilterHandlerCreator("active")}/>
        <Button title={"Completed"} onClick={changeFilterHandlerCreator("completed")}/>
      </>
    </div>
  );
};