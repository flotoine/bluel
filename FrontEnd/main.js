//\1/\\ COMMANDES DE L'OUTIL MODIFICATION

let modal = document.querySelector(".modal");
modal.style = "display:none";
let modalGallery = document.querySelector(".modal-wrapper"); 
const button0 = document.querySelector("#button-all");
const button1 = document.querySelector("#button-objects");
const button2 = document.querySelector("#button-flats");
const button3 = document.querySelector("#button-hotels");
let category = 0;


/// ajoute bandeau mode d'édition pour l'admin + bouton modifier si un token est stocké
let token = window.localStorage.getItem ("token");
if (token !== null) {adminIndex()} 

function adminIndex () {  ///Lorsque qu'un token est stocké
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
    ///listener du bouton modifier
    editLink.addEventListener("click", function () {
        modal.style = null; //retire le display:none de la modal au clic
        galleryModalDisplay(projects); //lance génération de la première fenêtre modale

    })

    /// Disparition des filtres
    let filters = document.querySelector(".filters")
    filters.style= "display:none"

    /// option logout
    let login = document.getElementById("login");
    login.innerHTML = "logout";
    
    login.addEventListener("click", function (event) { ///écoute clic sur logout
        event.preventDefault();
        window.localStorage.clear('token'); // retire token du local storage
        window.localStorage.removeItem ('projects') //permet actualisation des projets
        login.innerHTML = "login"; //re-MAJ du bouton login/logout
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


function displayProject (projects) { 
    button0.focus({focusVisible : false}); //gérération générale (sans monSet) --- Ajouter un ::active sur TOUS par défaut
    for (let i = 0; i< projects.length; i++) {
        let gallery = document.querySelector(".gallery");
    // récupération galerie project dans DOM
        let projectElement = document.createElement("figure");
    
    //création élément
        let project = projects[i];
        let imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.alt = `Image du projet ${project.title}`
        let titleElement = document.createElement("figcaption")
        titleElement.innerText = project.title;

//rattachement des éléments dans DOM
        gallery.appendChild(projectElement);
        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleElement);
    }
}

displayProject (projects); // fonction par défaut à l'ouverture de la page

/////// Boutons au clic 

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

let setProjects = function (projects, category) { //ajoute les objets correspond à la catégorie dans un set
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
        imageElement.alt = `Image du projet ${project.title}`
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
        let project = projects[i];  ///i=élément dans la boucle /// .id=élément à supprimer le cas échéant
        let imageAndTrash = document.createElement("div")
        imageAndTrash.className = "imageAndTrash"
        let imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.id = `modal-photoFromProjectId-${projects[i].id}`
        let trashIcon = document.createElement("i"); /// création poubelle
        trashIcon.className = "fa-solid fa-trash-can";
        trashIcon.id = `modal-trashForProjectId-${projects[i].id}` ///TEMPORAIRE
    
    /// idée créer une div (backgrn noir) et dedans la poubelle <i class="fa-solid fa-trash-can"></i>, la fixer et lui attribuer une class en function de l'ID project

//rattachement des éléments dans DOM
        projectsDiv.appendChild(imageAndTrash);
        imageAndTrash.appendChild(imageElement);
        imageAndTrash.appendChild(trashIcon);
    }

/// Fonction supprimer dans la base de données
    async function deleteProject (idToDelete) {
    const response = await fetch(`http://localhost:5678/api/works/${idToDelete}`, {   ///replacer à la fin par ${id}
        method: 'DELETE',
        headers: {
            "Authorization" : `Bearer ${token}`},
    })    
    
    }

    const deleteProjectPageReload = async (idToDelete) => {
        const result = await deleteProject(idToDelete)
        window.localStorage.removeItem ('projects') //permet actualisation des projets
        location.reload()
    } 


    let toTrash = document.querySelectorAll(`.fa-trash-can`)  ///sélection les poubelles
    toTrash.forEach (trash => trash.addEventListener("click", function () {
        let idToDelete = parseInt(trash.id.replace("modal-trashForProjectId-","")) ///retourne id liée au projet 
        if (confirm (`Voulez-vous vraiment supprimer le projet ${idToDelete} ?`)) 
        {
            deleteProjectPageReload(idToDelete);
        } 
    }))

   

    

    







    ///génération bouton ajouter 
    let addButton = document.createElement("input");
    addButton.setAttribute('type', 'submit')
    addButton.setAttribute('value','Ajouter une photo')
    modalGallery.appendChild(addButton);

    const ajouterUnePhotoButton = document.querySelector('input[value="Ajouter une photo"]')
    ajouterUnePhotoButton.addEventListener("click", addPhotoDisplay) // lance 2e page lors du clic "ajouter une photo"

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
        
        /// génération du formulaire
        let uploadForm = document.createElement("form")
        uploadForm.className = "uploadForm"

        ///ajout outil encart versement image
        let uploadInsert = document.createElement("div")
        uploadInsert.id = "uploadInsert"

        
        let imageIconInInsert = document.createElement("i")
        imageIconInInsert.className = "fa-regular fa-image"

        let browsePhoto = document.createElement ('input') //crée un input file caché
        browsePhoto.setAttribute("type", "file")
        browsePhoto.setAttribute("id", "browsePhoto")
        browsePhoto.setAttribute("hidden", "")
        browsePhoto.setAttribute("required", "")
        browsePhoto.setAttribute("accept","image/png, image/jpeg")
        let addPhotoButton = document.createElement('input') //crée le bouton pour ajouter le file (image)
        addPhotoButton.setAttribute("type","button")
        addPhotoButton.setAttribute("id","addPhotoButton")
        addPhotoButton.setAttribute("value","+ Ajouter photo") 

        let photoRequirementsText = document.createElement('p')
        photoRequirementsText.innerText = "jpg, png : 4mo max"
        
        uploadInsert.appendChild(imageIconInInsert)
        uploadInsert.appendChild(browsePhoto)
        uploadInsert.appendChild(addPhotoButton)
        uploadInsert.appendChild(photoRequirementsText)

        uploadForm.appendChild(uploadInsert)

                /// ajout champ titre 
        let titleInputLabel = document.createElement("label");
        titleInputLabel.setAttribute("for","title");
        titleInputLabel.innerText = "Titre"
        let titleInput = document.createElement("input");
        titleInput.setAttribute("name","title")
        titleInput.setAttribute("id","title")
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
        catSelect.setAttribute("name","category")
        catSelect.setAttribute("id","category")
        catSelect.setAttribute("required", "")
        catSelect.innerHTML = "<option value=\"\">Choisissez une catégorie</option><option value=\"1\">Objets</option><option value=\"2\">Appartements</option><option value=\"3\">Hôtels & Restaurants</option>"
        uploadForm.appendChild(catSelectLabel)
        uploadForm.appendChild(catSelect)

        let formHr = document.createElement('hr')
        uploadForm.appendChild(formHr)

        let formValidationButton = document.createElement('input')
        formValidationButton.setAttribute("type","submit")
        formValidationButton.setAttribute("value","Valider")
        formValidationButton.setAttribute("id","formValidationButton")
        uploadForm.appendChild(formValidationButton)

        let modalWrapper = document.querySelector(".modal-wrapper")
        modalWrapper.appendChild(uploadForm)


        /// fonction ajouter photo
        document.getElementById('addPhotoButton').addEventListener('click', openDialog);

        function openDialog() { /// ouvre boite de dialogue
            document.getElementById('browsePhoto').click();
        }


        browsePhoto.addEventListener('change', function () { //écoute l'ajout d'une photo
            let reader = new FileReader()
            reader.readAsBinaryString(browsePhoto.files[0]) //transforme la forme en chaine binaire (requis par l'API)
            if(browsePhoto.files[0].size<4194304) {  ///contrôle de la taille du fichier
            reader.onload = function () {
                window.localStorage.setItem('newProjectPhoto', reader.result)  ///donne photo et met dans le local storage
                imageIconInInsert.style = "display:none"
                addPhotoButton.style = "display:none"
                photoRequirementsText.style = "display:none"
                let projectImageInInsert = document.createElement('img')
                projectImageInInsert.className = 'projectImageInInsert'
                projectImageInInsert.src = 'data:image/jpeg;base64,' + btoa(reader.result);
                uploadInsert.appendChild(projectImageInInsert) // affiche photo dans l'encart
                browsePhoto.setAttribute("filename",browsePhoto.files[0].name)
            }
            } else { 
                alert("Veuillez choisir une image moins volumineuse (4 méga-octets maximum)")
            }
        })

        ///Message si image absente
        formValidationButton.addEventListener("click", function() {
            if(browsePhoto.validity.valueMissing) {
                alert("Veuillez ajouter une photo")
            }
        })

        uploadForm.addEventListener("change", function() {
            if((uploadForm[0].validity.valueMissing)===false && (uploadForm[2].validity.valueMissing)===false && (uploadForm[3].validity.valueMissing)===false) {
                formValidationButton.style = "background-color:#1D6154"
            }
            else (formValidationButton.style = "background-color:rgb(157,157,157)");
        })
        
        uploadForm.onsubmit = function (e) {  //function quand form soumis
            e.preventDefault()
            let formData = new FormData (uploadForm) //formdata ne prend que titre et catégorie dans ce cas
            formData.append("image", browsePhoto.files[0])

            async function sendNewWork () {
                const response = await fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers: {
                        "Authorization" : `Bearer ${token}`},
                    body: formData,
                })    
                
                }

            const addProjectPageReload = async () => {
                const result = await sendNewWork()
                window.localStorage.removeItem ('projects') //permet actualisation des projets
                location.reload()
            } 

            addProjectPageReload();
                
            }
                /// il faudrait fermer la fenetre modale et actualiser la page avec projet ajouté
             
        


        backButton.addEventListener("click", function () {  //// fonction bouton retour
            modalGallery.innerHTML = "";
            galleryModalDisplay(projects)});
    }
    
}



