let projets = window.localStorage.getItem ('projets'); //définition des projets dans le local storage

if (projets === null) { 
    const reponse = await fetch('http://localhost:5678/api/works'); //si rien dans le local storage, recherche des projets via API
    projets = await reponse.json(); //extension JSON des données
    
    const valeurProjets =  JSON.stringify(projets); //créa fichier json et copie des données projets
    window.localStorage.setItem("projets", valeurProjets); //acceuil des projets dans local storage
} else {
    projets = JSON.parse(projets); // rend utilisable le JSON
}


function genererProjet (projets) {   //generation générale (sans monSet)
    for (let i = 0; i< projets.length; i++) {
        let sectionProjets = document.querySelector(".gallery");
    // récupération galerie projet dans DOM
        let projetElement = document.createElement("figure");
    
    //création élément
        let projet = projets[i];
        let imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        let titleElement = document.createElement("figcaption")
        titleElement.innerText = projet.title;

//rattachement des éléments dans DOM
        sectionProjets.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    }
}

genererProjet (projets);

/////// Boutons au clic 

const bouton0 = document.querySelector("#boutonTous");
const bouton1 = document.querySelector("#boutonObjets");
const bouton2 = document.querySelector("#boutonAppart");
const bouton3 = document.querySelector("#boutonHotels");

let categorie = 0;

bouton0.addEventListener("click", function() {  //bouton Tous
    let sectionProjets = document.querySelector(".gallery");
    sectionProjets.innerHTML = "";
    genererProjet (projets)
});

bouton1.addEventListener("click", function() {  //Bouton Objets
    categorie = 1;
    projetsTries (projets, categorie);
    generation (); //génére à l'infini si on reclic
}); 

bouton2.addEventListener("click", function() { //Bouton Apparts
    categorie = 2;
    projetsTries (projets, categorie);
    generation (); //génére à l'infini si on reclic 
}
); 

bouton3.addEventListener("click", function() { //Bouton Hotels
    categorie = 3;
    projetsTries (projets, categorie);
    generation (); //génére à l'infini si on reclic
}); 




 /// sélection de la catégorie d'objet
let monSet = new Set();

let projetsTries = function (projets, categorie) {
    monSet.clear(); // vide le set sinon les autres catégories restent après un deuxième choix
    for (let i = 0 ; i< projets.length;i++){
        if (projets[i].categoryId === categorie) {
               monSet.add(i);}
    }
};




function generation () {  //generation à partir de monSet
    let sectionProjets = document.querySelector(".gallery");
    sectionProjets.innerHTML = "";
    monSet.forEach(function (value) {  /// sortir chaque valeur du set
    let i = value;
    let projetElement = document.createElement("figure");
    
    //création élément
        let projet = projets[i];
        let imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        let titleElement = document.createElement("figcaption")
        titleElement.innerText = projet.title;

//rattachement des éléments dans DOM
        sectionProjets.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement); 
        
  });
}

