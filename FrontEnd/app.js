async function postNewProject () {
    response = await fetch("http://localhost:5678/api/works", { 
    method: 'POST',
    headers: { 
        "Content-Type": "application/json", 
        "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMTQwMzcwNywiZXhwIjoxNzExNDkwMTA3fQ.578hZiPaI6w-l4q1mDDJJd0viHCpYwzj64A83ordIZE`,
        "Content-Type" : "multipart/form-data",
    },
    body: {   ///marche pas
        "id": 14,
        "title": "malt",
        "imageUrl": "assets/images/maltandjuniper.jpg",
        "categoryId": "2",
        "userId": 1  
      }
})};

postNewProject()

