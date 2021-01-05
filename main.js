let titleLowercase;

function mixMot(mot){
    let motArray = mot.split('');

    if (mot.length>4) {
        let firstLetter = motArray[0];
        let lastLetter = motArray[motArray.length-1];

        motArray = motArray.slice(1, motArray.length-1);
      
        for (let i = motArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            //on permute
            [motArray[i], motArray[j]] = [motArray[j], motArray[i]];
          }
        mot = firstLetter + motArray.join('') + lastLetter;
    }
    else{
        for (let i = motArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [motArray[i], motArray[j]] = [motArray[j], motArray[i]];
          } 
        mot = motArray.join('');
    }
    
  return mot;
}

let chosenMovieTitle;
let chosenMovieSynopsis;
let chosenMoviePoster;
let chosenMovieReleaseDate;

async function getMovie(){
    const randomNumberPage = Math.floor((Math.random() * 10) + 1);
    // console.log(randomNumberPage);
    const request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=debebb277ae11a5e8fbef27fec8630ba&language=en-US&page=${randomNumberPage}`);
    const results = await request.json();

    // console.log(results);

    const randomNumberMovie = Math.floor(Math.random() * 20);
    // console.log(randomNumberMovie);

    // console.log(results.results[randomNumberMovie]);

    chosenMovieTitle = results.results[randomNumberMovie].title;

    // console.log(chosenMovieTitle);

    chosenMovieSynopsis = results.results[randomNumberMovie].overview;
    // console.log(chosenMovieSynopsis);
    chosenMoviePoster = results.results[randomNumberMovie].poster_path;
    chosenMovieReleaseDate = changeDateFormat(results.results[randomNumberMovie].release_date);


    let chosenMovieTitleArray = chosenMovieTitle.split(' ');
    // console.log(chosenMovieTitleArray);
    for (let i=0; i<chosenMovieTitleArray.length ;i++) {
        chosenMovieTitleArray[i] = mixMot(chosenMovieTitleArray[i]);
    }
    // console.log(chosenMovieTitleArray);
    const chosenMovieTitleMixed = chosenMovieTitleArray.join(' ');
    // console.log(chosenMovieTitleMixed);

    document.querySelector('.phrase').innerHTML = `${chosenMovieTitleMixed}`;

    titleLowercase = chosenMovieTitle.toLowerCase();
    // console.log("TITRE LOWERCASE -->");
    // console.log(titleLowercase);
}

getMovie();


let nbUserTries = 0;
let nbRightAnswer = 0;


const btn = document.querySelector('form');

const verifyAnswer = async (e) => {
    e.preventDefault();

    const userAnswer = document.querySelector('form input[type="text"]').value.toLowerCase();;
    // console.log(userAnswer);

    if(titleLowercase == userAnswer) {
        // console.log("c'est bon");
        nbRightAnswer++

        if(nbRightAnswer === 1) {
            showMovieDetails();
        }
        
        if(nbUserTries===2){
            document.querySelector('.indice').innerHTML = ``;
        }
    }
    else if (userAnswer == 0) {
        // console.log("c'est pas une réponse ça.");
    }
    else{
        // console.log("pa bon.");
        nbUserTries++;
        // console.log(nbUserTries);

        if(nbUserTries === 1){
            document.querySelector('.essais').children[0].classList.add("red-cross-container");
        }
        else if(nbUserTries === 2) {
            document.querySelector('.indice').innerHTML = `<p>Hint</p>
            <p>${chosenMovieSynopsis}</p>`;
    
            document.querySelector('.essais').children[1].classList.add("red-cross-container");
        }
        else if(nbUserTries === 3) {
            // console.log("afficher la réponse");
            document.querySelector('.indice').innerHTML = ``;
            showMovieDetails();
            document.querySelector('.essais').children[2].classList.add("red-cross-container");
        }
    }
}
btn.addEventListener('submit', (e) => {verifyAnswer(e)});



const btnChangerPhrase = document.querySelector('.regenere');
// console.log(btnChangerPhrase);
const ChangeTitle = async (e) => {
    e.preventDefault();

    document.querySelector('form input[type="text"]').value = '';
    nbUserTries = 0;
    nbRightAnswer = 0;

    document.querySelector('.infos-film').innerHTML = ``;

    document.querySelector('.indice').innerHTML = ``;

    getMovie();

    document.querySelector('.essais').children[0].classList.remove("red-cross-container");
    document.querySelector('.essais').children[1].classList.remove("red-cross-container");
    document.querySelector('.essais').children[2].classList.remove("red-cross-container");
}
btnChangerPhrase.addEventListener('click', (e) => {ChangeTitle(e)});


function showMovieDetails(){
        document.querySelector('.infos-film').innerHTML = `<img src="https://image.tmdb.org/t/p/w500${chosenMoviePoster}">
        <div class="text-infos-film">
        <h1>${chosenMovieTitle}</h1>
        <div>
        <p>Release date</p>
        <p>${chosenMovieReleaseDate}</p>
        </div>
        <p>${chosenMovieSynopsis}</p>
        </div>`;
}


function changeDateFormat(date){
    let dateArray = date.split('-').reverse();

    switch (dateArray[1]) {
        case '01':
            dateArray[1] = 'January';
          break;
        case '02':
            dateArray[1] = 'February';
          break;
        case '03':
            dateArray[1] = 'March';
        break;
        case '04':
            dateArray[1] = 'April';
        break;
        case '05':
            dateArray[1] = 'May';
        break;
        case '06':
            dateArray[1] = 'June';
        break;
        case '07':
            dateArray[1] = 'July';
        break;
        case '08':
            dateArray[1] = 'August';
        break;
        case '09':
            dateArray[1] = 'September';
        break;
        case '10':
            dateArray[1] = 'October';
        break;
        case '11':
            dateArray[1] = 'November';
        break;
        case '12':
            dateArray[1] = 'December';
        break;
      }

    // console.log(dateArray);

    date = dateArray.join(' ');

    return date;
}
