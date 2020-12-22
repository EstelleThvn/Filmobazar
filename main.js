import { DB_KEY } from './api.js';

let titleLowercase;

function mixMot(mot){
    let motArray = mot.split('');

    if (mot.length>4) {
        let firstLetter = motArray[0];
        let lastLetter = motArray[motArray.length-1];

        motArray = motArray.slice(1, motArray.length-1);
      
        motArray.sort(function() {
            return 0.5 - Math.random();
        });  
        mot = firstLetter + motArray.join('') + lastLetter;
    }
    else{
        motArray.sort(function() {
            return 0.5 - Math.random();
        });  
        mot = motArray.join('');
    }
    
  return mot;
}

async function getMovie(){
    const randomNumberPage = Math.floor((Math.random() * 10) + 1);
    console.log(randomNumberPage);
    const request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${DB_KEY}&language=en-US&page=${randomNumberPage}`);
    const results = await request.json();

    console.log(results);

    const randomNumberMovie = Math.floor(Math.random() * 20);
    console.log(randomNumberMovie);

    console.log(results.results[randomNumberMovie]);

    const chosenMovieTitle = results.results[randomNumberMovie].title;

    console.log(chosenMovieTitle);

    let chosenMovieTitleArray = chosenMovieTitle.split(' ');
    console.log(chosenMovieTitleArray);
    for (let i=0; i<chosenMovieTitleArray.length ;i++) {
        chosenMovieTitleArray[i] = mixMot(chosenMovieTitleArray[i]);
    }
    console.log(chosenMovieTitleArray);
    const chosenMovieTitleMixed = chosenMovieTitleArray.join(' ');
    console.log(chosenMovieTitleMixed);

    document.querySelector('.phrase').innerHTML = `${chosenMovieTitleMixed}`;

    titleLowercase = chosenMovieTitle.toLowerCase();
    console.log("TITRE LOWERCASE -->");
    console.log(titleLowercase);

    // titleLowercase = titleLowercase.split(' ');
    // console.log(titleLowercase);
}

getMovie();


// async function getModifiedMovieTitle(){
//     const request = await fetch(`https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${titleLowercase}?key=c8dea4be-5e38-451e-86c7-6a1e2a2e9221`);
//     const results = await request.json();

//     console.log(results);

// }






const btn = document.querySelector('form');

const verifyAnswer = async (e) => {
    e.preventDefault();

    const userAnswer = document.querySelector('form input[type="text"]').value.toLowerCase();;
    console.log(userAnswer);

    if(titleLowercase == userAnswer) {
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