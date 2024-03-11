



const formConnexion = document.querySelector('form');
await formConnexion.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    const reponse = fetch("http://localhost:5678/api/users/login", {    /// compare email et mdp via API
    method: 'POST',
    headers: { 
        "Content-Type": "application/json", 
        "accept": "application/json"
    },
    body: `{ "email": "${email}", "password": "${password}"}`   /* '{ "email": "sophie.bluel@test.tld", "password": "S0phie"}'  */
    });
    console.log(reponse); //promise pending ici il faut résoudre avec thens
});

