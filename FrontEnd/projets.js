let projets = window.localStorage.getItem ('projets'); //définition des projets dans le local storage

if (projets === null) { 
    const reponse = await fetch('http://localhost:5678/api/works'); //si rien dans le local storage, recherche des projets via API
    projets = await reponse.json(); //extension JSON des données
    
    const valeurProjets =  JSON.stringify(projets); //créa fichier json et copie des données projets
    window.localStorage.setItem("projets", valeurProjets); //acceuil des projets dans local storage
} else {
    projets = JSON.parse(projets); // rend utilisable le JSON
}


function genererProjet (projets) { 
    for (let i = 0; i< projets.length; i++) {
        const sectionProjets = document.querySelector(".gallery");
    // récupération galerie projet dans DOM
        const projetElement = document.createElement("figure");
    
    //création élément
        const projet = projets[i];
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const titleElement = document.createElement("figcaption")
        titleElement.innerText = projet.title;

//rattachement des éléments dans DOM
        sectionProjets.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    }
}

genererProjet (projets);