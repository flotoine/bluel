const formConnexion = document.querySelector('form');

formConnexion.addEventListener("submit", function(event) {
    event.preventDefault();
    fetchConnection();
});

async function fetchConnection () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    const response = await fetch("http://localhost:5678/api/users/login", {    /// compare email et mdp via API
    method: 'POST',
    headers: { 
        "Content-Type": "application/json", 
    },
    body: `{ "email": "${email}", "password": "${password}"}`   /* '{ "email": "sophie.bluel@test.tld", "password": "S0phie"}'  */
    });


    /// lecture réponse couple mail + mdp
    if (response.ok) {  // plus de détail dans response.status (200, 401, 404)
        const token = (await response.json()).token; ///extraction du token
        console.log(token);
        window.location.href = "./index.html"
        adminIndex()  // à conditionner à la connexion utilisatrice
    } else {
        connectionError();
    }
}



// fonction d'affichage du message d'erreur de connexion 
function connectionError () {   
    let errorDisplay = document.querySelector(".errorDisplay")
    let errorMessage = document.createElement("p")
    errorMessage.innerHTML = "Erreur d'authentification"
    errorDisplay.appendChild(errorMessage)
}







/// ajoute bandeau mode d'édition pour l'admin + bouton modifier
function adminIndex () {
    let body = document.querySelector("body"); // va chercher le body de login alors que je veux celui de index
    let editMenu = document.createElement("div");
    editMenu.className = "editMenu"
    editMenu.innerHTML = "<i class=\"fa-regular fa-pen-to-square\"></i>&nbspMode édition"
    body.insertBefore(editMenu, body.children[0])
    let editStyle = document.createElement("style") ;
    editStyle.innerHTML = '.editMenu {display: flex; justify-content:center; align-items:center; background-color:black; color:white; height:40px; width: 100vw; position: fixed; top: 0px;left: calc(-50vw + 50%);}' ;
    document.getElementsByTagName("head")[0].appendChild(editStyle) ;
    console.log("fin admin index")

}
