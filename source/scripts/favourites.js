'use strict';

const favouritesElm = document.getElementById("favourites");
const favList = document.getElementById("favList");
const favouritesTrigger = document.getElementById("favouritesTrigger");
let favouritesStorage = window.localStorage.getItem('favs');

// Trigger favourites box on click
favouritesTrigger.addEventListener('click', (event) => {
    if (favouritesElm.classList.contains('active') )
        favouritesElm.classList.remove('active');
    else{
        // fillFavoriteslist();
        favouritesElm.classList.add('active');
    }
});

window.FS = () => {
    if (window.localStorage.getItem('favs'))
        return window.localStorage.getItem('favs');
    else
        return "";
}
window.SetFS = (data) => {
    window.localStorage.setItem('favs',data);
    return;
}

export function addJokeToFavourites(id, joke) {
    // Check is favouritesStorage is already an Array
    let fS = FS().split(",");
    if (!Array.isArray(fS))
        fS = [];

    // validate input
    if (!Number.isInteger(id) || !joke || joke.length == 0 ){
        console.log('Invalid joke ID or text.')
        return false;
    }

    // A bit ugly way to add to the array, but I needed it quickly
    fS[id] = joke;

    SetFS(fS);
    return true;
}

export function removeJokeFromFavourites(id) {
    // Check is FS() is already an Array
    let fS = FS().split(",");
    if (!Array.isArray(fS))
        fS = [];

    // validate input
    if (!Number.isInteger(id) || !fS[id]){
        console.log(`Invalid joke ID ${id}`);
        return true;//assume fav is already deleted
    }

    // A bit ugly way to remove from the array, but I needed it quickly
    fS[id] = "";

    SetFS(fS);
    return true;
}

// Todo: Get favourites from storage and parse them in Favourites box
export function fillFavoriteslist() {
    // Check is FS() is already an Array
    let fS = FS().split(",");
    if (!Array.isArray(fS))
        fS = [];

    // Clear all known favourites
    favList.querySelectorAll(".fav-item").forEach( elm => {
        elm.parentNode.removeChild(elm);
    } );

    fS.forEach( (joke, id) => {
        // Prepare button
        const favButton = document.createElement("button");
        favButton.classList.add("del-fav");
        favButton.setAttribute("aria-label", "Remove item from favourites");
        favButton.addEventListener('click', (event) => {
            if (removeJokeFromFavourites(id))
                event.target.parent().parent().remove();
        });

        // Add button to footer element
        const favButtonContainer = document.createElement("footer");
        favButtonContainer.appendChild(favButton);

        // Build article element
        const articleElm = document.createElement("article");
        articleElm.classList.add("fav-item");
        articleElm.id = `fav-${id}`;
        articleElm.innerHTML = `<p>${joke}</p>`;
        articleElm.appendChild(favButtonContainer);

        // Append the new article to the jokes list
        favList.appendChild(articleElm);
    } );

    return true;
}
