// récupère l'URL et l'ID de l'article
let url= new URL(window.location.href);
const productId = url.searchParams.get("id");
// récupération des détails du produit depuis l'API
fetch("http://localhost:3000/api/products/" + productId)
.then ((response) => {
           if (response.ok) {
               return response.json();
           }
       })
// noms des données
       .then ((data) => {
           allProductId(data);
       })
// Erreur de la page
.catch ((error) => {
       window.alert("une erreur est survenu, veuillez rafraîchir la page.");
   });
//Création du Local de stockage 
   storeInLocal ( ) ;
   function allProductId(product) {
// Image du produit
        const image = document.querySelector(".item__img");
        image.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
// Nom du produit
        const titleProduct = document.querySelector("#title");
        titleProduct.innerText = product.name;
// Prix du produit
        const price = document.querySelector("#price");
        price.innerText = product.price;
// Description du produit
        const description = document.querySelector("#description");
        description.innerText = product.description;
// Liste des couleurs du produit
        for (color = 0; color < product.colors.length; color++) {
        const colors = document.querySelector("#colors");
        colors.innerHTML += `<option value="${product.colors[color]}">${product.colors[color]}</option>`;
        };
    };
// Fonction Local de stockage avec les valeurs
function storeInLocal() {
  const addToCart = document.getElementById("addToCart");
  addToCart.addEventListener("click", () => {
    const colorV = document.querySelector("#colors").value;
    const quantityV = document.querySelector("#quantity").value;
// check if the color & quantity are chosen 
      if (colorV === "" && quantityV < 1 || quantityV > 100) {
          window.alert("Merci de séléctionner une couleur et une quantité.");
// Couleur choisi
      }  if (colorV === "") {
          window.alert("Merci de choisir une couleur.");
          return;
// Quantité choisi
      }  if (quantityV == 0) {
          window.alert("Merci de choisir une quantité.");
          return;
// Quantité non négative
      }  if (quantityV < 0) {
          window.alert("La quantité ne peut pas être négative.");
          return;
// Quantité maximal
      }  if (quantityV > 100) {
          window.alert("La quantité maximale est de 100, merci de choisir une quantité inférieure.");
          return;
//  Produit pris en compte dans le panier
      } else {
          window.alert("le produit a bien été ajouté à votre panier.");
          var custSelect = {
              id: productId,
              color: colorV,
              quantity: quantityV,
          };
// Local de stokage avec JSON 
          var cart = JSON.parse(localStorage.setItem("product"));
          if (cart === null) {
              cart = [];
              cart.push(custSelect);
              localStorage.setItem("product", JSON.stringify(cart));
// Présence d'un produit + selection + bouton ajouter au panier
          } else {
              var foundProduct = cart.find(p => p.id == custSelect.id && p.color == custSelect.color);
              if (foundProduct != undefined) {
                  var newQuantity = parseInt(custSelect.quantity) + parseInt(foundProduct.quantity);
                  foundProduct.quantity = newQuantity;
                  localStorage.setItem("product", JSON.stringify(cart));
              } 
          }
      }
  })
};