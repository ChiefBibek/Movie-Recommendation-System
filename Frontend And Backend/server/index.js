const axios=require('axios');
const cors=require('cors')
const express=require('express')
const bodyParser = require('body-parser'); 
const app =express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send("It is running")
})
app.post('/recommend',(req,res)=>{
  const {selectedgenre,selectedactor}=req.body;
  const genreValue=selectedgenre.map(item=>item.value).join("|")
  const actorValue=selectedactor.map(item=>item.value).join(", ")
  console.log('Selected Genres:', genreValue);
  console.log('Selected Actors:', actorValue);
  const requestData={
      actors:actorValue,
      genre:genreValue
    }
      const apiUrl='https://movie-recommendation-system-14.onrender.com/recommend';
  
    axios.post(apiUrl, requestData)
    .then(response => {
          console.log('Recommendations:', response.data);
          res.json({ recommendations: "Hello world" })
                })
        .catch(error => {
              console.error('Error fetching recommendations:', error);
              res.status(500).json({ error: 'Failed to fetch recommendations' });
        });
  // res.json({"Message":"Form Submitted"})
})

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});