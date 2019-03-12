'use strict';

export default function favourites() {

    const favouritesElm = document.getElementById("favourites");
    const favouritesTrigger = document.getElementById("favouritesTrigger");
    let favouritesStorage = window.localStorage.getItem('favs');

    // Trigger favourites box on click
    favouritesTrigger.addEventListener('click', (event) => {
        if (favouritesElm.classList.contains('active') )
            favouritesElm.classList.remove('active');
        else
            favouritesElm.classList.add('active');
    });

    // Todo: Get favourites from storage and parse them in Favourites box

}
