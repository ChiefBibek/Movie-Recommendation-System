const axios = require("axios");

module.exports.recommendations = (req, res) => {
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
    "https://movie-recommendation-system-s47u.onrender.com/recommend";

  axios
    .post(apiUrl, requestData)
    .then((response) => {
      const result = response.data;
      console.log("Recommendations:", result);
      if (!Array.isArray(result) || result.length === 0) {
        res.json({ recommendations: actorValue });
      } else {
        res.json({ recommendations: result });
      }
    })
    .catch((error) => {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ error: "Failed to fetch recommendations" });
    });
  // res.json({"Message":"Form Submitted"})
};
