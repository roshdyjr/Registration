var httpReq = new XMLHttpRequest();

httpReq.open("get", "https://forkify-api.herokuapp.com/api/search?q=peach");
httpReq.send();

var food = [];

httpReq.addEventListener("readystatechange", function () {
  if (httpReq.readyState == 4) {
    food = JSON.parse(httpReq.response).recipes;

    var foodContainer = "";

    for (var i = 0; i < food.length; i++) {
      foodContainer += `<div class="col-md-4">
                <div class="food-details text-start" data-recipe-id="${food[i].recipe_id}">
                  <img src="${food[i].image_url}" alt="${food[i].publisher}" class="w-100">
                  <h6 class="pt-2">${food[i].title}</h6>
                  <p>Publisher: ${food[i].publisher}</p>
                  <p>Social rank: ${food[i].social_rank}</p>
                  <div class="ingredients"></div>
                </div>
              </div>`;
    }

    document.querySelector(".row").innerHTML = foodContainer;

    getIngredients(food);
  }
});

function getIngredients(food) {
  for (var i = 0; i < food.length; i++) {
    (function (i) {
      var recipeID = food[i].recipe_id;
      var httpReq2 = new XMLHttpRequest();

      httpReq2.open(
        "get",
        `https://forkify-api.herokuapp.com/api/get?rId=${recipeID}`
      );
      httpReq2.send();

      httpReq2.addEventListener("readystatechange", function () {
        if (httpReq2.readyState == 4) {
          var recipe = JSON.parse(httpReq2.response).recipe;
          var ingredients = recipe.ingredients;
          var ingredientsContainer = "<p>Ingredients:</p><ul>";

          for (var j = 0; j < ingredients.length; j++) {
            ingredientsContainer += `<li>${ingredients[j]}</li>`;
          }
          ingredientsContainer += "</ul>";

          document.querySelector(
            `.food-details[data-recipe-id="${recipeID}"] .ingredients`
          ).innerHTML = ingredientsContainer;
        }
      });
    })(i);
  }
}
