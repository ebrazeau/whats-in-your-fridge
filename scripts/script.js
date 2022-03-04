const recipeApp = {};

recipeApp.init = () => {
    recipeApp.populateDropdown();
    recipeApp.getUserInput();
};

// store selected ingredients in an array
recipeApp.userChoices = [];
// store search term in empty string 
recipeApp.searchTerm = "";

// global array that stores the returned recipes 
recipeApp.recipes = [];

recipeApp.url1 = 'https://api.spoonacular.com/recipes/complexSearch'
recipeApp.url2 = 'https://api.spoonacular.com/recipes/findByIngredients';

recipeApp.apiKey = '6ca6794922364918a232cd5884e479a0';

recipeApp.populateDropdown = () => {
    const dropdown1 = $("#ingredientOne");
    const dropdown2 = $("#ingredientTwo");
    const dropdown3 = $("#ingredientThree");
    const dropdown4 = $("#ingredientFour");
    const dropdown5 = $("#ingredientFive");

    // const dropdowns = document.querySelectorAll('select');
    // dropdowns.forEach((dropdown) => {
    //     // from ingredients.js
    //     dropdown.appendChild(ingredientOptionList);
    // })

    // from ingredients.js
    dropdown1.append(ingredientOptionList);
    dropdown2.append(ingredientOptionList);
    dropdown3.append(ingredientOptionList);
    dropdown4.append(ingredientOptionList);
    dropdown5.append(ingredientOptionList);
}

recipeApp.getUserInput = () => {

    const searchForm = document.querySelector('#searchForm');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        recipeApp.searchTerm = document.querySelector('#recipeSearch').value;
        recipeApp.getRecipesBySearch();
    })

    const ingredientForm = document.querySelector('#selectForm');
    ingredientForm.addEventListener('submit', (event) => {
        event.preventDefault();
        recipeApp.userChoices[0] = document.querySelector("#ingredientOne").value;
        recipeApp.userChoices[1] = document.querySelector("#ingredientTwo").value;
        recipeApp.userChoices[2] = document.querySelector("#ingredientThree").value;
        recipeApp.userChoices[3] = document.querySelector("#ingredientFour").value;
        recipeApp.userChoices[4] = document.querySelector("#ingredientFive").value;

        // displaying user choice on pantry div on main page

        // get li's from html
        const UserSelection1 = document.getElementById('item1')
        const UserSelection2 = document.getElementById('item2')
        const UserSelection3 = document.getElementById('item3')

        // put the user choices on each li
        UserSelection1.innerText = recipeApp.userChoices[0];
        UserSelection2.innerText = recipeApp.userChoices[1];
        UserSelection3.innerText = recipeApp.userChoices[2];

        recipeApp.getRecipesByIngredients();
    });

}

recipeApp.getRecipesBySearch = () => {

    const searchRecipes = new URL(recipeApp.url1);
    searchRecipes.search = new URLSearchParams({
        query: recipeApp.searchTerm,
        addRecipeInformation: true,
        fillIngredients: true,
        number: 15,
        apiKey: recipeApp.apiKey,
    });

    fetch(searchRecipes)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error;
            }
        }).then((jsonData) => {
            if (jsonData.results.length === 0) {
                document.getElementById('results').innerHTML = "<span class='invalid-search'>Search term returned no results :(</span>"
                console.log('No results :(');
            } else {
                jsonData.results.forEach((recipe) => {
                    recipeApp.recipes.push(recipe);
                });

                recipeApp.displayRecipes(jsonData.results);
            }
        }).catch((Error) => {
            console.log(Error);
        });

}

recipeApp.getRecipesByIngredients = () => {

    const findByIngredients = new URL(recipeApp.url2);
    findByIngredients.search = new URLSearchParams({
        ingredients: recipeApp.userChoices[1],
        addRecipeInformation: true,
        fillIngredients: true,
        number: 15,
        apiKey: recipeApp.apiKey,
    });

    fetch(findByIngredients)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error; 
            }
        }).then((jsonData) => {
            console.log(jsonData);
            
            if (jsonData.length === 0) {
                document.getElementById('results').innerHTML = "<span class='invalid-search'>No recipes exist :( Try adding more than one ingredient!</p>"
                console.log('No results :(');
            } else {
                jsonData.forEach((recipe) => {
                    recipeApp.recipes.push(recipe);
                });

                recipeApp.displayRecipes(jsonData);
            }
        }).catch((Error) => {
            console.log(Error);
        });

}


recipeApp.displayRecipes = (apiData) => {

    const recipeSection = document.getElementById('results');
    recipeSection.innerHTML = "";
    
    // fill results section
    apiData.forEach((recipe) => {

        // Create our divs for each recipe and fill them with info
        const divElement = document.createElement('div');
        divElement.setAttribute('class', "recipe-container");
        // create images
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;
        // create heading text
        const recipeHeading = document.createElement('h3');
        recipeHeading.innerText = recipe.title;

        // ********* TEMPORARILY REMOVED ******

        // create button
        // const infoButton = document.createElement('button');
        // infoButton.setAttribute('id', 'modalButton');
        // infoButton.innerText = 'See More';


        // append info to our div elements
        divElement.appendChild(image);
        divElement.appendChild(recipeHeading);

        // ********* TEMPORARILY REMOVED ******
        // divElement.appendChild(infoButton);


        // append div to section
        recipeSection.appendChild(divElement);

        
        // ********* TEMPORARILY REMOVED ******
        
    // get div element for modal
    // const modal = document.getElementById("more-info-modal");
    // event listener for modal button
    //     infoButton.addEventListener('click', function () {
    //         document.getElementById('more-info-modal').style.visibility = 'visible';

    //         // elements from modal div
    //         const source = document.getElementById('source-info');
    //         const dishInfo = document.getElementById('dish-info');

    //         const missingIngredients = document.getElementById('missed-ingredients');
    //         const unusedIngredients = document.getElementById('unused-ingredients');
    //         // const summeryInfo = document.getElementById('dish-info');
    //         // const urlInfo = document.getElementById('web-address');
            
    //         // fill modal with info
    //         // call complex search api
    //         const recipeInformationBulk = new URL(`https://cors-anywhere.herokuapp.com/api.spoonacular.com/recipes/${recipe.id}/information`);

    //         fetch(recipeInformationBulk)
    //             .then((response) => {
    //                 if (response.ok) {
    //                     return response.json();
    //                 } else {
    //                     throw new Error;
    //                 }
    //             }).then((jsonData) => {
    //                 console.log(jsonData);
    //                 if (jsonData.length === 0) {
    //                     console.log('No information found about this recipe :(');
    //                 } else {
    //                     source.innerText = jsonData.title;
    //                     dishInfo.innerHTML = jsonData.summary;
                        

    //                     // display ingredients
    //                     const ul = document.getElementById('ingredient-list');
    //                     ul.innerHTML = "";
    //                     jsonData.extendedIngredients.forEach((ingredient) => {
    //                         const li = document.createElement('li');
    //                         li.innerText = ingredient.original;
    //                         ul.append(li);
    //                     });

    //                     // display instructions if they exist 
    //                     const ol = document.getElementById('instructions');
    //                     ol.innerHTML = "";
    //                     if (jsonData.analyzedInstructions.length === 0) {
    //                         const span = document.createElement('span');
    //                         span.innerText = "No instructions were found :("
    //                         ol.replaceWith(span);
    //                     } else {
    //                         jsonData.analyzedInstructions[0].steps.forEach((instruction) => {
    //                             const li = document.createElement('li');
    //                             li.innerText = instruction.step;
    //                             ol.appendChild(li);
    //                         });
    //                     }
    //                 }
    //             }).catch((Error) => {
    //                 console.log(Error);
    //             });
    // });

    //     window.addEventListener('click', function (event) {
    //         if (event.target == modal) {
    //             document.getElementById('more-info-modal').style.visibility = "hidden"
    //         }
    //     })
    // })
    });
}


recipeApp.init();