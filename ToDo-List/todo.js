

function Todo({todo,index,remove}){
  function handle(){
    console.log('Task Removed:', todo.text);
    remove(index);
  }
  return <div className="todo" onClick={handle}>{todo.text}  <span id='delete'> ✖️ </span></div>
}
