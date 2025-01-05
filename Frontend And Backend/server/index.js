import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;
import recommendRoutes from "./routes/routes.js";

app.use(cors());

app.use(bodyParser.json());

app.use("/recommend", recommendRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
