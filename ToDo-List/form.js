// user input - includes validation
function TodoForm({addTodo}){

  // this is the manage variable
  const [value,setValue] = React.useState('');
  
  // This is the actual function that will handle the event to add the to-dos
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  // This is the form to manage user's input via onSubmit
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="input"

        // the value we defined in our state of the application
        value={value}
        placeholder="Add to-do..."
        onChange={e => setValue(e.target.value)} />
    </form>
  )
}