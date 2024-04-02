const formConnection = document.querySelector('form');

formConnection.addEventListener("submit", function(event) {
    event.preventDefault();
    fetchConnection();
});

async function fetchConnection () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await fetch("http://localhost:5678/api/users/login", {    /// compare email et mdp via API
    method: 'POST',
    headers: { 
        "Content-Type": "application/json", 
    },
    body: `{ "email": "${email}", "password": "${password}"}`   /* '{ "email": "sophie.bluel@test.tld", "password": "S0phie"}'  */
    });


    /// lecture réponse couple mail + mdp
    if (response.ok) {  // plus de détail dans response.status (200, 401, 404)
        let token = (await response.json()).token; ///extraction du token
        window.localStorage.setItem("token", token);
        window.location.href = "./index.html" 
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







