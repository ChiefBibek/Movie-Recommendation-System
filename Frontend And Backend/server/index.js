const axios=require('axios');

const requestData={
    actors:'Chris Evans',
    genre:'Comedy'
  }
    const apiUrl='https://movie-recommendation-system-14.onrender.com/recommend';

  axios.post(apiUrl, requestData)
  .then(response => {
        console.log('Recommendations:', response.data);
      })
      .catch(error => {
            console.error('Error fetching recommendations:', error);
      });


      