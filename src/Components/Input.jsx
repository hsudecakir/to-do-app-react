import { useState } from "react"

export default function Input({ setTodos, todos, setFilteredTodos, setActiveTodos }){
  const [inputValue, setInputValue] = useState('');

  function addTodo(){
    if(inputValue.trim() !== ''){
      const newTodo = {
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        content: inputValue,
        isCompleted: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setActiveTodos(updatedTodos.filter(x => x.isCompleted == false));
      localStorage.setItem('savedTodos', JSON.stringify(updatedTodos));
  
      setInputValue('');
    }
  }

  return(
    <div className="input-container">
      <button onClick={addTodo}></button>
      <input onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Create a new todo…" value={inputValue} />
    </div>
  )
}