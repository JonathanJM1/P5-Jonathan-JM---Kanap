// Récupérer tous les produits de l'API
fetch('http://localhost:3000/api/products/')
// Récupérer les données JSON et les convertir en objet JavaScript
.then((res) => res.json())
// Utiliser les données récupérées pour générer le HTML
    .then((datas) => {
        // console.log (datas)
    for (const data of datas)
        addCards(data);
    })
 // Gérer les erreurs de connexion avec l'API
 .catch((error) => {
    alert("Attention le serveur n'est pas connecté!")
});
// Fonction pour créer la base pour le produit
function addCards (data) {

//Création du lien vers la page produit pour chaque Kanap
    const items = document.getElementById('items');
    const group = document.createElement('a');
    group.setAttribute('href',"./product.html?id="+data._id);
    items.appendChild(group);
// console.log(group)

// Créer l'article à partir du HTML et Ajouter l'image des Kanaps
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src',data.imageUrl);
    img.setAttribute('alt',data.altTxt);
    article.appendChild(img);
    group.appendChild(article);
    // console.log(img);

// Ajouter un nom pour chaque Kanaps
    const h3 = document.createElement('h3');
    h3.setAttribute('class',`productName`);
    h3.textContent = data.name;
    article.appendChild(h3);
// console.log(h3)

// Ajouter une description pour chaque Kanaps
    const p = document.createElement('p')
    p.setAttribute('class','productDescription');
    p.textContent = data.description;
    article.appendChild(p);
// console.log(p);
}
