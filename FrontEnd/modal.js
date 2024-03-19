let projets = window.localStorage.getItem ('projets');
projets = JSON.parse(projets)

function galleryModalDisplay (projets) {   // génération fenêtre modale
    let sectionProjets = document.querySelector(".modal-wrapper"); 
    // génération interface supérieure (bouton fermeture)
    let navButtonsDiv = document.createElement('div');
    navButtonsDiv.className = "navigationButtonsDiv";
    let closeButton = document.createElement('a');
    closeButton.innerHTML = "<i class=\"fa-solid fa-x\"></i>";
    sectionProjets.appendChild(navButtonsDiv);
    navButtonsDiv.appendChild(closeButton);


    //génération du titre
    let modalTitleDiv = document.createElement('div');
    let modalTitle = document.createElement('h3');
    modalTitle.innerText = "Galerie Photo";
    sectionProjets.appendChild(modalTitleDiv);
    modalTitleDiv.appendChild(modalTitle);
    

    let projetsEnsemble = document.createElement("div");
    projetsEnsemble.className = "modal-projetsEnsemble"
    sectionProjets.appendChild(projetsEnsemble)
    for (let i = 0; i< projets.length; i++) {
    // récupération galerie projet dans DOM
        
    //création élément
        let projet = projets[i];
        let imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;

    /// création poubelle
    /// idée créer une div (backgrn noir) et dedans la poubelle <i class="fa-solid fa-trash-can"></i>, la fixer et lui attribuer une class en function de l'ID projet

//rattachement des éléments dans DOM
        projetsEnsemble.appendChild(imageElement);
    }

    ///génération bouton ajouter 
    let addButton = document.createElement("input");
    addButton.setAttribute('type', 'submit')
    addButton.setAttribute('value','Ajouter une photo')
    sectionProjets.appendChild(addButton);
}

galleryModalDisplay(projets);

/// ouverture/fermeture fenêtre modale
let modifierLink = document.querySelector(".modifierLink");
modifierLink.addEventListener("click", function () {
    let modal = document.querySelector(".modal");
    modal.style = null;
    let cross = document.querySelector(".fa-x");
    cross.addEventListener("click", function () {
        modal.style = "display:none";
    });
});



