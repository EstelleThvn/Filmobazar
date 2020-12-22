import { DB_KEY } from './api.js';

let modifiedTitle;

async function getMovie(){
    const randomNumberPage = Math.floor((Math.random() * 10) + 1);
    console.log(randomNumberPage);
    const request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${DB_KEY}&language=en-US&page=${randomNumberPage}`);
    const results = await request.json();

    console.log(results);

    const randomNumberMovie = Math.floor(Math.random() * 20);
    console.log(randomNumberMovie);

    const chosenMovieTitle = results.results[randomNumberMovie].title;

    console.log(chosenMovieTitle);

    document.querySelector('.phrase').innerHTML = `${chosenMovieTitle}`;

    modifiedTitle = document.querySelector('.phrase').textContent.toLowerCase();
    console.log("TITRE LOWERCASE -->");
    console.log(modifiedTitle);
}

getMovie().then(async () => {

    modifiedTitle = modifiedTitle.split(' ');
    console.log(modifiedTitle);

    let i;
    let requestSynonyms;
    let resultSynonyms;


    for(i=0; i < modifiedTitle.length; i++) {
        if(modifiedTitle[i].length>3){
            requestSynonyms = await fetch(`https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${modifiedTitle[i]}?key=c8dea4be-5e38-451e-86c7-6a1e2a2e9221`);
            resultSynonyms = await requestSynonyms.json();
            console.log(resultSynonyms);
            if(resultSynonyms.meta.syns.length!=0){
                modifiedTitle[i] = resultSynonyms[0].meta.syns[0][0];
            }
        }
        console.log(modifiedTitle[i]);
        };


    // const request = await fetch(`https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${modifiedTitle}?key=c8dea4be-5e38-451e-86c7-6a1e2a2e9221`);
    // const results = await request.json();

    // console.log(results);
});


async function getModifiedMovieTitle(){
    const request = await fetch(`https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${modifiedTitle}?key=c8dea4be-5e38-451e-86c7-6a1e2a2e9221`);
    const results = await request.json();

    console.log(results);

}




const btn = document.querySelector('form');

const verifyAnswer = async (e) => {
    e.preventDefault();

    const userAnswer = document.querySelector('form input[type="text"]').value.toLowerCase();;
    console.log(userAnswer);

    if(modifiedTitle == userAnswer) {
        console.log("ce booooooon");
        const verificationRight = document.querySelector('.verification');
        verificationRight.innerHTML = "c'est bon !";
    }
    else{
        console.log("pa bon.");
        const verificationFalse = document.querySelector('.verification');
        verificationFalse.innerHTML = "c'est pas bon. retry !";
    }
}
btn.addEventListener('submit', (e) => {verifyAnswer(e)});