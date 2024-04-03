// Sélectionnez tous les liens de la navbar
const navbarLinks = document.querySelectorAll(".navbar a");

// Ajoutez un gestionnaire d'événements à chaque lien de la navbar
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Fermez la barre de navigation mobile
    document.querySelector(".navbar").classList.remove("active");
    // Modifiez la classe du bouton de menu pour le fermer
    document.querySelector(".menu-toggle").classList.remove("active");
  });
});

// Gestionnaire d'événements pour le bouton de menu
document.querySelector(".menu-toggle").addEventListener("click", function () {
  // Basculez la classe active sur le bouton de menu
  this.classList.toggle("active");
  // Basculez la classe active sur la barre de navigation
  document.querySelector(".navbar").classList.toggle("active");
});

const API_KEY = "8c7205adc04bc6022a737bb5d61c2f96";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_IMG = "https://image.tmdb.org/t/p/w500";

let searchType;
let searchOption;
let media;

const divMedia = document.querySelector(".media");

document.addEventListener("DOMContentLoaded", function () {
  // Ajoutez des gestionnaires d'événements pour chaque lien
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href === "#popular-movies") {
        searchType = "movie";
        searchOption = "popular";
      } else if (href === "#upcoming-movies") {
        searchType = "movie";
        searchOption = "upcoming";
      } else if (href === "#popular-series") {
        searchType = "tv";
        searchOption = "popular";
      } else if (href === "#upcoming-series") {
        searchType = "tv";
        searchOption = "on_the_air";
      }
      updateMedia();
    });
  });

  // Chargez les films populaires par défaut
  searchType = "movie";
  searchOption = "popular";
  updateMedia();
});

// Fonction pour mettre à jour les médias en fonction des informations stockées
function updateMedia() {
  getMedia(
    `${BASE_URL}${searchType}/${searchOption}?api_key=${API_KEY}&language=fr-FR&page=1`
  );
}

// Fonction pour récupérer les données à partir de l'API
async function getMedia(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    media = data.results;
    console.log(media);
    displayMedia();
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher les médias sur la page
const displayMedia = () => {
  // Efface les médias précédents
  divMedia.innerHTML = "";

  // Crée et affiche les nouveaux éléments de médias
  const mediaNode = media.map((m, i) => {
    return createMediaElement(m);
  });
  divMedia.append(...mediaNode);
};

// Fonction pour créer un élément média
const createMediaElement = (value) => {
  const div = document.createElement("div");
  div.classList.add("card");

  const img = document.createElement("img");
  img.src = `${BASE_IMG}${value.poster_path}`;
  img.style.width = "200px";

  const h3 = document.createElement("h3");
  h3.innerText = value.title || value.name; // Vérifiez si le titre est défini, sinon utilisez le nom

  const h4 = document.createElement("h4");
  h4.innerText = value.vote_average.toFixed(1);
  h4.classList.add("note");

  div.append(img, h3, h4);
  return div;
};
