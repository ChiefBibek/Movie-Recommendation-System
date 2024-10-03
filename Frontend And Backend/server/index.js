const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const recommendRoutes = require("./routes/routes");

app.use(cors());

app.use(bodyParser.json());

app.post("/recommend", recommendRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
