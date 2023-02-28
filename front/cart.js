// Récupérer le contenu du panier depuis le localStorage
const cart = JSON.parse(localStorage.getItem("addToCart"));

// Vérifier si le panier n'est pas vide
if (cart.length > 0 ) {
// Parcourir les produits dans le panier
for (product of cart) {
// Afficher chaque produit dans le panier
showCart(product);
}
}

function showCart(product) {
// Sélectionner la section avec les articles
const productCart = document.getElementById("cart__items");
// Créer un élément article pour chaque produit dans le panier avec le Html
productCart.innerHTML +=  ` <article class="cart__item" data-id="${data [product]._id}">
    <div class="cart__item__img">
    <img src="${data [product].imageUrl}" alt="${data [product].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data [product].name}</h2>
        <p>Vert</p>
        <p>${data [product].price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article`
}