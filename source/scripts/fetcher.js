'use strict';

export default function fetcher() {

    const jokesListElm = document.getElementById("jokesList");

    fetch('http://api.icndb.com/jokes/random/10').then( response => {
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
            const jokeTemplate = `
            <article class="joke" id="joke-${jokeInst.id}">
                ${jokeInst.joke}
                <footer>
                    <button class="add-fav" aria-label="Add item to favourites"></button>
                </footer>
            </article>
            `;

            jokesListElm.insertAdjacentHTML('beforeend', jokeTemplate );
        } );
    }).catch( err => {
        console.log(`Error: ${err}`);
    });

}
