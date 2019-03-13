'use strict';

import {addJokeToFavourites, removeJokeFromFavourites} from './favourites';

export default function fetcher() {

    const jokesListElm = document.getElementById("jokesList");

    fetch("http://api.icndb.com/jokes/random/10").then( response => {
        if (response.status == 200) {
            return response.json();
        } else {
            return false;
        }
    }).then( resultJson => {

        jokesListElm.querySelectorAll(".joke").forEach( elm => {
            elm.parentNode.removeChild(elm);
        } );

        resultJson.value.forEach( jokeInst => {
            // Prepare button
            const favButton = document.createElement("button");
            favButton.classList.add("add-fav");
            favButton.setAttribute("aria-label", "Add item to favourites");
            favButton.addEventListener('click', (event) => {
                if (event.target.classList.contains('added') ){
                    if (removeJokeFromFavourites(jokeInst.id))
                        event.target.classList.remove('added');
                }
                else{
                    if (addJokeToFavourites(jokeInst.id, jokeInst.joke))
                        event.target.classList.add('added');
                }
            });

            // Add button to footer element
            const favButtonContainer = document.createElement("footer");
            favButtonContainer.appendChild(favButton);

            // Build article element
            const articleElm = document.createElement("article");
            articleElm.classList.add("joke");
            articleElm.id = `joke-${jokeInst.id}`;
            articleElm.innerHTML = jokeInst.joke;
            articleElm.appendChild(favButtonContainer);

            // Append the new article to the jokes list
            jokesListElm.appendChild(articleElm);
        } );

    }).catch( err => {
        console.log(`Error: ${err}`);
    });

}
