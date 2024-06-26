const axios = require("axios");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const stringToList = (string) => {
	const regex = /\[(.*?)\]/;
	const listMatch = string.match(regex);
	let moviesList = [];
	if (listMatch && listMatch[1]) {
		moviesList = listMatch[1]
			.split("', '")
			.map((item) => item.replace(/^'/, "").replace(/'$/, ""));
	}
	return moviesList;
};

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("It is running");
});

app.post("/recommend", (req, res) => {
	const { selectedgenre, selectedactor } = req.body;
	const genreValue = selectedgenre.map((item) => item.value).join("|");
	const actorValue = selectedactor.map((item) => item.value).join(", ");
	console.log("Selected Genres:", genreValue);
	console.log("Selected Actors:", actorValue);
	const requestData = {
		actors: actorValue,
		genre: genreValue,
	};
	const apiUrl =
		"https://movie-recommendation-system-14.onrender.com/recommend";

	axios
		.post(apiUrl, requestData)
		.then((response) => {
			const result = Array.isArray(response.data)
				? response.data
				: stringToList(response.data);
			console.log("Recommendations:", result);

			res.json({ recommendations: result });
		})
		.catch((error) => {
			console.error("Error fetching recommendations:", error);
			res.status(500).json({ error: "Failed to fetch recommendations" });
		});
	// res.json({"Message":"Form Submitted"})
});

app.listen(4000, () => {
	console.log("Server is running on http://localhost:4000");
});