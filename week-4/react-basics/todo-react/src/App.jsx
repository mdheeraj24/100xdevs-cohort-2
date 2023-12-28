import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let globalId = 1;
  let todoState = [];
  let oldTodoState = [];

  function addTodoToDom(newTodo) {
    const newTodoTitle = document.createElement("div");
    newTodoTitle.innerText = newTodo.title;
    newTodoTitle.setAttribute("id", `Title-${newTodo.id}`);

    const newTodoDescription = document.createElement("div");
    newTodoDescription.innerText = newTodo.description;
    newTodoDescription.setAttribute("id", `Description-${newTodo.id}`);

    const newTodoBtn = document.createElement("button");
    newTodoBtn.innerText = "Remove";
    newTodoBtn.onclick = () => removeTodo(newTodo.id);

    const newTodoDiv = document.createElement("div");
    newTodoDiv.setAttribute("id", `Div-${newTodo.id}`);
    newTodoDiv.appendChild(newTodoTitle);
    newTodoDiv.appendChild(newTodoDescription);
    newTodoDiv.appendChild(newTodoBtn);

    const todoContainer = document.getElementById("todos");
    todoContainer.appendChild(newTodoDiv);
  }

  function removeTodoFromDom(todo) {
    const todoContainer = document.getElementById("todos");
    const toDeleteDiv = document.getElementById(`Div-${todo.id}`);
    todoContainer.removeChild(toDeleteDiv);
  }

  function updateTodoInDom(oldTodo, newTodo) {
    if (oldTodo.title !== newTodo.title) {
      document.getElementById(`Title-${oldTodo.id}`).innerText = newTodo.title;
    }
    if (oldTodo.description !== newTodo.description) {
      document.getElementById(`Description-${oldTodo.id}`).innerText = newTodo.description;
    }
  }

  function updateState(newTodos) {
    // calculate the diff b/w newTodos and oldTodos.
    // More specifically, find out what todos are - 
    // 1. added
    // 2. deleted
    // 3. updated
    const added = [];
    const deleted = [];
    const updated = [];
    // calculate these 3 arrays
    const oldTodoMap = new Map();
    for (let todo of oldTodoState) {
      oldTodoMap.set(todo.id, todo);
    }
    for (let todo of newTodos) {
      if (!oldTodoMap.has(todo.id)) {
        added.push(todo);
      } else {
        if (oldTodoMap.get(todo.id).title !== todo.title || oldTodoMap.get(todo.id).description !== todo.description) {
          updated.push(todo);
        }
      }
    }

    const newTodoMap = new Map();
    for (let todo of newTodos) {
      newTodoMap.set(todo.id, todo);
    }
    for (let todo of oldTodoState) {
      if (!newTodoMap.has(todo.id)) {
        deleted.push(todo);
      }
    }
    // call addTodo, removeTodo, updateTodo functions on each of the
    for (let todo of added) {
      addTodoToDom(todo);
    }
    for (let todo of deleted) {
      removeTodoFromDom(todo);
    }
    for (let todo of updated) {
      updateTodoInDom(todo);
    }
    // elements
    oldTodoState = [...newTodos];
  }

  function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    todoState.push({
      title: title,
      description: description,
      id: globalId++,
    });
    updateState(todoState);
  }

  function removeTodo(id) {
    todoState = todoState.filter((todo) => todo.id !== id);
    updateState(todoState);
  }

  return (
    <>
      <div>
        <input type="text" id="title" placeholder="Todo title"></input> <br /><br />
        <input type="text" id="description" placeholder="Todo description"></input> <br /><br />
        <button onClick={addTodo}>Add todo</button>
        <br />

        <div id="todos">
        </div>
      </div >
    </>
  )
}

export default App
