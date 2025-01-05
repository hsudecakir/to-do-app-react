import FilterButtons from "./FilterTodoButtons";

export default function TodoButtons({ todos, setTodos, setFilteredTodos, activeTodos, isMobile,activeFilter ,filterTodos }){
  function clearCompleted(){
    if(todos.filter(todo => todo.isCompleted == true).length !== 0){
      if(confirm('Are you sure you want to delete all completed items?')){
        setFilteredTodos([...activeTodos]);
        setTodos([...activeTodos]);
        localStorage.setItem('savedTodos', JSON.stringify([...activeTodos]));
      }
    }
  }

  return(
    <>
      <li>
        <div className="filter-todos-container">
          <p>{activeTodos.length} items left</p>
            {!isMobile ? <FilterButtons activeFilter={activeFilter} filterTodos={filterTodos} /> : ''}
          <p className="clear-completed-btn" onClick={clearCompleted}>Clear Completed</p>
        </div>
      </li>
    </>
  )
}