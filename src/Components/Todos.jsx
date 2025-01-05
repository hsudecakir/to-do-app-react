import { useEffect, useState } from "react";
import Input from "./Input";
import TodoList from "./TodoList";
import FilterButtons from "./FilterTodoButtons";

export default function Todos(){
  const savedTodos = JSON.parse(localStorage.getItem('savedTodos'));
  const [todos, setTodos] = useState(savedTodos || []);
  const [filteredTodos, setFilteredTodos] = useState([...todos]);
  const [activeTodos, setActiveTodos] = useState(todos.filter(x => x.isCompleted == false));
  const [activeFilter, setActiveFilter] = useState('');

  function filterTodos(filterBy){
    setActiveFilter(filterBy);
    setFilteredTodos(filterBy !== '' ? todos.filter(x => x.isCompleted == filterBy) : todos);
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return(
    <div className='container'>
      <Input setTodos={setTodos} todos={todos} setFilteredTodos={setFilteredTodos} setActiveTodos={setActiveTodos} />
      <TodoList setTodos={setTodos} todos={todos} setFilteredTodos={setFilteredTodos} filteredTodos={filteredTodos} activeTodos={activeTodos} setActiveTodos={setActiveTodos} isMobile={isMobile} activeFilter={activeFilter} filterTodos={filterTodos} />
      {isMobile ? <FilterButtons activeFilter={activeFilter} filterTodos={filterTodos} /> : ''}
      <p className="edit-text">Double-click to edit</p>
    </div>
  )
}