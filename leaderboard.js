


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection,  getDocs, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWqjicwBSPF9K41D2RqJGcW90Ud_wwEH0",
  authDomain: "e-sukad.firebaseapp.com",
  projectId: "e-sukad",
  storageBucket: "e-sukad.firebasestorage.app",
  messagingSenderId: "335112000589",
  appId: "1:335112000589:web:71217fe2c2be5d2f8f7804",
  measurementId: "G-J83H5X73F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const urlParam = new URLSearchParams(window.location.search);
const selectedGame = urlParam.get("game");

const gameSelectionContainer = document.querySelector('.navbar-nav');
gameSelectionContainer.innerHTML += `
    <li class="nav-item">
        <a class="nav-link" href="index.html">Home</a>
    </li>
    <li class="nav-item">
        ${selectedGame === "ML" ? '<a class="nav-link active" href="leaderboard.html?game=ML">Mobile Legends</a>' 
            : '<a class="nav-link" href="leaderboard.html?game=ML">Mobile Legends</a>'}  
    </li>
    <li class="nav-item">
        ${selectedGame === "PUBG" ? '<a class="nav-link active" href="leaderboard.html?game=PUBG">PUBG</a>' 
            : '<a class="nav-link" href="leaderboard.html?game=PUBG">PUBG</a>'}
        
    </li>
    <li class="nav-item">
        ${selectedGame === "Valorant" ? '<a class="nav-link active" href="leaderboard.html?game=Valorant">Valorant</a>' 
            : '<a class="nav-link" href="leaderboard.html?game=Valorant">Valorant</a>'}
        
    </li>
`

fetchTeams(selectedGame);
fetchUpcomingMatch(selectedGame);
fetchHistory(selectedGame);

async function fetchTeams (gameName) {
    const teams = collection(db, 'teams');
    const q = query(
      teams, 
      where("game", "==", gameName),
      orderBy("score", "desc"));
    const snapshot = await getDocs(q);
    const leaderboard = [];

    snapshot.forEach(doc => {
        leaderboard.push(doc.data());
    });

    const leaderboardContainer = document.querySelector('.list-group');
    // leaderboardContainer.innerHTML = "";

    leaderboard.sort((a, b) => b.score - a.score);

    leaderboard.forEach((team, index) => {
        leaderboardContainer.innerHTML += `
        <div class="row">
        ${index < 3 ? `
          <div class="col-2 rank-circle d-flex justify-content-center align-items-center">
            <div class="star-icon col-1">
                <div class="star-text">${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : "rd" }</div>
            </div>
          </div>`
        :
        `
          <div class="col-2 rank-circle d-flex justify-content-center align-items-center">
            <span class="rank-text">${index + 1}</span>
          </div>`
        }
          <div class="col leaderboard-item d-flex align-items-center border-0 my-2 rounded me-3">
            <div class="d-flex flex-grow-1 justify-content-center align-items-center px-3">
              <div class="team-name mx-auto">${team.teamName}</div>
              <div class="team-score">${team.score}</div>
            </div>
          </div>
        </div>
        `;
    });
}

async function fetchUpcomingMatch(gameName) {
    const match = collection(db, 'match');
    const q = query(
      match, 
      where("game", "==", gameName),
      orderBy("dateRegistered", "desc"),
      limit(1));
    const snapshot = await getDocs(q);
    const matchData = snapshot.docs[0]?.data();

    const matchContainer = document.querySelector('.match-box');
    const timeContainer = document.querySelector('.time-text');
    const dateContainer = document.querySelector('.date-text');

    if (matchData) {
        matchContainer.innerHTML = `
        <div class="row match-text">
          <div class="col">${matchData.team1}</div>
          <div class="col vs-container">
            <span class="vs-text">vs</span>
          </div>
          <div class="col">${matchData.team2}</div>
        </div>`;
        timeContainer.textContent = matchData.time + " | " + matchData.day || "Time unavailable";
        dateContainer.textContent = `-- ${matchData.date || "Date unavailable"} --`;
    }
}

async function fetchHistory(gameName) {
    const history = collection(db, 'history');
    const q = query(
      history, 
      where("game", "==", gameName),
      orderBy("dateRegistered", "desc"));
    const snapshot = await getDocs(q);
    const historyData = [];

    snapshot.forEach(doc => {
        historyData.push(doc.data());
    });

    const historyContainer = document.getElementById('history');

    historyData.forEach(game => {
        historyContainer.innerHTML += `
        <div class="history border-0 rounded my-2">
        <ul class="list-group list-group-horizontal justify-content-center my-1">
          <li class="list-group-item history-text border-0 col-md-3">${game.team1}</li>
          <li class="list-group-item vs-text border-0 vs-text mx-auto">vs</li>
          <li class="list-group-item history-text border-top-0 border-bottom-0 col-md-3">${game.team2}</li>
          <li class="list-group-item history-text border-top-0 border-bottom-0 col-md-2">${game.winner}</li>
          <li class="list-group-item history-score border-end-0 border-top-0 border-bottom-0 col-md-2">+${game.scorePlus}</li>
        </ul>
        </div>
        `;
    });
}

