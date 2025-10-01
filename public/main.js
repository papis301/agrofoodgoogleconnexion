// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔹 Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARfM5_QDtjHvpBcn55OcfskO9BSbrFILE",
  authDomain: "its2025.firebaseapp.com",
  projectId: "its2025",
  storageBucket: "its2025.firebasestorage.app",
  messagingSenderId: "471440425690",
  appId: "1:471440425690:web:d975b9cf4bfb5363e5dbe3",
  measurementId: "G-VDK8ESXS23"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Récupération des éléments HTML
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// 🔹 Connexion Google → redirection
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log("Connexion réussie :", result.user);
        window.location.href = "/dashboard"; // redirection vers dashboard
      })
      .catch(error => console.error("Erreur connexion :", error));
  });
}

// 🔹 Déconnexion
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      console.log("Déconnecté");
      window.location.href = "/login"; // Retour à la page login
    });
  });
}

// 🔹 Vérifier l’état de connexion (évite boucle infinie)
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Utilisateur connecté :", user.displayName);

    if (document.getElementById("userInfoDashboard")) {
      document.getElementById("userInfoDashboard").innerHTML = `
        <p>Connecté en tant que : <strong>${user.displayName}</strong></p>
        <p>Email : ${user.email}</p>
        <img src="${user.photoURL}" width="80" style="border-radius:50%"/>
      `;
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    }

  } else {
    console.log("Aucun utilisateur connecté");

    if (document.getElementById("userInfoDashboard")) {
      document.getElementById("userInfoDashboard").innerHTML = "<p>⚠️ Utilisateur non connecté</p>";
    }

    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

// 🔹 Fonction déconnexion globale
function logout() {
  signOut(auth)
    .then(() => {
      console.log("Déconnecté de Firebase ✅");
      window.location.href = "/logout"; // Symfony logout
    })
    .catch(error => console.error("Erreur lors de la déconnexion", error));
}

window.logout = logout; // rendre disponible dans HTML
