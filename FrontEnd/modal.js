let projets = window.localStorage.getItem ('projets');
projets = JSON.parse(projets)

function galleryModalDisplay (projets) {   // génération fenêtre modale
    let sectionProjets = document.querySelector(".modal-wrapper"); 
    // génération interface supérieure 
    let navButtonsDiv = document.createElement('div');
    navButtonsDiv.className = "navigationButtonsDiv";
    navButtonsDiv.style = "justify-content:right";
    let backButton = document.createElement('a');
    backButton.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i>"; 
    backButton.style = "display:none";
    let closeButton = document.createElement('a');
    closeButton.innerHTML = "<i class=\"fa-solid fa-x\"></i>";
    sectionProjets.appendChild(navButtonsDiv);
    navButtonsDiv.appendChild(backButton);
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
        let imageAndTrash = document.createElement("div")
        imageAndTrash.className = "imageAndTrash"
        let imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash-can";

    /// création poubelle
    /// idée créer une div (backgrn noir) et dedans la poubelle <i class="fa-solid fa-trash-can"></i>, la fixer et lui attribuer une class en function de l'ID projet

//rattachement des éléments dans DOM
        projetsEnsemble.appendChild(imageAndTrash);
        imageAndTrash.appendChild(imageElement);
        imageAndTrash.appendChild(trashIcon);
    }

    ///génération bouton ajouter 
    let addButton = document.createElement("input");
    addButton.setAttribute('type', 'submit')
    addButton.setAttribute('value','Ajouter une photo')
    sectionProjets.appendChild(addButton);

    const ajouterUnePhotoButton = document.querySelector('input[value="Ajouter une photo"]')
    ajouterUnePhotoButton.addEventListener("click", addPhotoDisplay)

    function addPhotoDisplay () {
        ///
        backButton.style = "display=null";
        navButtonsDiv.style = "justify-content:space-between";
        ///Remplacement titre modale
        let modalTitle = document.querySelector('h3');
        modalTitle.innerText = "Ajout Photo";
        /// vide visu projets
        let modalProjetEnsemble = document.querySelector(".modal-projetsEnsemble"); 
        modalProjetEnsemble.remove();
        //bouton navigation
        addButton.setAttribute('value','Valider')
        addButton.style = "background-color:rgb(157,157,157)";
        
        /// Ajout champ catégorie
        let catSelectLabel = document.createElement("label");
        catSelectLabel.innerText = "Catégorie"
        let catSelect = document.createElement("select");
        catSelect.innerHTML = "<option value=\"NA\"></option><option value=\"0\">Objets</option><option value=\"1\">Appartements</option><option value=\"2\">Hôtels & Restaurants</option>"




        /// ajout champ titre 
        let titleInputLabel = document.createElement("label");
        titleInputLabel.setAttribute("for","titre");
        titleInputLabel.innerText = "Titre"
        let titleInput = document.createElement("input");
        titleInput.setAttribute("name","titre")
        titleInput.setAttribute("id","titre")
        titleInput.setAttribute("required", "")
        titleInput.setAttribute("minlength","4")
        titleInput.setAttribute("maxlength","40")
        titleInput.setAttribute("type","text")

        sectionProjets.insertBefore(titleInput, addButton)
        sectionProjets.insertBefore(titleInputLabel, titleInput)

        sectionProjets.insertBefore(catSelect,addButton)
        sectionProjets.insertBefore(catSelectLabel,catSelect)


        backButton.addEventListener("click", function () {  //// fonction bouton retour
            sectionProjets.innerHTML = "";
            galleryModalDisplay(projets)});
    }
    
}

galleryModalDisplay(projets);

/// ouverture/fermeture fenêtre modale
let modifierLink = document.querySelector(".modifierLink");
let modal = document.querySelector(".modal");
modifierLink.addEventListener("click", function () {
    modal.style = null;
    let cross = document.querySelector(".fa-x");
    cross.addEventListener("click", function () {
        modal.style = "display:none";
    });
});



/// passage à l'écran ajouter une photo



