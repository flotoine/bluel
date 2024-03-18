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
    document.getElementsByTagName("head")[0].appendChild(editStyle) ;
    /// bouton modifier
    let mesProjets = document.querySelector("#portfolio > h2");
    let modifier = document.createElement('p');
    mesProjets.appendChild(modifier);
    modifier.innerHTML = "<i class=\"fa-regular fa-pen-to-square\"></i>&nbspModifier";
    let modifierStyle = document.createElement ("style");
    modifierStyle.innerHTML = "#portfolio p {font-size:14px; font-weight: 1; font-family: 'Work Sans' ; color: black; margin-left:3%} #portfolio h2 {display:flex; justify-content: center; align-items: center}"; 
    document.getElementsByTagName("head")[0].appendChild(modifierStyle);
    
    /// option logout
    let login = document.getElementById("login");
    login.innerHTML = "logout";
    login.addEventListener("click", function (event) {
        event.preventDefault();
        window.localStorage.clear('token'); // retire token du local storage
        login.innerHTML = "login"; //re-MAJ du bouton
        window.location.href = "./index.html" //ça et preventDefault pour rester sur la page projets
    });
}

let token = window.localStorage.getItem ("token");

if (token !== null) {adminIndex()}



