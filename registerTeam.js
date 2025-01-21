
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection, serverTimestamp, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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

// Initialize Firebase Auth
const auth = getAuth(app);

const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById('loading');
  const content = document.getElementById('home-section');

  loading.style.display = 'block';
  content.style.display = 'none';

  window.addEventListener('load', () => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.email.endsWith("@manager.com")) {
          alert("Access denied: Only managers can access this page.");
          window.location.href = "index.html"; 
        // }
      } else {
        loading.style.display = 'none';
        content.style.display = 'block';
      }
    });
  })
})

console.log(document.cookie);

document.getElementById('submitButton').addEventListener('click', async () => {
  const team = [];

  const teamName = document.getElementById('teamNameSelection').value;

  for (let i = 1; i <= 7; i++) {
    const name = document.getElementById('player'+ i +'Name').value.trim();
    const ign = document.getElementById('player'+ i +'IGN').value.trim();
    const role = document.getElementById('player'+ i +'Role').value;
    
    if (!name || !ign || !role || !teamName) {
    // alert(`Please fill out all fields for player ${i}.`);
    return;
    }
                
  // if (name && ign && role) {
    team.push({name, ign, role, teamName});
  // }
  }

  const game = document.getElementById('gameSelection').value;
  
  // if (game.length > 0 && game) {
  async function submitTeam (team, game) {
    try {
      await addDoc(collection(db, 'teams'), {
        teamName,
        teamMembers: team,
        game,
        isWin: true,
        hadMatch: false,
        score: 0,
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

// Redirect to index.html when Sign Out button is clicked
const signOutButton = document.getElementById('signOut');

signOutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
            document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // Clear cookie
            alert("Logged out successfully!");
            window.location.href = "index.html"; // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error.message);
            alert("Logout failed: " + error.message);
        }
});
