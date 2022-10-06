import { async } from 'regenerator-runtime';
import { loadRecipe, state, loadSearchResults, getSearchResultPage, updateServings, addBookmark, uploadRecipe } from './model.js'
import recipeView from './views/view.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';



const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) { return }
    recipeView.renderSpinner();

    await loadRecipe(id);

    let recipes = state.recipes
    recipeView.render(state.recipes);
    controlServings();


  } catch (err) {
    recipeView.renderError(`${err} 😂😂😂`)
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await loadSearchResults(query);
    searchView.clearInput();
    console.log(state.search.results);
    // resultsView.render(state.search.results)
    resultsView.render(getSearchResultPage(1));

    paginationView.render(state.search);
  }
  catch (err) {
    console.log(err);
  }
}


const controlPagination = function (goto) {
  resultsView.render(getSearchResultPage(goto));
  paginationView.render(state.search);
}

const controlServings = function () {
  updateServings(10);
  recipeView.render(state.recipes);
}

const controlAddBookmark = function () {
  addBookmark(state.recipes);
  localStorage.setItem('bookmarks', state.recipes.title);
  console.log(state.recipes);
}

const controlAddRecipe = function (newRecipe) {
  uploadRecipe(newRecipe);
  recipeView.render(state.recipes);
  setTimeout(addRecipeView.toggleWindow(), 2000);
  console.log(state.recipes);
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();