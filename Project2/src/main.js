import "./rm-card.js"; //custom card elements
import "./footer.js";
import "./navbar.js";
import "./my-episode.js";
import "./about.js";


// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC9hLWBp67QMEKl11X7fybRj7PaK3W1KQE",
//   authDomain: "rick-morty-api-1d6c4.firebaseapp.com",
//   databaseURL: "https://rick-morty-api-1d6c4-default-rtdb.firebaseio.com",
//   projectId: "rick-morty-api-1d6c4",
//   storageBucket: "rick-morty-api-1d6c4.appspot.com",
//   messagingSenderId: "399001760708",
//   appId: "1:399001760708:web:306939636e870f81042a91"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// console.log(app);
// const db = getDatabase();

// function updateLocalFireBase(charID, name, status) {
//   set(ref(db, 'characters/' + `${charID}`), {
//     Name: name,
//     Status: status
//   });
// }

// function updateEpisodeFB(EpID, name){
//   set(ref(db, 'episodes/' + `${EpID}`),{
//     Name: name,
//   });
// }
// const episodeRef = ref(db, 'episodes');
// function episodesChanged(snapshot){
//   snapshot.forEach(episode => {
//     const episodeKey = episode.key;
//     //const episodeData = episode.val();
//     loadFile(`https://rickandmortyapi.com/api/episode/${episodeKey}`, loadEpisode);
//     //console.log(episodeKey, episodeData);
//   });
// }
// onValue(episodeRef, episodesChanged);

// const characterRef = ref(db, 'characters');
// function charactersChanged(snapshot) {
//     snapshot.forEach(char => {
//         const childKey = char.key;
//         //const childData = char.val();
//         loadFile(`https://rickandmortyapi.com/api/character/${childKey}`, loadCharacter);
//         //console.log(childKey, childData);
//     });
// }

// onValue(characterRef, charactersChanged);


//variables
let btnSearchChar;
let btnSearchEp;
let charInput;
let epInput;
let output;
let epOutput;
let rmJSON = {};

let chosenFavorites = [];
let chosenEpFavorites = [];
const passKey = "pak5559-RMKEY";
const passEpKey = "pak5559-EPKEY";

const loadEpisode = rmEpisodeObj =>{
  const rmEpisode = document.createElement("my-episode");
 //const rmEpisodeCharacters = document.createElement("my-episode");
  rmEpisode.dataset.id = rmEpisodeObj.id ?? "Non-existent Episode";
  rmEpisode.dataset.name = rmEpisodeObj.name ?? "Non-existent Episode Name";
  rmEpisode.dataset.air_date = rmEpisodeObj.air_date ?? "Show Has Not Aired";
  rmEpisode.dataset.episode = rmEpisodeObj.episode ?? "Episode Not Available";
 // rmEpisodeCharacters.dataset.characters = rmEpisodeObj.characters ?? "No Characters Were In Show";
 for (let i = 0; i < chosenEpFavorites.length; i++) {
  if (rmEpisode.dataset.id == chosenEpFavorites[i]) {
    rmEpisode.dataset.isFavorite = true;
  } else {
      rmEpisode.dataset.isFavorite = false;
  }
}
  rmEpisode.addEventListener("favoriteEpisode", e => updateEpisodeFavorites(e.detail.isFavorite, rmEpisode));
  document.querySelector(".episode-details").appendChild(rmEpisode);
  //rmEpisode.addEventListener("favoriteEpisode", _ => updateEpisodeFB(rmEpisode.dataset.id, rmEpisode.dataset.name));
  
  
}

const loadCharacter = rmObj => {
  const rmCard = document.createElement("rm-card");
  rmCard.dataset.id = rmObj.id ?? "Non-existent Character";
  rmCard.dataset.name = rmObj.name ?? "no name found";
  rmCard.dataset.status = rmObj.status ?? "?";
  rmCard.dataset.species = rmObj.species ?? "?";
  rmCard.dataset.type = rmObj.type ?? "?";
  rmCard.dataset.gender = rmObj.gender ?? "?";
  rmCard.dataset.origin = rmObj.origin.name ?? "?";
  rmCard.dataset.image = rmObj.image ?? "?";

  //check to see whether card is a favorite
  for (let i = 0; i < chosenFavorites.length; i++) {
      if (rmCard.dataset.id == chosenFavorites[i]) {
          rmCard.dataset.isFavorite = true;
      } else {
          rmCard.dataset.isFavorite = false;
      }
  }
  //favorite status change event listener
  //rmCard.addEventListener("favoritestatus", _ => updateLocalFireBase(rmCard.dataset.id, rmCard.dataset.name, rmCard.dataset.status));
  rmCard.addEventListener("favoritestatus", e => updateFavorites(e.detail.isFavorite, rmCard));
  document.querySelector(".card-list").appendChild(rmCard);
};

  //for the characters!
const jsonLoaded = json => {
  //load results into json
  json.results.forEach(obj => rmJSON[obj.id] = obj);

    output = document.querySelector("#output");
    btnSearchChar = document.querySelector("#searchCharacter");
    charInput = document.querySelector("#character-select");
    btnSearchChar.onclick = searchCharID;

    epOutput = document.querySelector("#episodeOutput")
    btnSearchEp = document.querySelector("#searchEpisode");
    epInput = document.querySelector("#episodeSelect");
    btnSearchEp.onclick = searchEpID;

   // nameValue = document.querySelector("#userName");
    //userID = document.querySelector("#createUser");
}
 //for the episodes!


const loadFile = (url,callback) => {
  const fetchPromise = async () => {
    const response = await fetch(url);
    callback(await response.json());
  }
  fetchPromise();
};


//update Favorites when a Favorite is chosen
function updateFavorites(favorited, rmCard) {
// Adds or removes from favorites
    if (favorited) {
        chosenFavorites.push(rmCard.dataset.id);
    } else {
        let chosen_newFavorites = [];
        for (let i = 0; i < chosenFavorites.length; i++) {
            if (chosenFavorites[i] != rmCard.dataset.id) {
                chosen_newFavorites.push(chosenFavorites[i]);
            }
        }
        chosenFavorites = chosen_newFavorites;
    }
    //save favorites to local storage
    updateLocalStorage(chosenFavorites, passKey);
}
function updateEpisodeFavorites(favorited, rmEpisode) {
  // Adds or removes from favorites
      if (favorited) {
          chosenEpFavorites.push(rmEpisode.dataset.id);
      } else {
          let chosen_newEpFavorites = [];
          for (let i = 0; i < chosenEpFavorites.length; i++) {
              if (chosenEpFavorites[i] != rmEpisode.dataset.id) {
                  chosen_newEpFavorites.push(chosenEpFavorites[i]);
              }
          }
          chosenEpFavorites = chosen_newEpFavorites;
      }
      //save favorites to local storage
      updateLocalStorage(chosenEpFavorites, passEpKey);
  }


function searchEpID() {
    //  Is valid dex entry?
    if (epInput.value >= 1 && epInput.value <= 41) {
        epOutput.innerHTML = "";
        //  Load pokemon
        loadFile(`https://rickandmortyapi.com/api/episode/${epInput.value}`, loadEpisode);
    } else {
        epOutput.innerHTML = "Please enter a valid Character ID number. [1-41]";
    }
}


function searchCharID() {
    //  Is valid dex entry?
    if (charInput.value >= 1 && charInput.value <= 671) {
        output.innerHTML = "";
        //  Load pokemon
        loadFile(`https://rickandmortyapi.com/api/character/${charInput.value}`, loadCharacter);
    } else {
        output.innerHTML = "Please enter a valid Character ID number. [1-671]";
    }
}

// function RNG(max){
//   return Math.floor(Math.random() * max);
// }

//update local storage (refactor later)
function updateLocalStorage(array, itemID){
  localStorage.setItem(itemID, JSON.stringify(array));
}

const init = () => {
  const url = "https://rickandmortyapi.com/api/character/";
  loadFile(url, jsonLoaded);

};

window.onload = init;





































// let myArr = {};
// //create select menu of values 1-34 for each page in Rick and Morty API

// const showImage = arrImg =>{
//   const arrDisp = document.createElement("about-page");
//   arrDisp.dataset.image = arrImg.image ?? "?";
//   document.querySelector("#DisplayImages").appendChild(arrDisp);

// }

// const arrayLoaded = arr =>{

//   arr.results.forEach(num => myArr[num.id] = num);
//   //let idNum = Math.round(Math.random() * 19);
//   const img = Object.keys(myArr).map(rm => `<image src="${myArr[rm].image}"></image>`).join("");
//   document.querySelector("#image-element").innerHTML = img;
//   showImage({"Image" : ""})

// };
// // function loadID(){
// //     let IDNum = Math.round(Math.random() * 19);

// // }
// //could just keep this simple and not even make an array for everything. choose random number and then just display.
// function loadURL(){
// 	let pageNum = Math.round(Math.random() * 34);
// 	let url = "https://rickandmortyapi.com/api/character/?page=" + pageNum;
	
// 	loadFile(url, arrayLoaded);
// };

// loadURL();