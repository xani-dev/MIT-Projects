function App() {
	const { Container } = ReactBootstrap;
	const { useState, useEffect } = React;
	const [data, setData] = useState({ results: [] });
	const [isError, setIsError] = useState(false);
	const [url, setUrl] = useState(
		"https://swapi.dev/api/films/"
	);
	const [isLoading, setIsLoading] = React.useState(false);
	console.log("Rendering App");

	useEffect(() => {
		// Handles the LifeCycle Events
		console.log("Fetching data...");
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const result = await axios(url);
				setData(result.data);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);
	return (
		<Container>
			{isError && <div>Something went wrong ...</div>}

			{isLoading ? (
				<div>Loading ...</div>
			) : (
				<div className="movies">
					{data.results.map((movie) => (

						<div className="movie" key={movie.episode_id}>
							<h1>🎬 <a href={movie.url}>{movie.title}</a> </h1>
							<h2>⏰ Release Date: {movie.release_date}</h2>
							<div className="scrollUp"><p>{movie.opening_crawl}</p></div>
						</div>
					))}
				</div>
			)}
		</Container>
	);
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
