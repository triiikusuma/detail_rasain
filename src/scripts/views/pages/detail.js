import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/data-source';
import { recipeDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="recipe" class="recipe"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const recipe = await DataSource.detailRecipe(url.id);
    console.log(recipe);
    const movieContainer = document.querySelector('#recipe');
    movieContainer.innerHTML = recipeDetailTemplate(recipe);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      recipe: {
        title: recipe.title,
        description: recipe.description,
        pictureId: recipe.pictureId,
        categories: recipe.categories,
      },
    });
  },
};

export default Detail;
