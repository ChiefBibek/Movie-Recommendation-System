const axios=require('axios');
const cors=require('cors')
const express=require('express')
const app =express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.get('/',(req,res)=>{
  res.send("It is running")
})
app.post('/recommend',(req,res)=>{
  console.log(req.body)
  res.json({"Message":"Form Submitted"})
})

app.listen(3001)
// const requestData={
//     actors:'',
//     genre:''
//   }
//     const apiUrl='https://movie-recommendation-system-14.onrender.com/recommend';

//   axios.post(apiUrl, requestData)
//   .then(response => {
//         console.log('Recommendations:', response.data);
//       })
//       .catch(error => {
//             console.error('Error fetching recommendations:', error);
//       });