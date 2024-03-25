//\1/\\ COMMANDES DE L'OUTIL MODIFICATION
let modal = document.querySelector(".modal");
modal.style = "display:none";
let modalGallery = document.querySelector(".modal-wrapper"); 
let token = window.localStorage.getItem ("token");
if (token !== null) {adminIndex()}




/// ajoute bandeau mode d'édition pour l'admin + bouton modifier
function adminIndex () {
    /// édition bandeau supérieur
    let body = document.querySelector("body"); 
    let editMenu = document.createElement("div");
    editMenu.className = "editMenu"
    editMenu.innerHTML = "<i class=\"fa-regular fa-pen-to-square\"></i>&nbspMode édition"
    body.insertBefore(editMenu, body.children[0])
    let editStyle = document.createElement("style") ;
    editStyle.innerHTML = '.editMenu {display: flex; justify-content:center; align-items:center; background-color:black; color:white; height:40px; width: 100vw; position: fixed; top: 0px;left: calc(-50vw + 50%);}' ;
    document.getElementsByTagName("head")[0].appendChild(editStyle);
    /// bouton modifier
    let myProjects = document.querySelector("#portfolio > h2");
    let editLink = document.createElement('a'); //bouton modifier
    editLink.href = "#";
    editLink.className = "modifierLink"
    myProjects.appendChild(editLink);
    editLink.innerHTML = "<i class=\"fa-regular fa-pen-to-square\"></i>&nbspModifier";
    let editLinkStyle = document.createElement ("style");
    editLinkStyle.innerHTML = "#portfolio a {font-size:14px; font-weight: 1; font-family: 'Work Sans' ; color: black; margin-left:3%} #portfolio h2 {display:flex; justify-content: center; align-items: center}"; 
    document.getElementsByTagName("head")[0].appendChild(editLinkStyle);
    
    editLink.addEventListener("click", function () {
        modal.style = null;
        galleryModalDisplay(projects);

    })

    /// Disparition des filtres
    let filters = document.querySelector(".filters")
    filters.style= "display:none"

    /// option logout
    let login = document.getElementById("login");
    login.innerHTML = "logout";
    login.addEventListener("click", function (event) {
        event.preventDefault();
        window.localStorage.clear('token'); // retire token du local storage
        login.innerHTML = "login"; //re-MAJ du bouton
        window.location.href = "./index.html" //ça et preventDefault pour rester sur la page projects
    });
}

//\2/\\ COMMANDES DE L'OUTIL GÉNÉRATION DES PROJETS

let projects = window.localStorage.getItem ('projects'); //définition des projets dans le local storage

if (projects === null) { 
    const reponse = await fetch('http://localhost:5678/api/works'); //si rien dans le local storage, recherche des projets via API
    projects = await reponse.json(); //extension JSON des données
    
    const projectsValue =  JSON.stringify(projects); //créa fichier json et copie des données projets
    window.localStorage.setItem("projects", projectsValue); //acceuil des projects dans local storage
} else {
    projects = JSON.parse(projects); // rend utilisable le JSON
}


function displayProject (projects) {   //gérération générale (sans monSet)
    for (let i = 0; i< projects.length; i++) {
        let gallery = document.querySelector(".gallery");
    // récupération galerie project dans DOM
        let projectElement = document.createElement("figure");
    
    //création élément
        let project = projects[i];
        let imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        let titleElement = document.createElement("figcaption")
        titleElement.innerText = project.title;

//rattachement des éléments dans DOM
        gallery.appendChild(projectElement);
        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleElement);
    }
}

displayProject (projects);

/////// Boutons au clic 

const button0 = document.querySelector("#button-all");
const button1 = document.querySelector("#button-objects");
const button2 = document.querySelector("#button-flats");
const button3 = document.querySelector("#button-hotels");

let category = 0;

button0.addEventListener("click", function() {  //bouton Tous
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    displayProject (projects)
});

button1.addEventListener("click", function() {  //Bouton Objets
    category = 1;
    setProjects (projects, category);
    generateFromSet (); 
}); 

button2.addEventListener("click", function() { //Bouton Apparts
    category = 2;
    setProjects (projects, category);
    generateFromSet (); 
}
); 

button3.addEventListener("click", function() { //Bouton Hotels
    category = 3;
    setProjects (projects, category);
    generateFromSet (); 
}); 




 /// sélection de la catégorie d'objet
let monSet = new Set();

let setProjects = function (projects, category) {
    monSet.clear(); // vide le set sinon les autres catégories restent après un deuxième choix
    for (let i = 0 ; i< projects.length;i++){
        if (projects[i].categoryId === category) {
               monSet.add(i);}
    }
};

function generateFromSet () {  //generation à partir de monSet
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    monSet.forEach(function (value) {  /// sortir chaque valeur du set
    let i = value;
    let projectElement = document.createElement("figure");
    
    //création élément
        let project = projects[i];
        let imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        let titleElement = document.createElement("figcaption")
        titleElement.innerText = project.title;

//rattachement des éléments dans DOM
        gallery.appendChild(projectElement);
        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleElement); 
        
  });
}


//\3/\\ COMMANDES DE L'OUTIL MODAL

function galleryModalDisplay (projects) {   // génération fenêtre modale
    // génération interface supérieure 
    let navButtonsDiv = document.createElement('div');
    navButtonsDiv.className = "navigationButtonsDiv";
    navButtonsDiv.style = "justify-content:right";
    let backButton = document.createElement('a');
    backButton.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i>"; 
    backButton.style = "display:none";
    let closeButton = document.createElement('a');
    closeButton.innerHTML = "<i class=\"fa-solid fa-x\"></i>";
    modalGallery.appendChild(navButtonsDiv);
    navButtonsDiv.appendChild(backButton);
    navButtonsDiv.appendChild(closeButton);

    /// listener fermeture 
    closeButton.addEventListener("click", function () {
        modalGallery.innerHTML = "";
        modal.style = "display:none";
    })


    //génération du titre
    let modalTitleDiv = document.createElement('div');
    let modalTitle = document.createElement('h3');
    modalTitle.innerText = "Galerie Photo";
    modalGallery.appendChild(modalTitleDiv);
    modalTitleDiv.appendChild(modalTitle);
    

    let projectsDiv = document.createElement("div");
    projectsDiv.className = "modal-projects"
    modalGallery.appendChild(projectsDiv)
    for (let i = 0; i< projects.length; i++) {
    // récupération galerie project dans DOM
        
    //création élément
        let project = projects[i];
        let imageAndTrash = document.createElement("div")
        imageAndTrash.className = "imageAndTrash"
        let imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash-can";

    /// création poubelle
    /// idée créer une div (backgrn noir) et dedans la poubelle <i class="fa-solid fa-trash-can"></i>, la fixer et lui attribuer une class en function de l'ID project

//rattachement des éléments dans DOM
    projectsDiv.appendChild(imageAndTrash);
        imageAndTrash.appendChild(imageElement);
        imageAndTrash.appendChild(trashIcon);
    }

    ///génération bouton ajouter 
    let addButton = document.createElement("input");
    addButton.setAttribute('type', 'submit')
    addButton.setAttribute('value','Ajouter une photo')
    modalGallery.appendChild(addButton);

    const ajouterUnePhotoButton = document.querySelector('input[value="Ajouter une photo"]')
    ajouterUnePhotoButton.addEventListener("click", addPhotoDisplay)

    function addPhotoDisplay () {
        ///
        backButton.style = "display=null";
        navButtonsDiv.style = "justify-content:space-between";
        ///Remplacement titre modale
        let modalTitle = document.querySelector('h3');
        modalTitle.innerText = "Ajout Photo";
        /// vide visu projects
        let projectsDiv = document.querySelector(".modal-projects"); 
        projectsDiv.remove();
        // supprime bouton du bas
        addButton.remove();
        
        
        let uploadForm = document.createElement("form")
        uploadForm.className = "uploadForm"

        ///ajout outil encart versement image
        let uploadInsert = document.createElement("div")
        uploadInsert.id = "uploadInsert"

        
        let imageIconInInsert = document.createElement("i")
        imageIconInInsert.className = "fa-regular fa-image"

        let addPhotoButton = document.createElement('input')
        addPhotoButton.setAttribute("type","submit")
        addPhotoButton.setAttribute("value","+ Ajouter photo")

        let photoRequirementsText = document.createElement('p')
        photoRequirementsText.innerText = "jpg, png : 4mo max"
        
        uploadInsert.appendChild(imageIconInInsert)
        uploadInsert.appendChild(addPhotoButton)
        uploadInsert.appendChild(photoRequirementsText)

        uploadForm.appendChild(uploadInsert)

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
        uploadForm.appendChild(titleInputLabel)
        uploadForm.appendChild(titleInput)

        /// Ajout champ catégorie
        let catSelectLabel = document.createElement("label");
        catSelectLabel.innerText = "Catégorie"
        let catSelect = document.createElement("select");
        catSelect.innerHTML = "<option value=\"NA\"></option><option value=\"0\">Objets</option><option value=\"1\">Appartements</option><option value=\"2\">Hôtels & Restaurants</option>"
        uploadForm.appendChild(catSelectLabel)
        uploadForm.appendChild(catSelect)

        let formHr = document.createElement('hr')
        uploadForm.appendChild(formHr)

        let formValidationButton = document.createElement('input')
        formValidationButton.setAttribute("type","submit")
        formValidationButton.setAttribute("value","Valider")
        uploadForm.appendChild(formValidationButton)

        let modalWrapper = document.querySelector(".modal-wrapper")
        modalWrapper.appendChild(uploadForm)
        


        backButton.addEventListener("click", function () {  //// fonction bouton retour
            modalGallery.innerHTML = "";
            galleryModalDisplay(projects)});
    }
    
}




