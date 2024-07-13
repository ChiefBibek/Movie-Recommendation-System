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

```bash
jupyter notebook recommendation_model.ipynb
