import { useState } from "react";
import TodoButtons from "./TodoButtons.jsx";

export default function TodoList({ todos, setTodos, filteredTodos, setFilteredTodos, activeTodos, setActiveTodos, isMobile, activeFilter ,filterTodos }){

  function checkTodo(id){
    const selectedTodoIndex = todos.findIndex(todo => todo.id == id);
    const updatedTodos = [...todos];
    const selectedTodo = updatedTodos[selectedTodoIndex];
    selectedTodo.isCompleted = !selectedTodo.isCompleted;
    const activeUpdatedTodos = updatedTodos.filter(x => x.isCompleted == false)
    setTodos(updatedTodos);
    setActiveTodos(activeUpdatedTodos);
    localStorage.setItem('savedTodos', JSON.stringify(updatedTodos));
  }

  function deleteTodo(id){
    if(confirm('Are you sure you want to delete this todo?')){
      const updatedTodos = [...todos];
      const selectedTodoIndex = updatedTodos.findIndex(x => x.id == id);
      updatedTodos.splice(selectedTodoIndex, 1);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setActiveTodos(updatedTodos);
      localStorage.setItem('savedTodos', JSON.stringify(updatedTodos));
    }
  }

  return(
    <ul className="todo-list">
      {todos.length == 0 ? 
      <EmptyTodoList /> : 
      filteredTodos.map(todo =>
      <Todo 
      key={todo.id}
      id={todo.id}
      content={todo.content}
      isCompleted={todo.isCompleted}
      checkTodo={checkTodo}
      deleteTodo={deleteTodo}
      todos={todos}
      setFilteredTodos={setFilteredTodos}
      setTodos={setTodos}
       />)}
      <TodoButtons todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos} activeTodos={activeTodos} isMobile={isMobile} activeFilter={activeFilter} filterTodos={filterTodos} />
    </ul>
  )
}

function Todo({ content, isCompleted, id, checkTodo, deleteTodo ,todos, setTodos, setFilteredTodos }){
  const [editing, setEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState('');

  function editTodo(){
    setEditing(true);
  }

  function saveTodo(id, inputValue){
    const updatedTodos = [...todos];
    const selectedTodo = updatedTodos.find(x => x.id == id);
    if(inputValue !== ''){
      selectedTodo.content = inputValue;
    }
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setEditing(false);
    localStorage.setItem('savedTodos', JSON.stringify(updatedTodos));
  }

  return(
    <>
      <li className={`todo ${isCompleted == true ? 'completed' : ''}`}>
        <div className="todo-wrapper">
          <label htmlFor={`todo-id${id}`}>
            <input checked={isCompleted == true} className="checkbox-input" type="checkbox" id={`todo-id${id}`} onChange={() => checkTodo(id)} />
          </label>
          {editing == false ? (<p onDoubleClick={editTodo} className="todo-content">{content}</p>) : (<input className="edit-input" type="text" defaultValue={content} autoFocus onChange={(e) => setEditInputValue(e.target.value)} />)}
        </div>
        {editing == false ? (<div className="todo-btns"><i onClick={editTodo} class="fa-solid fa-pen edit-btn"></i><img onClick={() => deleteTodo(id)} className="delete-icon" src="./images/delete-icon.svg" alt="Delete Icon" /></div>) : (<button className="save-btn" onClick={() => saveTodo(id, editInputValue)}>Save</button>)}
        </li>
    </>
  )
}

function EmptyTodoList(){
  return(
    <li>
      <div className="empty-todo-list-container">
        <p>Nothing to do for now</p>
        <img src="./images/sleeping-emoji.png" />
      </div>
    </li>
  )
}