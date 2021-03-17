
mapboxgl.accessToken = 'YOUR-API-CODE-HERE';

// Load Light Styled Map
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/light-v10",
	center: [-71.051268,42.364120],
	zoom: 12,
});


const busIcon = (color) => `<svg xmlns="http://www.w3.org/2000/svg" 
id="Artboard_30" data-name="Artboard 30" 
viewBox="0 0 64 64" width="25" height="25">
<path fill=${color} d="M61,12H58V10a1,1,0,0,0-1-1H54V8a7.008,7.008,0,0,0-7-7H17a7.008,7.008,0,0,0-7,7V9H7a1,1,0,0,0-1,1v2H3a1,1,0,0,0-1,1V37a2,2,0,0,0,2,2H6a2,2,0,0,0,2-2V20a1,1,0,0,0-1-1H4V14H6v2a1,1,0,0,0,1,1h3V52a5.009,5.009,0,0,0,4,4.9V61a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V57H40v4a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V56.9A5.009,5.009,0,0,0,54,52V17h3a1,1,0,0,0,1-1V14h2v5H57a1,1,0,0,0-1,1V37a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V13A1,1,0,0,0,61,12ZM6,21V37H4V21ZM38.052,47.97c-.006.01-.008.02-.013.03H25.961c-.006-.009-.007-.02-.013-.029L24.766,46H39.234ZM12,45.087l9.9.825a1,1,0,0,1,.774.481L24.233,49H12Zm29.33,1.307a1,1,0,0,1,.774-.482l9.9-.825V49H39.767ZM52,43.08l-10.062.838a3.09,3.09,0,0,0-.4.082H22.458a3.09,3.09,0,0,0-.4-.082L12,43.08V37.618l1.286.643a7.027,7.027,0,0,0,3.13.739h.049l-.3.445,1.664,1.11L18.868,39H47.584a7.027,7.027,0,0,0,3.13-.739L52,37.618Zm0-7.7-2.181,1.09A5.027,5.027,0,0,1,47.584,37H20.2l1.333-2H46V33H21a1,1,0,0,0-.832.445L17.8,37H16.416a5.027,5.027,0,0,1-2.235-.528L12,35.382V9H52ZM17,3H47a5.009,5.009,0,0,1,4.9,4H12.1A5.009,5.009,0,0,1,17,3ZM8,15V11h2v4ZM22,61H16V57h6Zm20,0V57h6v4Zm7-6H15a3,3,0,0,1-3-3V51H24.233a1.976,1.976,0,0,0,1.73-1H38.037a1.976,1.976,0,0,0,1.73,1H52v1A3,3,0,0,1,49,55Zm7-40H54V11h2Zm4,22H58V21h2Z"/>
</svg>`

const markersArray = [];

const busColor = [
	"DarkTurquoise",
	"LightPink",
	"LightGrey",
	"MistyRose",
	"Coral",
	"Lavender",
	"PaleVioletRed",
	"LightSalmon",
	"LightSeaGreen",
	"PeachPuff",
	"Plum",
	"RosyBrown",
	"SteelBlue",
	"Teal",
	"Tomato",
	"MediumTurquoise",
];

// function that will pull GetBusLocations that waits for the response to get the buses
async function run() {
	// get bus location data
	const locations = await getBusLocations();

	//timeStamp for the buses
	console.log(new Date());

	// i for colors array. Used inside forEach below
	let i = 0;

	locations.forEach((stop) => {
		i++;
		console.log(stop);
		if (!markersArray[stop.id]) {
			// Lines below are for using the SVG icon
			var busDiv = document.createElement('div');
			busDiv.classList.add('marker');
			busDiv.innerHTML = busIcon(busColor[i]);
			/////////////////////

			markersArray[stop.id] = new mapboxgl.Marker({
				element: busDiv
			});
		}
		markersArray[stop.id]
			.setLngLat([stop.attributes.longitude, stop.attributes.latitude])
			.addTo(map);
	});
	console.log(markersArray);

	// timer for the run function -getting bus locations every +15sec
	setTimeout(run, 15000);
}

// Request BUS DATA from MBTA's API
// using async function, so we can use fetch
async function getBusLocations() {
	// url with the json for the api
	const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";

	// calling data and catching it in a response
	const response = await fetch(url);

	// extract the data within response and wait for that data to be extracted
	const json = await response.json();
	console.log(json);

	//return data to the calling function
	return json.data;
}

run();
