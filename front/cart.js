// Récupérer les produits ajoutés au panier dans le stockage local
const productsInCart = JSON.parse(localStorage.getItem("addToCart")) || [];

// Sélectionner l'élément du DOM où afficher les produits du panier
const cartItemsContainer = document.getElementById("cart__items");

// Fonction pour afficher les produits dans le panier
function displayCartProducts(products) {
  // Réinitialiser l'affichage du panier
  //cartItemsContainer.innerHTML = "";

  // Afficher chaque produit ajouté au panier
  products.forEach(product => {
    const { id, color, quantity } = product;
    const productUrl = `http://localhost:3000/api/products/${id}`;

    // Appeler l'API pour récupérer les informations détaillées du produit
    fetch(productUrl)
      .then(res => res.json())
      .then(data => {
        // Créer la structure HTML pour afficher le produit dans le panier
        const cartProduct = document.createElement("article");
        cartProduct.classList.add("cart__item");
        cartProduct.dataset.productId = id;
        cartProduct.dataset.productColor = color;
        cartItemsContainer.appendChild(cartProduct);

        const cartProductImgContainer = document.createElement("div");
        cartProductImgContainer.classList.add("cart__item__img");
        cartProduct.appendChild(cartProductImgContainer);

        const cartProductImg = document.createElement("img");
        cartProductImg.src = data.imageUrl;
        cartProductImg.alt = data.altTxt;
        cartProductImgContainer.appendChild(cartProductImg);

        const cartProductContent = document.createElement("div");
        cartProductContent.classList.add("cart__item__content");
        cartProduct.appendChild(cartProductContent);

        const cartProductTitle = document.createElement("h2");
        cartProductTitle.classList.add("cart__item__title");
        cartProductTitle.textContent = data.name;
        cartProductContent.appendChild(cartProductTitle);

        const cartProductColor = document.createElement("p");
        cartProductColor.classList.add("cart__item__color");
        cartProductColor.textContent = `Couleur : ${color}`;
        cartProductContent.appendChild(cartProductColor);

        const cartProductQty = document.createElement("p");
        cartProductQty.classList.add("cart__item__quantity");
        cartProductQty.textContent = `Quantité : ${quantity}`;
        cartProductContent.appendChild(cartProductQty);

        const cartProductPrice = document.createElement("p");
        cartProductPrice.classList.add("cart__item__price");
        cartProductPrice.textContent = `${data.price} €`;
        cartProductContent.appendChild(cartProductPrice);

        const cartProductQtyInput = document.createElement("input");
        cartProductQtyInput.classList.add("cart__item__quantity-input");
        cartProductQtyInput.setAttribute("type", "number");
        cartProductContent.appendChild(cartProductQtyInput);

        const cartProductDelete = document.createElement("button");
        cartProductDelete.classList.add("cart__item__delete");
        cartProductDelete.textContent = "Supprimer";
        cartProductContent.appendChild(cartProductDelete);
        
        // Ajouter un gestionnaire d'événements pour supprimer le produit du panier
        cartProductDelete.addEventListener("click", () => {
          const index = products.findIndex(p => p.id === id && p.color === color);
          if (index !== -1) {
            products.splice(index, 1);
            localStorage.setItem("addToCart", JSON.stringify(products));
            displayCartProducts(products);
          }
        });
      });
  });
}

// Appeler la fonction pour afficher les produits dans le panier
displayCartProducts(productsInCart);
