# Movie Recommendation System

This project implements a Movie Recommendation System using data science techniques to provide personalized movie suggestions based on user preferences.

## Features

- User input form for movie preferences (genres, actors).
- Integration with backend API for recommendation generation.
- Display of recommended movies on the frontend.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.x
- Jupyter Notebook
- Pandas, NumPy, scikit-learn
- Flask
- scipy
- gunicorn
- flask_cors

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/movie-recommendation-system.git
    cd movie-recommendation-system
    ```

2. **Install Python dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Install Frontend and Backend dependencies**:
    ```bash
    # Frontend
    cd app
    npm install

    # Backend
    cd ../server
    npm install
    ```

### Usage

#### Prepare the Data

Follow the instructions in `data/README.md` for downloading and preprocessing movie metadata.

#### Run the Recommendation Model

Start Jupyter Notebook and run the recommendation model notebook:

    
    jupyter notebook recommendation_model.ipynb
    

#### Start Frontend and Backend

**Frontend**:

  
    cd app
    npm run dev
    

**Backend**:

    
    cd server
    node index.js
    

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch**:

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit your changes**:

    ```bash
    git commit -am 'Add some feature'
    ```

4. **Push to the branch**:

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a new Pull Request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Notes

For the frontend and backend, change to the `frontend and backend` directory. The `app` directory is for the frontend, and the `server` directory is for the backend.

### Frontend

In the `app` directory:

   
    npm install  # to install dependencies
    npm run dev  # to run the website
    

### Backend

In the `server` directory:

    npm install  # to install dependencies
    node index.js  # to start the backend
    
