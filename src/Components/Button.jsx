export default function Button({ filterBy, text, activeFilter, filterTodos}){
  return(
    <button onClick={() => filterTodos(filterBy)} className={filterBy === activeFilter ? 'selected' : null}>{text}</button>
  )
}