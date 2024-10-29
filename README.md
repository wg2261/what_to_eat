# Food Recommendation with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description
This app is a React-based web application that utilizes the Tasty API to recommend food to users based on a keyword, or randomly output 10 from the API. If there are additional description and video link about the dish, it will be displayed with a button to show estimated nutrient information if desired.
The problem it solves is of course, what to eat.
Note: What is displayed is what is returned from API, current version does not display new food dishes unless API changes what is returned from current calling methods

## Setup
1. Clone this repository or download the source code. `git clone https://github.com/wg2261/what_to_eat.git`
2. Navigate to the project directory:
   ```
   cd path/to/what_to_eat
   ```
3. Create a virtual environemnt (optional)
    ```
    python -m venv .venv 

    # On Windows:
    .venv\Scripts\activate

    # On macOS and Linux:
    source .venv/bin/activate

    ```
4. Install Node.js from the [official Node.js website](https://nodejs.org/)
5. Create a `.env` file in the project root directory with Tasty API connection string:
   ```
   REACT_APP_TASTY_API_KEY=your_key_here
   ```
   Replace `your_key_here` with your Tasty connection string
6. Run the application
   ```
   npm start
   ```
  The app will be running at `http://localhost:3000`

## API Used
This app uses fetch with the Tasty API to retrieve food dishes and their data from the Tasty database.
Integration
- Keyword Search: Get 10 food recommendations based on the keyword in the input field, if blank, return random
- Random Recommendation: Get 10 random food recommendations

## API Credits
This project utilized ChatGPT generated code for styling and formatting of FoodItem, which displays the food recommendations and their respective information in their own div, with image on the left and description on the right.
