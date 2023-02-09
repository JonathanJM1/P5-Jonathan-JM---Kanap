// interroge la base de données , récupère les produits et les affichent sur la page d'accueil
fetch("http://localhost:3000/api/products/")
       .then ((response) => {
           if (response.ok) {
               return response.json();
           }
       })
// noms des données
       .then ((data) => {
           allProducts(data);
       })
// Erreur de la page
       .catch((error) => {
       window.alert("Connexion au serveur impossible.");
       });
       function allProducts(products) {
       var section = document.getElementById("items");
// Les produits et les affichent sur la page d'accueil
       for (product of products) {
           section.innerHTML += `
               <a href="./product.html?id=${product._id}">
                   <article>
                       <img src="${product.imageUrl}"alt="${product.altTxt}"><h3 class="productName">${product.name}</h3>
                       <p class="productDescription">${product.description}</p>
                   </article>
               </a>
           `
       }
}