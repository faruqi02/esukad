
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection, serverTimestamp, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
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

document.getElementById('submitButton').addEventListener('click', async () => {
  const team = [];

  for (let i = 1; i <= 7; i++) {
    const name = document.getElementById('player'+ i +'Name').value.trim();
    const ign = document.getElementById('player'+ i +'IGN').value.trim();
    const role = document.getElementById('player'+ i +'Role').value;

    if (!name || !ign || !role) {
    // alert(`Please fill out all fields for player ${i}.`);
    return;
    }
                
  // if (name && ign && role) {
    team.push({name, ign, role});
  // }
  }

  const game = document.getElementById('gameSelection').value;

  // if (game.length > 0 && game) {
  async function submitTeam (team, game) {
    try {
      await addDoc(collection(db, 'teams'), {
        teamMembers: team,
        game,
        dateRegistered: serverTimestamp()
      });
      // alert('Team submitted succesfully');
    } catch (e) {
      console.error('Error adding to document: ', e);
      alert('Failed to submit the team, Please try again');
    }
  }

  await submitTeam(team, game);
})