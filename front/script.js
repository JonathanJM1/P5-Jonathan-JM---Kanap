// Url de l'API pour récupérer tous les produits
const url ='http://localhost:3000/api/products/';
fetch(url)
// Récupérer les données JSON et les convertir en objet JavaScript
.then((res) => res.json())
// Utiliser les données récupérées pour générer le HTML
    .then((data) => {
        addCards(data);
    })
 // Gérer les erreurs de connexion avec l'API
 .catch((error) => {
    alert("Attention le serveur n'est pas connecté!")
});

// Fonction pour affichage des produits en page d'accueil
function addCards(data){
    // Parcourir les produits dans les données JSON
            for (product in data){
    // Générer le HTML pour chaque produit et l'ajouter à l'élément HTML du conteneur
                const card = document.getElementById("items");
                card.innerHTML += `<a href="./product.html?id=${data [product]._id}">
                <article>
                  <img src="${data [product].imageUrl}" alt="${data [product].altTxt}">
                  <h3 class="productName">${data [product].name}</h3>
                  <p class="productDescription">${data [product].description}</p>
                </article>
                </a>`
            }
        }
