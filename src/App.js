import { useState } from "react";

const TASTY_API_KEY = process.env.REACT_APP_TASTY_API_KEY
const TASTY_URL = `https://tasty.p.rapidapi.com/recipes/list?size=10`
const TASTY_OPTIONS = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': `${TASTY_API_KEY}`,
		'x-rapidapi-host': 'tasty.p.rapidapi.com'
	}
};

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [foods, setFoods] = useState([])

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Getting search suggestions for keyword
  const handleSearch = async () => {
    try {
      let search_url = `&q=${searchTerm}`
      const response = await fetch(TASTY_URL+search_url, TASTY_OPTIONS)
      const data = await response.json()
      setFoods(data.results)
      console.log('Data: ', data)
    } catch (error) {
      console.error(error)
    }
  }

  // Getting search random suggestions
  const handleRandom = async () => {
    try {
      const response = await fetch(TASTY_URL, TASTY_OPTIONS)
      const data = await response.json()
      setFoods(data.results)
      console.log('Data: ', data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Get Recommendations</h1>
      <h2>Food keyword</h2>
      <input
        type = "text"
        value = {searchTerm}
        onChange = {handleSearchInputChange}
        placeholder = "keyword for what to eat"
      />
      <button onClick={handleSearch} style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>Search</button>
      <button onClick={handleRandom} style = {{marginTop: '10px'}}>Random Suggestions</button>
      <FoodList foods={foods}/>
    </div> 
  );
};

const FoodList = ({ foods }) => {
  return (
    <div>
      {foods.map((food) => (
        <FoodItem food={food}/>
      ))}
    </div>
  );
};

// Styling and formatting is done nearly entirely produced by ChatGPT
// Diplays food image, name, and information
const FoodItem = ({ food }) => {
  const [showNutrition, setShowNutrition] = useState(false);

  const toggleNutrition = () => {
    setShowNutrition(!showNutrition);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
        marginRight: '15px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px'
      }}
    >
      {/* Image on the left */}
      <img
        src={food.thumbnail_url}
        alt={food.thumbnail_alt_text || food.name}
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          marginRight: '20px',
          borderRadius: '8px'
        }}
      />

      {/* Food details on the right */}
      <div>
        <h3 style={{ margin: '0 0 10px 0' }}>{food.name}</h3>
        <p style={{ margin: '0 0 10px 0', color: '#555' }}>
          {food.description || 'No description available'}
        </p>

        {/* Video URL if available */}
        {food.video_url && (
          <p>
            <a href={food.video_url} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </p>
        )}

        {/* Nutrition Info Button */}
        <button onClick={toggleNutrition} style={{ marginTop: '10px' }}>
          {showNutrition ? 'Hide Nutrition' : 'Show Estimated Nutrition'}
        </button>

        {/* Nutrition Info */}
        {showNutrition && food.nutrition ? (
          <div style={{ marginTop: '10px', color: '#555' }}>
            <span>Calories: {food.nutrition.calories} kcal</span><br />
            <span>Carbohydrates: {food.nutrition.carbohydrates}g</span>
            <span>Fat: {food.nutrition.fat}g</span><br />
            <span>Fiber: {food.nutrition.fiber}g</span><br />
            <span>Protein: {food.nutrition.protein}g</span><br />
            <span>Sugar: {food.nutrition.sugar}g</span><br />
          </div>
        ) : showNutrition && !food.nutrition ? (
          <div>Nutrition information not available</div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
