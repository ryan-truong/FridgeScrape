import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY;

const server = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&`;
const server2 = `https://api.spoonacular.com/recipes/`;

const API = {
    getRecipes: function(ingredients){
        return axios.get(`${server}ingredients=${ingredients}&ranking=2&number=5`)
    },

    getRecipeLinks: function(recipeID){
        return axios.get(`${server2}${recipeID}/information?apiKey=${API_KEY}`)
    }
}

export default API;