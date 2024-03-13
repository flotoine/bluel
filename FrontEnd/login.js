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
        console.log("ok");
        const token = (await response.json()).token ///extraction du token
        console.log(token) 
    } else {
        console.log("error")
    }
}


