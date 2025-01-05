import Button from "./Button";

export default function FilterButtons({activeFilter ,filterTodos}){
  return(
    <div className="buttons">
      <Button filterBy={''} text={'All'} activeFilter={activeFilter} filterTodos={filterTodos} />
      <Button filterBy={false} text={'Active'} activeFilter={activeFilter} filterTodos={filterTodos} />
      <Button filterBy={true} text={'Completed'} activeFilter={activeFilter} filterTodos={filterTodos} />
    </div>
  )
}