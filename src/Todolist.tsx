import React, {Fragment, useRef, useState} from 'react';
import {FilterValues, TasksProps} from "./App";
import {Button} from "./Button";

type Props = {
  title: string
  tasks: Array<TasksProps>
  removeTaskCb: (taskId: string) => void
  changeFilterCB:(filter:FilterValues)=>void
  addTaskCB:(title:string)=>void
}

export const Todolist = ({title, tasks, removeTaskCb,changeFilterCB,addTaskCB}: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={inputRef}/>
        <Button title={"+"} onClick={()=>{
          if(inputRef.current){
            addTaskCB(inputRef.current.value)
          }
        }}/>
      </div>
      {tasks.length === 0 ? (
        <p>Tasks not display</p>
      ) : (
        <ul>
          {tasks.map((el) => {
            return (
              <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <Button title={"X"}
                        onClick={() => removeTaskCb(el.id)}/>
              </li>
            )
          })}
        </ul>
      )}
      <>
        <Button title={"All"} onClick={()=>changeFilterCB("all")}/>
        <Button title={"Active"} onClick={()=>changeFilterCB("active")}/>
        <Button title={"Completed"} onClick={()=>changeFilterCB("completed")}/>
      </>
    </div>
  );
};