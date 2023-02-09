// Local de stockage 
let cart = JSON.parse(localStorage.getItem("product"));
// texte pour informer que le panier est vide
function noProduct(products) {
    if (cart === null || cart == 0) {
        var emptyCart = document.querySelector("#cart__items");
        emptyCart.innerHTML += `<h2 style="text-align:center;">Aucun article dans le panier.<h2>`;
        return;
    }
};
noProduct();
// L'api + id + local de stockage
for (let element of cart) {
    let apiId = element.id;
    fetch ("http://localhost:3000/api/products/" + apiId)
    .then ((res) => { 
        if (res.ok) { 
            return res.json(); 
        }
    })
    .then ((productApi) => { 
        productsApi.push(productApi); 
        displayProduct(element, productApi);
    })
    .catch ((error) => { 
        window.alert("Une erreur est survenu, merci de rafraîchir la page.");
    });
}
// Fonction pour afficher les produits
function displayProduct(cartElement, apiElement) {
    var section = document.getElementById("cart__items");
    section.innerHTML += `
      <article class="cart__item" data-id="${apiElement._id}" data-color="${cartElement.color}">
        <div class="cart__item__img">
          <img src="${apiElement.imageUrl}" alt="${apiElement.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${apiElement.name}</h2>
            <p>${cartElement.color}</p>
            <p>${apiElement.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartElement.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `
}
