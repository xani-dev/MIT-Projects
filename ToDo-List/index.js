function App() {
	const [todos, setTodos] = React.useState([
		{
			text: "learn React 🤓 ",
			isCompleted: false,
		},
		{
			text: "go for a run 🏃‍♀️ ",
			isCompleted: false,
		},
		{
			text: "build todo app 👩‍💻 ",
			isCompleted: false,
		},
		{
			text: "cook dinner 👩‍🍳",
			isCompleted: false,
		},
		{
			text: "grocery shopping 🛒",
			isCompleted: false,
		},
	]);
// here we add to-dos
	const addTodo = (text) => {
		// evaluate new to-dos
		const newTodos = [...todos, { text, isCompleted: false }];
		setTodos(newTodos);
	};

	// here we remove items
	const removeTodo = (index) => {
		let temp = [...todos];
		temp.splice(index, 1);
		setTodos(temp);
	};

	return (
		<div className="app">
			<div className="todo-list">
				{todos.map((todo, i) => (
					<Todo key={i} index={i} todo={todo} remove={removeTodo} />
				))}
				<TodoForm addTodo={addTodo} />
			</div>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
